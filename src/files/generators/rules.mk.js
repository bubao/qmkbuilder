const Generator = require('./index');

const C = require('const');

class RulesMK extends Generator {

	loadTemplate() { return require('./templates/rules.mk'); }

	fillTemplate() {
		const keyboard = this.keyboard;

		let nrf_chip;
		switch (keyboard.controller) {
			case C.CONTROLLER_NRF52832: nrf_chip = 'nrf52832'; break;
			case C.CONTROLLER_NRF52810: nrf_chip = 'nrf52810'; break;
		}

		let rgblight_enable;
		switch (keyboard.settings.RGBLIGHT_ENABLE) {
			case C.RGBLIGHT_ENABLE_YES: rgblight_enable = ''; break;
			case C.RGBLIGHT_ENABLE_NO: rgblight_enable = '#'; break;
		}

		return {
			'nrf_chip': nrf_chip,
			'rgblight_enable': rgblight_enable || '',
		};
	}

}

module.exports = RulesMK;
