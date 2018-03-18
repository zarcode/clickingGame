import {startLevel} from "../utils";

export const defaultUser = {
	username: "default",
	maxLevel: startLevel,
	// level: startLevel,
	lives: startLevel
};

export default (state = defaultUser, action) => {
	switch (action.type) {
		case "INIT_NEW_USER":
			return {
				...action.user
			};
		case "USER_FAILED_LEVEL":
			return {
				...state,
				lives: action.lives
			};
		case "USER_COMPLETED_LEVEL":
			return {
				...state,
				maxLevel: action.level + 1,
				// level: action.level + 1,
				lives: action.lives + 1
			};
		case "RESET_USERS_GAME":
			return {
				...state,
				maxLevel: startLevel,
				lives: startLevel
			};
		default:
			return state;
	}
};
