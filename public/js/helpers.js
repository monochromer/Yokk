import _ from "lodash";

export function findUserByLogin(users, login) {
	return _.find(users, (o) => o.login == login);
}

export function refsToObject(refs) {
	var data = {};

	for(var field in refs) {
		data[field] = refs[field].value;
	}
	
	return data;
}
