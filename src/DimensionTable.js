import MemberList from './MemberList.js'
import {ENTITY_ID} from './const.js'

export default class DimensionTable {
	constructor({ dimension, foreignKey, primaryKey = ENTITY_ID, keyProps, otherProps = [], members = []}) {
		if (!dimension || !keyProps) {
			throw Error("Bad definition DimensionTable, params 'dimension' and 'keyProps' is required");
		}
		/** Name of the dimension */
		this.dimension = dimension;
		/** id name */
		this.foreignKey = foreignKey;
		/** id name */
		this.primaryKey = primaryKey;
		/** List of key names properties of the table belonging to the current dimension */
		this.keyProps = [].concat(keyProps);
		/** List of additional names properties of the table belonging to the current dimension */
		this.otherProps = [].concat(otherProps);
		/** member list */
		this.members = this.createMemberList(members);
	}
	/**
	 *
	 * */
	setMemberList(members) {
		this.members.setMembers(members);
	}
	/**
	 *
	 * */
	clearMemberList() {
		this.members = this.createMemberList([]);
	}
	/**
	 * @public
	 * @param {object} props
	 * @param {[]} linkProps
	 * @param {object?} props
	 * */
	createMember(props = {}, linkProps) {
		const { keyProps, otherProps, members } = this;
		return members.createMember(keyProps.concat(linkProps).concat(otherProps), props);
	}
	createMemberList(members) {
		return new MemberList(members, this.primaryKey)
	}
}
