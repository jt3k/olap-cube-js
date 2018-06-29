import Member from './Member.js'
import InputMember from './InputMember.js'

/**
 * */
export default class MemberList extends Array {
	constructor(array = [], primaryKey) {
		super();
		this.primaryKey = primaryKey;
		if (Array.isArray(array)) {
			array = array.map(member => new Member(member));
			Object.assign(this, array)
		}
	}
	getMemberId(member) {
		return member[this.primaryKey]
	}
	setMemberId(member, id) {
		member[this.primaryKey] = id;
	}
	deleteMemberId(member) {
		delete member[this.primaryKey]
	}
	/**
	 *
	 * */
	filter() {
		return [].filter.apply(this, arguments);
	}
	/**
	 * @param {Member} member
	 * */
	addMember(member) {
		if (this.indexOf(this.getMemberId(member) === -1)) {
			this.push(member)
		} else {
			debugger;
		}
	}
	/**
	 *
	 * */
	removeMember(member) {
		var index = this.indexOf(member);
		if (index === -1) {
			throw new Error('represented member was not found', member);
		}
		this.splice(index, 1);
	}
	/**
	 *
	 * */
	setMembers(members) {
		this.splice(0, this.length);
		Object.assign(this, members)
	}
	/**
	 * Fabric method
	 * */
	createMember(keys, props, id = this.reduceId()) {
		const member = InputMember.create(id, keys, props, this.primaryKey);
		this.addMember(member);
		return member;
	}
	/**
	 * @public
	 * Method of generating a unique identifier within the selected space
	 * */
	reduceId() {
		if (this.length) {
			return this.reduce((acc, curValue) => {
				return acc[this.primaryKey] > curValue[this.primaryKey] ? acc : curValue;
			}, 0).id + 1
		} else {
			return 1;
		}
	}
}
