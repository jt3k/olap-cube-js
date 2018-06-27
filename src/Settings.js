import { DEFAULT_TEMPLATE_FOREIGN_KEY, DEFAULT_FACT_ID_PROP } from './const.js'

export default class Settings {
	constructor({ templateForeignKey = DEFAULT_TEMPLATE_FOREIGN_KEY, factIdProp = DEFAULT_FACT_ID_PROP } = {}) {
		this.templateForeignKey = templateForeignKey;
		this.factIdProp = factIdProp;
	}
}
