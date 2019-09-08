const ConfigHGenerator = require('./generators/config.h')
const KeyPlainCGenerator = require('./generators/key_plain.c')
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
      'tmk_firmware/config.h': new ConfigHGenerator(keyboard).generate(),
      'tmk_firmware/keymap_plain.c': new KeyPlainCGenerator(
        keyboard
      ).generate(),
      'tmk_firmware/keymap_common.h': new KeymapCommonHGenerator(
        keyboard
      ).generate()
    }
  }
}

module.exports = Files
