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
			<h2 style={{ width: '2rem', textAlign: 'left' }}></h2>
			<Help>
				设定你的蓝牙键盘的名字，蓝牙广播及设备连接后将显示此名称.
			</Help>
			<div style={{ height: '0.5rem' }}/>
			<h2 style={{ width: '8rem', marginRight: '0.8rem' }}>MAC地址后缀</h2>
			<select
				style={{ width: '8rem' }}
				value={ keyboard.settings.MACADDR_NAME }
				onChange={ e => keyboard.setSetting('MACADDR_NAME', parseInt(e.target.value)) }>
				<option value={ C.MACADDR_NAME_YES }>启用</option>
				<option value={ C.MACADDR_NAME_NO }>禁用</option>
			</select>
			<h2 style={{ width: '2rem', textAlign: 'left' }}></h2>
			<Help>
				键盘名称后面是否附加MAC地址后缀.
				<br/>
				启用后，键盘名称后将附加6位MAC地址后缀，如:Omega45 2C61FO. 禁用后，键盘名称不附加MAC地址后缀
			</Help>
			<div style={{ height: '0.5rem' }}/>
			<h2 style={{ width: '8rem', marginRight: '0.8rem' }}>绑定PIN码</h2>
			<select
				style={{ width: '8rem' }}
				value={ keyboard.settings.PASSKEY }
				onChange={ e => keyboard.setSetting('PASSKEY', parseInt(e.target.value)) }>
				<option value={ C.PASSKEY_REQUIRED_YES }>启用</option>
				<option value={ C.PASSKEY_REQUIRED_NO }>禁用</option>
			</select>
			<h2 style={{ width: '2rem', textAlign: 'left' }}></h2>
			<Help>
				蓝牙绑定时是否启用键盘输入PIN码.
				<br/>
				启用后，每次绑定设备时，都会要求键盘输入6位数字PIN码进行确认,这样可以避免键盘被他人搜索绑定.禁用时，绑定过程将不需要输入PIN码
			</Help>
			<div style={{ height: '0.5rem' }}/>
			<h2 style={{ width: '8rem', marginRight: '0.8rem' }}>高发射功率</h2>
			<select
				style={{ width: '8rem' }}
				value={ keyboard.settings.TX_POWER }
				onChange={ e => keyboard.setSetting('TX_POWER', parseInt(e.target.value)) }>
				<option value={ C.HIGH_TX_POWER_YES }>启用</option>
				<option value={ C.HIGH_TX_POWER_NO }>禁用</option>
			</select>
			<h2 style={{ width: '2rem', textAlign: 'left' }}></h2>
			<Help>
				发射功率提高到+4dBm.
				<br/>
				启用后,信号发射功率将提高到+4dBm.连接将更稳定，但功耗将提高，续航将会小幅下降.当禁用时,信号发射功率采用默认的0dBm.
			</Help>
			<div style={{ height: '0.5rem' }}/>
			<h2 style={{ width: '8rem', marginRight: '0.8rem' }}>RGB灯光</h2>
			<select
				style={{ width: '8rem' }}
				value={ keyboard.settings.RGBLIGHT_ENABLE }
				onChange={ e => keyboard.setSetting('RGBLIGHT_ENABLE', parseInt(e.target.value)) }>
				<option value={ C.RGBLIGHT_ENABLE_YES }>启用</option>
				<option value={ C.RGBLIGHT_ENABLE_NO }>禁用</option>
			</select>
			<h2 style={{ width: '2rem', textAlign: 'left' }}></h2>
			<Help>
				是否启用RGB灯驱动支持.
				<br/>
				启用后,将支持RGB WS2812灯光，但功耗将提高，续航将大幅下降.当禁用时,将不支持RGB灯光，相关配置项也将无效.
			</Help>
			<div style={{ height: '0.5rem' }}/>
			<h2 style={{ width: '8rem', marginRight: '0.8rem' }}>回报率</h2>
			<select
				style={{ width: '8rem' }}
				value={ keyboard.settings.FAST_SCAN_INTERVAL }
				onChange={ e => keyboard.setSetting('FAST_SCAN_INTERVAL', parseInt(e.target.value)) }>
				<option value={ C.SCAN_INTERVAL_10ms }>100Hz</option>
				<option value={ C.SCAN_INTERVAL_8ms }>125Hz</option>
				<option value={ C.SCAN_INTERVAL_4ms }>250Hz</option>
				<option value={ C.SCAN_INTERVAL_2ms }>500Hz</option>
			</select>
			<h2 style={{ width: '2rem', textAlign: 'left' }}></h2>
			<Help>
				设定键盘的回报率.
				<br/>
				回报率越高，响应按键行为越快，但是耗电将增加，并且太高的回报率可能导致故障. 默认为100Hz.
			</Help>
			<div style={{ height: '0.5rem' }}/>
			<h2 style={{ width: '8rem', marginRight: '0.8rem' }}>WS2812 LEDs</h2>
			<div style={{ width: '8rem', display: 'inline-block', textAlign: 'left' }}>
				<NumberBox
					style={{ width: '3.5rem' }}
					min='0'
					max='50'
					value={ keyboard.settings.RGBLED_NUM }
					onChange={ v => keyboard.setSetting('RGBLED_NUM', v) }/>
			</div>
			<h2 style={{ width: '2rem', textAlign: 'left' }}>颗</h2>
			<Help>
				设定你的 WS2812 LED 灯的数量.
			</Help>
			<div style={{ height: '0.5rem' }}/>
			<h2 style={{ width: '8rem', marginRight: '0.8rem' }}>自动休眠时间</h2>
			<div style={{ width: '8rem', display: 'inline-block', textAlign: 'left' }}>
				<NumberBox
					style={{ width: '3.5rem' }}
					min='0'
					max='600'
					value={ keyboard.settings.SLEEP_OFF_TIMEOUT }
					onChange={ v => keyboard.setSetting('SLEEP_OFF_TIMEOUT', v) }/>
			</div>
			<h2 style={{ width: '2rem', textAlign: 'left' }}>分钟</h2>
			<Help>
				设定你的键盘无按键行为后自动休眠间隔时间, 单位为分钟.
				<br/>
				最短设定1分钟，最长设定10小时.当设定为0时将不自动休眠.
			</Help>
			<div style={{ height: '0.5rem' }}/>
			<h2 style={{ width: '8rem', marginRight: '0.8rem' }}>慢速扫描间隔</h2>
			<div style={{ width: '8rem', display: 'inline-block', textAlign: 'left' }}>
				<NumberBox
					style={{ width: '3.5rem' }}
					min='0'
					max='600'
					value={ keyboard.settings.SLEEP_SLOW_TIMEOUT }
					onChange={ v => keyboard.setSetting('SLEEP_SLOW_TIMEOUT', v) }/>
			</div>
			<h2 style={{ width: '2rem', textAlign: 'left' }}>秒</h2>
			<Help>
				设定你的键盘无按键行为后转入慢速扫描的间隔时间, 单位为秒.
				<br/>
				最短设定1秒，最长设定10分钟.当设定为0时将不转入慢速扫描.
			</Help>
			<div style={{ height: '0.5rem' }}/>
			<h2 style={{ width: '8rem', marginRight: '0.8rem' }}>指示灯自动熄灭</h2>
			<div style={{ width: '8rem', display: 'inline-block', textAlign: 'left' }}>
				<NumberBox
					style={{ width: '3.5rem' }}
					min='0'
					max='900'
					value={ keyboard.settings.LED_AUTOOFF_TIME }
					onChange={ v => keyboard.setSetting('LED_AUTOOFF_TIME', v) }/>
			</div>
			<h2 style={{ width: '2rem', textAlign: 'left' }}>秒</h2>
			<Help>
				设定你的指示灯在蓝牙状态时自动熄灭的时长, 单位为秒；设定为0则为常亮，最长设定15分钟.
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
