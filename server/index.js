/**
 * @Description: build服务
 * @Author: bubao
 * @Date: 2019-08-29 17:13:48
 * @LastEditors: bubao
 * @LastEditTime: 2019-08-29 17:14:04
 */
const PORT = 5004
const TMP = '/var/tmp/nrf52-keyboard'

const Express = require('express')
const BodyParser = require('body-parser')
const Crypto = require('crypto')
const Exec = require('child_process').exec
const Fs = require('fs')

// Create the express app.
const app = Express()
app.use(BodyParser.json())
app.use(BodyParser.urlencoded({ extended: true }))

// Allow cross-origin requests.
app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials'
  )
  res.header('Access-Control-Allow-Credentials', 'true')
  //   if (req.method == "OPTIONS") {
  //     res.send(200);
  //   }
  //   else {
  next()
  //   }
})

// Set up the /build route.
app.post('/build', async (req, res) => {
  // Get the files.
  const files = req.body.files
  const package = req.body.package - 0
  // Create a random key.
  const key = Crypto.randomBytes(16).toString('hex')
  const randomPatch = TMP + key

  // Setup helper functions.
  const clean = () => {
    Exec('rm -rf ' + randomPatch)
  }
  const sendError = err => {
    res.json({ error: err })
    clean()
  }

  // Start.
  try {
    // Copy the base stencil.
    await new Promise((resolve, reject) => {
      Exec(
        'cp -rp /usr/local/src/nrf52-keyboard ' + randomPatch,
        (err, stdout, stderr) => {
          if (err) {
            console.error(err)
            return reject('Failed to initialize.')
          }
          resolve()
        }
      )
    })

    // Copy all the files.
    for (const file in files) {
      await new Promise((resolve, reject) => {
        const fileName = file.replace('tmk_firmware', randomPatch)
        Fs.writeFile(fileName, files[file], err => {
          if (err) return reject('Failed to initialize.')
          resolve()
        })
      })
    }

    // Make.
    await new Promise((resolve, reject) => {
      Exec(
        'cd ' + randomPatch + `/keyboard/template && make ${package?'package':'default'} && ls`,
        (err, stdout, stderr) => {
          if (err) {
            console.error(stderr)
            return reject(stderr)
          }
          console.log(stdout)
          resolve()
        }
      )
    })

    // Read the hex file.
    const hex = await new Promise((resolve, reject) => {
      Fs.readFile(
        TMP + key + `/keyboard/template/_build/${package?`nrf52_kbd_*.zip`:'nrf52_kbd.hex'}`,
        // 'utf8',
        (err, data) => {
          if (err) {
            console.error(err)
            return reject(`Failed to read ${package?'zip':'hex'} file.`)
          }
          resolve(data)
        }
      )
    })

    // Send the hex file.
    res.json({ hex })

    // Clean up.
    clean()
  } catch (e) {
    sendError(e)
  }
})
// Start listening.
app.listen(PORT, () => console.log('Listening on port ' + PORT + '...'))
