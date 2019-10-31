/**
 * @Description: config
 * @Author: bubao
 * @Date: 2019-09-16 13:35:12
 * @LastEditors: bubao
 * @LastEditTime: 2019-09-16 13:43:03
 */
const Generator = require('./index')

const C = require('const')

class ConfigH extends Generator {
	loadTemplate() {
		return require('./templates/config.h')
	}

	fillTemplate() {
		const keyboard = this.keyboard;

		let passkey_required;
		switch (keyboard.settings.PASSKEY) {
			case C.PASSKEY_REQUIRED_YES: passkey_required = ''; break;
			case C.PASSKEY_REQUIRED_NO: passkey_required = '//'; break;
		}

		let high_tx_power;
		switch (keyboard.settings.TX_POWER) {
			case C.HIGH_TX_POWER_YES: high_tx_power = ''; break;
			case C.HIGH_TX_POWER_NO: high_tx_power = '//'; break;
		}

		let macaddr_name;
		switch (keyboard.settings.MACADDR_NAME) {
			case C.MACADDR_NAME_YES: macaddr_name = ''; break;
			case C.MACADDR_NAME_NO: macaddr_name = '//'; break;
		}

		let rgb_enable;
		switch (keyboard.settings.RGBLIGHT_ENABLE) {
			case C.RGBLIGHT_ENABLE_YES: rgb_enable = ''; break;
			case C.RGBLIGHT_ENABLE_NO: rgb_enable = '//'; break;
		}

		return {
			MATRIX_ROWS: keyboard.rows, // 列
			MATRIX_COLS: keyboard.cols, // 行
			row_pins: keyboard.pins.row.join(', '), // pin口
			col_pins: keyboard.pins.col.join(', '), // pin口
			diode_direction:
				keyboard.settings.diodeDirection === C.DIODE_COL2ROW
					? 'ROW_IN'
					: 'COL_IN', // 流向
			PRODUCT_NAME: keyboard.settings.PRODUCT || 'ble60',
			SLEEP_SLOW_TIMEOUT: keyboard.settings.SLEEP_SLOW_TIMEOUT || 15,
			SLEEP_OFF_TIMEOUT: keyboard.settings.SLEEP_OFF_TIMEOUT * 60 || 1200,
			LED_AUTOOFF_TIME: keyboard.settings.LED_AUTOOFF_TIME * 1000 || 5000,
			RGBLIGHT_ANIMATIONS: keyboard.settings.RGBLIGHT_ENABLE ? '' : '//',
			RGBLED_NUM: keyboard.settings.RGBLED_NUM || 8, // 8
			LED_CAPS: keyboard.pins.caps || 21, // 21
			RGB_DI_PIN: keyboard.pins.RGB_DI_PIN || 10, // 21
			LED_BLE: keyboard.pins.LED_BLE || 19, // 19
			LED_CHARGING: keyboard.pins.LED_CHARGING || 18, // 18
			LED_USB: keyboard.pins.LED_USB || 20, // 20
			POWER_BUTTON: keyboard.pins.POWER_BUTTON || 3, // 3
			UART_RXD: keyboard.pins.UART_RXD || 17, // UART_RX口IO 17
			UART_TXD: keyboard.pins.UART_TXD || 18, // UART_TX口IO 18
			Hiden_RGBLED_NUM: keyboard.settings.RGBLED_NUM ? '' : '//',
			Hiden_LED_CAPS: keyboard.pins.caps ? '' : '//',
			Hiden_RGB_DI_PIN: keyboard.pins.RGB_DI_PIN ? '' : '//',
			Hiden_LED_BLE: keyboard.pins.LED_BLE ? '' : '//',
			Hiden_LED_USB: keyboard.pins.LED_USB ? '' : '//',
			Hiden_LED_CHARGING: keyboard.pins.LED_CHARGING ? '' : '//',
			Hiden_POWER_BUTTON: keyboard.pins.POWER_BUTTON ? '' : '//',
			'passkey_required': passkey_required || '',
			'high_tx_power': high_tx_power || '',
			'macaddr_name': macaddr_name || '',
			'rgb_enable': rgb_enable || ''
		}
	}
}

module.exports = ConfigH
