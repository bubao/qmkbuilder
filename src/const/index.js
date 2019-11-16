const Keycodes = require('./keycodes');
const Presets = require('./presets');
const Local = require('./local');

const C = {

	// Version.
	VERSION: 1,

	// Screens.
	SCREEN_MAIN:     0,
	SCREEN_WIRING:   1,
	SCREEN_PINS:     2,
	SCREEN_KEYMAP:   3,
	SCREEN_MACROS:   4,
	SCREEN_QUANTUM:  5,
	SCREEN_SETTINGS: 6,
	SCREEN_COMPILE:  7,

	// Display properties.
	KEY_SIZE: 60,
	KEY_SIZE_MIN: 45,
	KEY_SIZE_MAX: 75,
	KEY_SIZE_INC: 5,

	// Key properties.
	KEY_SELECT: 1,
	KEY_PROGRAM: 2,

	// Diode direction.
	DIODE_COL2ROW: 0,
	DIODE_ROW2COL: 1,

	// Controllers.
	CONTROLLER_NRF52832: 0,
	CONTROLLER_NRF52810: 1,

	// PASSKEY.
	PASSKEY_REQUIRED_YES: 0,
	PASSKEY_REQUIRED_NO: 1,

	//MACADDR_NAME
	MACADDR_NAME_YES: 0,
	MACADDR_NAME_NO: 1,

	//RGBLIGHT
	RGBLIGHT_ENABLE_YES: 0,
	RGBLIGHT_ENABLE_NO: 1,


	// TX POWER.
	HIGH_TX_POWER_YES: 0,
	HIGH_TX_POWER_NO: 1,

	// Pins.
	PINS: {
		0: [ // CONTROLLER_NRF52832
			'0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
			'10', '11', '12', '13', '14', '15', '16', '17', '18', '19',
			'20', '21', '22', '23', '24', '25', '26', '27', '28', '29',
			'30', '31'
		],
		1: [ // CONTROLLER_NRF52810
			'0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
			'10', '11', '12', '13', '14', '15', '16', '17', '18', '19',
			'20', '21', '22', '23', '24', '25', '26', '27', '28', '29',
			'30', '31'
		]
		// 2: [ // CONTROLLER_NRF52840
		// '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
		// '10', '11', '12', '13', '14', '15', '16', '17', '18', '19',
		// '20', '21', '22', '23', '24', '25', '26', '27', '28', '29',
		// '30', '31' 
		//]
	},

	// Keycodes.
	KEYCODES: Keycodes.KEYCODES,
	KEYCODE_ALIASES: Keycodes.ALIASES,
	KEYCODE_CATEGORIES: Keycodes.CATEGORIES,
	KEYCODE_REVERSE_CATEGORIES: Keycodes.REVERSE_CATEGORIES,
	KEYCODE_NUMBERS: Keycodes.NUMBERS,
	KEYCODE_SPECIAL: Keycodes.SPECIAL,
	KEYCODE_RECOMMENDED: Keycodes.RECOMMENDED,

	// Keymap.
	KEYMAP_MAX_LAYERS: 16,

	// Macros.
	MACRO_NONE:     0,
	MACRO_INTERVAL: 1,
	MACRO_DOWN:     2,
	MACRO_UP:       3,
	MACRO_TYPE:     4,
	MACRO_WAIT:     5,

	// Quantum.
// 	QUANTUM_DEFAULT: `
// void matrix_init_user(void) {
// }

// void matrix_scan_user(void) {
// }

// bool process_record_user(uint16_t keycode, keyrecord_t *record) {
// 	return true;
// }`.trim(),

	// Presets.
	PRESETS: Presets,

	// Local settings.
	LOCAL: Local

};

module.exports = C;
