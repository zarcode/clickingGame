import {startLevel} from "../utils";

export const defaultUser = {
	username: "default",
	maxLevel: startLevel,
	lives: 1
};

export default (state = defaultUser, action) => {
	switch (action.type) {
		case "INIT_NEW_USER":
			return {
				...action.user
			};
		case "INIT_NEW_GAME":
            return {
                ...state,
                lives: 1
            };
		case "USER_FAILED_LEVEL":
			return {
				...state,
				lives: action.lives
			};
		case "USER_COMPLETED_LEVEL":
			return {
				...state,
				maxLevel: (action.level + 1 > state.maxLevel)?action.level + 1:state.maxLevel,
				// level: action.level + 1,
				lives: action.lives + 1
			};
		case "RESET_USERS_GAME":
			return {
				...state,
				maxLevel: startLevel,
				lives: 1
			};
		default:
			return state;
	}
};
