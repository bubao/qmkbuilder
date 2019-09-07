const React = require('react');

const Chooser = require('./chooser');

const Help = require('ui/elements/help');

const C = require('const');

class Pins extends React.Component {

	render() {
		const state = this.props.state;
		const keyboard = state.keyboard;
		console.log(keyboard)
		return <div className='pane-pins'>
			Choose the controller on the keyboard.
			<div style={{ height: '0.5rem' }}/>
			<select
				style={{ width: '10rem' }}
				value={ keyboard.controller }
				onChange={ e => keyboard.controller = parseInt(e.target.value) }>
				<option value={ C.CONTROLLER_NRF52832 }>nRF52832</option>
				{/* <option value={ C.CONTROLLER_ATMEGA32U2 }>ATmega32U2</option>
				<option value={ C.CONTROLLER_ATMEGA32U4 }>ATmega32U4</option>
				<option value={ C.CONTROLLER_AT90USB1286 }>AT90USB1286</option> */}
			</select>
			{/* <Help>
				<strong>ATmega32U2</strong>: Alps64
				<br/>
				<strong>ATmega32U4</strong>: Teensy 2.0, Pro Micro, GH60 (Most Common)
				<br/>
				<strong>AT90USB1286</strong>: Teensy++ 2.0
			</Help> */}
			<div style={{ height: '1.5rem' }}/>
			Configure the row and column pins.
			<div style={{ height: '0.5rem' }}/>
			<div className='clear'>
				<div className='float-left' style={{ width: '50%' }}>
					<h2>Rows</h2>
					<br/>
					{(() => {
						// Rows.
						const rows = [];
						for (let i = 0; i < keyboard.rows; i ++) {
							rows.push(<div
								key={ i }>
								<h2 style={{ width: '1rem', marginRight: '0.8rem' }}>{ i }</h2>
								<Chooser
									state={ state }
									onChange={ p => keyboard.setRowPin(i, p) }
									pin={ keyboard.pins.row[i] }/>
								<div style={{ height: '0.5rem' }}/>
							</div>);
						}
						return rows;
					})()}
				</div>
				<div className='float-right' style={{ width: '50%' }}>
					<h2>Columns</h2>
					<br/>
					{(() => {
						// Columns.
						const cols = [];
						for (let i = 0; i < keyboard.cols; i ++) {
							cols.push(<div
								key={ i }>
								<h2 style={{ width: '1rem', marginRight: '0.8rem' }}>{ i }</h2>
								<Chooser
									state={ state }
									onChange={ p => keyboard.setColPin(i, p) }
									pin={ keyboard.pins.col[i] }/>
								<div style={{ height: '0.5rem' }}/>
							</div>);
						}
						return cols;
					})()}
				</div>
			</div>
			<div style={{ height: '1.5rem' }}/>
			Configure LED pins.
			<div style={{ height: '0.5rem' }}/>
			<h2 style={{ width: '6rem', marginRight: '0.8rem' }}>Num Lock</h2>
			<Chooser
				noPin
				state={ state }
				onChange={ p => keyboard.setPin('num', p) }
				pin={ keyboard.pins.num }/>
			<div style={{ height: '0.5rem' }}/>
			<h2 style={{ width: '6rem', marginRight: '0.8rem' }}>Caps Lock</h2>
			<Chooser
				noPin
				state={ state }
				onChange={ p => keyboard.setPin('caps', p) }
				pin={ keyboard.pins.caps }/>
			<div style={{ height: '0.5rem' }}/>
			<h2 style={{ width: '6rem', marginRight: '0.8rem' }}>led sclk</h2>
			<Chooser
				noPin
				backlight
				state={ state }
				onChange={ p => keyboard.setPin('sclk', p) }
				pin={ keyboard.pins.led }/>
			<div style={{ height: '0.5rem' }}/>
			<h2 style={{ width: '6rem', marginRight: '0.8rem' }}>UART_RXD</h2>
			<Chooser
				noPin
				state={ state }
				onChange={ p => keyboard.setPin('UART_RXD', p) }
				pin={ keyboard.pins.caps }/>
				
			<div style={{ height: '0.5rem' }}/>
			<h2 style={{ width: '6rem', marginRight: '0.8rem' }}>UART_TXD</h2>
			<Chooser
				noPin
				state={ state }
				onChange={ p => keyboard.setPin('UART_TXD', p) }
				pin={ keyboard.pins.caps }/>
				
			<div style={{ height: '0.5rem' }}/>
			<h2 style={{ width: '6rem', marginRight: '0.8rem' }}>UART_DET</h2>
			<Chooser
				noPin
				state={ state }
				onChange={ p => keyboard.setPin('UART_DET', p) }
				pin={ keyboard.pins.caps }/>
		</div>;
	}

}

module.exports = Pins;
