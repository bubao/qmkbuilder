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
  const files = req.body
  // Create a random key.
  const key = Crypto.randomBytes(16).toString('hex')
  const randomPatch = TMP + key
  console.log(files)
  // Setup helper functions.
  const clean = () => {
    Exec('rm -rf ' + randomPatch)
  }
  const sendError = err => {
    console.log('error')
    res.json({ error: err })
    clean()
  }

  // Start.
  try {
    // Copy the base stencil.
    await new Promise((resolve, reject) => {
      Exec(
        'cp -rp /usr/local/src/nrf52-keyboard/keyboard/template ' + randomPatch,
        (err, stdout, stderr) => {
          if (err) {
            console.log(err)
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
          if (err) {
            console.log(err)
            return reject('Failed to initialize.')
          }
          resolve()
        })
      })
    }

    // Make.
    await new Promise((resolve, reject) => {
      Exec(`cd ${randomPatch} && make default`, (err, stdout, stderr) => {
        if (err) {
          console.error(stderr)
          return reject(stderr)
        }
        console.log(stdout)
        resolve()
      })
    })

    // Read the hex file.

    // Send the hex file.
    // if (package) {
    //   res.responseType = 'blob'
    //   res.sendFile(TMP + key + `/keyboard/template/_build/${zipname}`, function (err) {
    //     if (err) {
    //       console.log(err);
    //     } else {
    //       console.log('Sent:', zipname);
    //     }
    //   });
    // }else{

    const hex = await new Promise((resolve, reject) => {
      Fs.readFile(
        `${randomPatch}/_build/nrf52_kbd.hex`,
        'utf8',
        (err, data) => {
          if (err) {
            console.error(err)
            return reject('Failed to read hex file.')
          }
          resolve(data)
        }
      )
    })
    res.json({ hex })
    // }

    // Clean up.
    clean()
  } catch (e) {
    console.error(e)
    clean()
    sendError(e)
  }
})

app.post('/zip', async (req, res) => {
  // Get the files.
  const files = req.body
  // Create a random key.
  const key = Crypto.randomBytes(16).toString('hex')
  const randomPatch = TMP + key
  console.log(randomPatch)
  console.log(files)

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
        'cp -rp /usr/local/src/nrf52-keyboard/keyboard/template ' + randomPatch,
        (err, stdout, stderr) => {
          if (err) {
            console.log(err)
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
          if (err) {
            console.log(err)
            return reject('Failed to initialize.')
          }
          resolve()
        })
      })
    }

    // Make.
    let zipname = ''
    await new Promise((resolve, reject) => {
      Exec(`cd ${randomPatch} && make package`, (err, stdout, stderr) => {
        if (err) {
          console.error(stderr)
          return reject(stderr)
        }
        console.log(stdout)
        Fs.readdir(randomPatch + '/_build', (error, res) => {
          if (error) {
            console.error(error)
            return reject(error)
          }
          res.forEach(element => {
            if (element.indexOf('.zip')) {
              zipname = element
              console.log(zipname)
              return resolve()
            }
          })
        })
      })
    })

    // Read the hex file.

    // Send the hex file.
    // if (package) {
    res.responseType = 'blob'
    res.sendFile(TMP + key + `/_build/${zipname}`, function(err) {
      if (err) {
        console.log(err)
      } else {
        console.log('Sent:', zipname)
      }
    })
    // }else{

    const hex = await new Promise((resolve, reject) => {
      Fs.readFile(`${randomPatch}/_build/${zipname}`, (err, data) => {
        if (err) {
          console.error(err)
          return reject(`Failed to read ${'zip'} file.`)
        }
        resolve(data)
      })
    })
    res.json({ hex })
    // }

    // Clean up.
    clean()
  } catch (e) {
    console.error(e)
    clean()
    sendError(e)
  }
})
// Start listening.
app.listen(PORT, () => console.log('Listening on port ' + PORT + '...'))
