const Generator = require('./index');

const C = require('const');

class RulesMK extends Generator {

	loadTemplate() { return require('./templates/rules.mk'); }

	fillTemplate() {
		const keyboard = this.keyboard;

		let nrf_chip;
		switch (keyboard.controller) {
			case C.CONTROLLER_NRF52832: nrf_chip = 'nRF52832'; break;
		}

		return {
			'nrf_chip': nrf_chip,
			'use_rgb': keyboard.pins.RGB_DI_PIN ? 'yes' : 'no'
		};
	}

}

module.exports = RulesMK;
