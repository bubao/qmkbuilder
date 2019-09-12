const React = require('react');

const NumberBox = require('ui/elements/numberbox');
const Help = require('ui/elements/help');

const C = require('const');
const Utils = require('utils');

class Settings extends React.Component {

	constructor(props) {
		super(props);

		// Bind functions.
		this.save = this.save.bind(this);
	}

	/*
	 * Save the configuration.
	 */
	save() {
		const state = this.props.state;
		const keyboard = state.keyboard;

		// Get a friendly name for the keyboard.
		const friendly = keyboard.settings.PRODUCT ? Utils.generateFriendly(keyboard.settings.PRODUCT) : 'layout';

		// Serialize the keyboard.
		const serialized = keyboard.serialize();

		// Create the configuration.
		const config = JSON.stringify({
			version: C.VERSION,
			keyboard: serialized
		});

		// Download.
		const blob = new Blob([config], { type: 'text/plain;charset=utf-8' });
		saveAs(blob, friendly + '.json');
	}

	render() {
		const state = this.props.state;
		const keyboard = state.keyboard;

		// Compile a list of errors and warnings.
		const list = [];
		let index = 0;
		for (const error of keyboard.errors) {
			list.push(<div className='pane-settings-list-element' key={ index ++ }>
				<span style={{ color: '#c0392b' }}><i className='fa fa-times-circle'/></span>
				{ error }
			</div>);
		}
		for (const warning of keyboard.warnings) {
			list.push(<div className='pane-settings-list-element' key={ index ++ }>
				<span style={{ color: '#c6cc33' }}><i className='fa fa-exclamation-triangle'/></span>
				{ warning }
			</div>);
		}
		if (list.length === 0) {
			list.push(<div style={{ padding: '1rem' }} key={ -1 }>
				没有错误与警告
			</div>);
		}

		return <div className='pane-settings'>
			配置固件相关设置.
			<div style={{ height: '0.5rem' }}/>
			<h2 style={{ width: '8rem', marginRight: '0.8rem' }}>键盘名称</h2>
			<input
				style={{ width: '8rem' }}
				type='text'
				value={ keyboard.settings.PRODUCT }
				onChange={ e => keyboard.setSetting('PRODUCT', e.target.value) }/>
			<Help>
				设定你的键盘的名字，蓝牙连接时将显示此名称.
			</Help>
			<div style={{ height: '0.5rem' }}/>
			<h2 style={{ width: '8rem', marginRight: '0.8rem' }}>WS2812 LEDs</h2>
			<div style={{ width: '8rem', display: 'inline-block', textAlign: 'left' }}>
				<NumberBox
					style={{ width: '3.5rem' }}
					min='0'
					value={ keyboard.settings.RGBLED_NUM }
					onChange={ v => keyboard.setSetting('RGBLED_NUM', v) }/>
			</div>
			<Help>
				设定你的 WS2812 LED 灯的数量.
			</Help>
			<div style={{ height: '1.5rem' }}/>
			保存按键布局.
			<div style={{ height: '0.5rem' }}/>
			<button onClick={ this.save }>
			保存设置文件.
			</button>
			<div style={{ height: '1.5rem' }}/>
			检查错误和警告.
			<div style={{ height: '0.5rem' }}/>
			<div className='pane-settings-list'>
				{ list }
			</div>
		</div>;
	}

}

module.exports = Settings;
