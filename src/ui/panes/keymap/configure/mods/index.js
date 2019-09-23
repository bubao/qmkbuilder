const React = require('react')

const Toggle = require('ui/elements/toggle')

class Mods extends React.Component {
  render() {
    const mods = this.props.mods

    return (
      <div>
        &nbsp;&nbsp;修饰键&nbsp;&nbsp;&nbsp;
        <Toggle
          value={mods & 0b0000001}
          onChange={v =>
            this.props.onChange &&
            this.props.onChange(v ? mods | 0b0000001 : mods & ~0b0000001)
          }
        >
          LCTRL
        </Toggle>
        <Toggle
          value={mods & 0b0000010}
          onChange={v =>
            this.props.onChange &&
            this.props.onChange(v ? mods | 0b0000010 : mods & ~0b0000010)
          }
        >
          LSHIFT
        </Toggle>
        <Toggle
          value={mods & 0b0000100}
          onChange={v =>
            this.props.onChange &&
            this.props.onChange(v ? mods | 0b0000100 : mods & ~0b0000100)
          }
        >
          LALT
        </Toggle>
        <Toggle
          value={mods & 0b0001000}
          onChange={v =>
            this.props.onChange &&
            this.props.onChange(v ? mods | 0b0001000 : mods & ~0b0001000)
          }
        >
          LGUI
        </Toggle>
        <Toggle
          value={mods & 0b1000001}
          onChange={v =>
            this.props.onChange &&
            this.props.onChange(v ? mods | 0b1000001 : mods & ~0b1000001)
          }
        >
          RCTRL
        </Toggle>
        <Toggle
          value={mods & 0b1000010}
          onChange={v =>
            this.props.onChange &&
            this.props.onChange(v ? mods | 0b1000010 : mods & ~0b1000010)
          }
        >
          RSHIFT
        </Toggle>
        <Toggle
          value={mods & 0b1000100}
          onChange={v =>
            this.props.onChange &&
            this.props.onChange(v ? mods | 0b1000100 : mods & ~0b1000100)
          }
        >
          RALT
        </Toggle>
        <Toggle
          value={mods & 0b1001000}
          onChange={v =>
            this.props.onChange &&
            this.props.onChange(v ? mods | 0b1001000 : mods & ~0b1001000)
          }
        >
          RGUI
        </Toggle>
      </div>
    )
  }
}

module.exports = Mods
