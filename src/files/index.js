const RulesMKGenerator = require('./generators/rules.mk');
const ConfigHGenerator = require('./generators/config.h')
const KeymapPlainCGenerator = require('./generators/keymap_plain.c')
const KeymapCommonHGenerator = require('./generators/keymap.common.h')
class Files {
	/*
	 * Generate the set of source files given a Keyboard.
	 *
	 * @param {Keyboard} keyboard The keyboard to generate files from.
	 *
	 * @return {Object} The generated source files.
	 */
	static generate(keyboard) {
		return {
			'tmk_firmware/rules.mk': new RulesMKGenerator(keyboard).generate(),
			'tmk_firmware/config.h': new ConfigHGenerator(keyboard).generate(),
			'tmk_firmware/keymap_plain.c': new KeymapPlainCGenerator(
				keyboard
			).generate(),
			'tmk_firmware/keymap_common.h': new KeymapCommonHGenerator(
				keyboard
			).generate()
		}
	}
}

module.exports = Files
