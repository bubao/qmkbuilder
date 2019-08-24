const Generator = require('./index');

const C = require('const');

class ConfigH extends Generator {

	loadTemplate() { return require('./templates/config.h'); }

	fillTemplate() {
		const keyboard = this.keyboard;

		return {
			'MATRIX_ROWS': keyboard.rows,
			'MATRIX_COLS': keyboard.cols,
			'row_pins': keyboard.pins.row.join(', '),
			'col_pins': keyboard.pins.col.join(', '),
			'diode_direction': (keyboard.settings.diodeDirection === C.DIODE_COL2ROW ? 'ROW_IN' :'COL_IN'),
			'backlight_levels': keyboard.settings.backlightLevels,
			'backlight_pin': keyboard.pins.led ? '#define BACKLIGHT_PIN ' + keyboard.pins.led : '',
			'rgb_pin': keyboard.pins.rgb ? '#define RGB_DI_PIN ' + keyboard.pins.rgb : '',
			'num_rgb': keyboard.settings.rgbNum,
			'PRODUCT_NAME': keyboard.settings.name || 'ble60',
			'SLEEP_SLOW_TIMEOUT':keyboard.settings.SLEEP_SLOW_TIMEOUT || 15,
			'SLEEP_OFF_TIMEOUT':keyboard.settings.SLEEP_OFF_TIMEOUT || 600,
			'LED_AUTOOFF_TIME':keyboard.settings.LED_AUTOOFF_TIME *1000 || 5000,
			'PASSKEY_REQUIRED':keyboard.settings.PASSKEY_REQUIRED?'':'//',
			'RGBLIGHT_ENABLE':keyboard.settings.RGBLIGHT_ENABLE?'':'//',
			'RGBLIGHT_ANIMATIONS':keyboard.settings.RGBLIGHT_ENABLE?'':'//'
		};
	}

}

module.exports = ConfigH;
