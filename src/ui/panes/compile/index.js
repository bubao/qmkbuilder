const React = require('react')

const Files = require('files')
const Utils = require('utils')

const Request = require('superagent')

const C = require('const')

class Compile extends React.Component {
  constructor(props) {
    super(props)

    // Bind functions.
    this.downloadHex = this.downloadHex.bind(this)
    this.downloadZip = this.downloadZip.bind(this)
    this.downloadH = this.downloadH.bind(this)
  }

  downloadH() {
    const state = this.props.state
    const keyboard = state.keyboard

    // Disable buttons.
    state.ui.set('compile-working', true)

    // Generate source files.
    const files = Files.generate(keyboard)
    console.log(files)

    const zip = new JSZip()
    // Insert the files.
    for (const file in files) {
      zip.file(file, files[file])
    }

    // Download the file.
    zip
      .generateAsync({ type: 'blob' })
      .then(blob => {
        // Generate a friendly name.
        const friendly = keyboard.settings.name
          ? Utils.generateFriendly(keyboard.settings.name)
          : 'layout'

        saveAs(blob, friendly + '.zip')

        // Re-enable buttons.
        state.ui.set('compile-working', false)
      })
      .catch(e => {
        console.error(err)
        state.error('Unable to generate files')
        state.ui.set('compile-working', false)
      })
  }

  downloadHex() {
    const state = this.props.state
    const keyboard = state.keyboard

    // Disable buttons.
    state.ui.set('compile-working', true)

    // Generate source files.
    const files = Files.generate(keyboard)
    // Send the request.
    Request.post(C.LOCAL.API)
      .timeout(99999999000)
      .set('Content-Type', 'application/json')
      .send(JSON.stringify({ package: 0, files }))
      .end((err, res) => {
        // Download the hex file.
        res = JSON.parse(res.text)
        console.log(res)

        if (err) {
          console.error(err)
          state.error('Unable to connect to API server.')
          state.ui.set('compile-working', false)
          return
        }

        // Check if there was an error.
        if (res.error) {
          console.error(res.error)
          state.error('Server error:\n' + res.error)
          state.ui.set('compile-working', false)
          return
        }

        // Generate a friendly name.
        const friendly = keyboard.settings.name
          ? Utils.generateFriendly(keyboard.settings.name)
          : 'layout'

        // Download the hex file.
        console.log(res.hex)
        const blob = new Blob([res.hex], { type: 'application/octet-stream' })
        console.log(blob)
        saveAs(blob, friendly + '.hex')

        // Re-enable buttons.
        state.ui.set('compile-working', false)
      })
    state.ui.set('compile-working', false)
  }

  downloadZip() {
    const state = this.props.state
    const keyboard = state.keyboard

    // Disable buttons.
    state.ui.set('compile-working', true)

    // Generate source files.
    const files = Files.generate(keyboard)
    // Send the request.
    Request.post(C.LOCAL.API)
      .timeout(99999999000)
      .set('Content-Type', 'application/json')
      .send(JSON.stringify({ package: 1, files }))
      .end((err, res) => {
        // Download the hex file.
        res = JSON.parse(res.text)

        if (err) {
          console.error(err)
          state.error('Unable to connect to API server.')
          state.ui.set('compile-working', false)
          return
        }

        // Check if there was an error.
        if (res.error) {
          console.error(res.error)
          state.error('Server error:\n' + res.error)
          state.ui.set('compile-working', false)
          return
        }

        // Generate a friendly name.
        const friendly = keyboard.settings.name
          ? Utils.generateFriendly(keyboard.settings.name)
          : 'layout'

        // Download the hex file.
        console.log(res.hex)
        const blob = new Blob([res.hex], { type: 'application/octet-stream' })
        console.log(blob)
        saveAs(blob, friendly + '.zip')

        // Re-enable buttons.
        state.ui.set('compile-working', false)
      })
  }

  render() {
    const state = this.props.state
    const keyboard = state.keyboard

    return (
      <div className="pane-compile">
        Download the .hex file to flash to your keyboard.
        <div style={{ height: '0.5rem' }} />
        <button
          disabled={!keyboard.valid || state.ui.get('compile-working', false)}
          onClick={this.downloadHex}
        >
          下载 .hex
        </button>
        <div style={{ height: '1.5rem' }} />
        Or 下载config.h.
        <div style={{ height: '0.5rem' }} />
        <button
          className="light"
          disabled={!keyboard.valid || state.ui.get('compile-working', false)}
          onClick={this.downloadZip}
        >
          下载DFU空中升级的刷机包 .zip
        </button>
      </div>
    )
  }
}

module.exports = Compile
