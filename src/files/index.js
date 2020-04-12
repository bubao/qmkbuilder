const RulesMKGenerator = require('./generators/rules.mk');
const ConfigHGenerator = require('./generators/config.h')
const KeymapPlainCGenerator = require('./generators/keymap_plain.c')
const KeymapCommonHGenerator = require('./generators/keymap.common.h')
const MakeFileGenerator = require('./generators/makefile')
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
			'lotkb/rules.mk': new RulesMKGenerator(keyboard).generate(),
			'lotkb/config.h': new ConfigHGenerator(keyboard).generate(),
			'lotkb/keymap_plain.c': new KeymapPlainCGenerator(keyboard).generate(),
			'lotkb/keymap_common.h': new KeymapCommonHGenerator(keyboard).generate(),
			'lotkb/Makefile': new MakeFileGenerator(keyboard).generate()
		}
	}
}

module.exports = Files