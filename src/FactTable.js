import Fact from './Fact.js'
import { DEFAULT_FACT_ID_PROP } from './const.js'
import {NotFoundFactId} from './errors.js'

/**
 *
 * */
export default class FactTable extends Array {
	constructor({ facts = [], factIdProp = DEFAULT_FACT_ID_PROP } = {}) {
		super();
		this.factIdProp = factIdProp;
		this.facts = facts.map(factData => {
			FactTable.validateFactData(factData, factIdProp);
			return new Fact(factData)
		});
	}
	getFacts() {
		return this.facts;
	}
	static validateFactData(factData, factIdProp) {
		if (!factData[factIdProp]) {
			throw NotFoundFactId
		}
	}
}
