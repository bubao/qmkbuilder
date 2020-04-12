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
		return require('./templates/makefile')
	}

	fillTemplate() {
		const keyboard = this.keyboard;

		return {
			PRODUCT_NAME: keyboard.settings.PRODUCT || 'lotkb',
		}
	}
}

module.exports = ConfigH
