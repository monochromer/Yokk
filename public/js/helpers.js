import _ from "lodash";

export function findUserByLogin(users, login) {
	return _.find(users, (o) => o.login == login);
}
