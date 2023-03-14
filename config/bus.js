import Vue from 'vue'
import store from '../store'

export function hasPermission(val) {
	if (store.getters.elements) {
		return store.getters.elements.indexOf(val) > -1
	} else {
		return false
	}
};
export function deepClone(item) {
	let copy
	if (item === null || typeof item !== 'object') {
		return item
	}
	// array
	if (Array.isArray(item)) {
		copy = []
		let len = item.length
		for (let i = 0; i < len; i++) {
			// 循环深克隆
			copy[i] = deepClone(item[i])
		}
		return copy
	}

	// object
	if (typeof item == 'object') {
		copy = {}
		for (let val in item) {
			if (item.hasOwnProperty(val)) {
				copy[val] = deepClone(item[val])
			}
		}
		return copy
	}
	// date
	if (item instanceof Date) {
		copy = new Date()
		copy.setTime(item.getTime())
		return copy
	}
	throw new Error("Unable to copy item! Its type isn't supported.")
}
