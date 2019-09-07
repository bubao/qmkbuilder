const Generator = require('./index');

const C = require('const');

class ConfigH extends Generator {

	loadTemplate() { return require('./templates/config.h'); }

	fillTemplate() {
		const keyboard = this.keyboard;

		return {
			'MATRIX_ROWS': keyboard.rows, // 列
			'MATRIX_COLS': keyboard.cols, // 行
			'row_pins': keyboard.pins.row.join(', '), // pin口 
			'col_pins': keyboard.pins.col.join(', '), // pin口
			'diode_direction': (keyboard.settings.diodeDirection === C.DIODE_COL2ROW ? 'ROW_IN' :'COL_IN'), // 流向
			'PRODUCT_NAME': keyboard.settings.name || 'ble60',
			'SLEEP_SLOW_TIMEOUT':keyboard.settings.SLEEP_SLOW_TIMEOUT || 15,
			'SLEEP_OFF_TIMEOUT':keyboard.settings.SLEEP_OFF_TIMEOUT || 600,
			'LED_AUTOOFF_TIME':keyboard.settings.LED_AUTOOFF_TIME *1000 || 5000,
			'PASSKEY_REQUIRED':keyboard.settings.PASSKEY_REQUIRED?'':'//',
			'RGBLIGHT_ENABLE':keyboard.settings.RGBLIGHT_ENABLE?'':'//',
			'RGBLIGHT_ANIMATIONS':keyboard.settings.RGBLIGHT_ENABLE?'':'//',
			'RGBLED_NUM' :keyboard.pins.num || 8,// 8
			'LED_CAPS': keyboard.pins.caps || 21,// 21
			'RGB_DI_PIN': keyboard.pins.RGB_DI_PIN || 10,// 21
			'LED_BLE': keyboard.pins.LED_BLE || 19,// 19
			'LED_USB': keyboard.pins.LED_USB || 20,// 20
			'POWER_BUTTON': keyboard.pins.POWER_BUTTON || 3,// 3
			'UART_RXD': keyboard.pins.UART_RXD || 17,// UART_RX口IO 17
			'UART_TXD': keyboard.pins.UART_TXD || 18 // UART_TX口IO 18
        };
	}
}

module.exports = ConfigH;
