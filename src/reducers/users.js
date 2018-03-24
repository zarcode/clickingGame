import {startLevel} from "../utils";
import config from "../config";

/*
This reducer data types:

type completedObject = Map<number,number>

type user = {
    username: string,
    maxLevel: number,
    lives: number,
    completedTimes: completedObject
}

type users = Map<string,user>

===========================================

Example:
users: {
    "default": {
        username: "default",
        maxLevel: 5,
        lives: 3,
        completedTimes: { 3: 1, 4: 2 }
    }
    ...
}
*/

const defaultUser = {
	username: "default",
	maxLevel: startLevel,
	lives: 1
};

const defaultState = {};

defaultState[defaultUser.username] = defaultUser;

export default (state = defaultState, action) => {
	let currentUser = {};
	switch (action.type) {
		case "INIT_NEW_USER":
			return {
				...state,
				[action.username]: {
					...defaultUser,
					username: action.username
				}
			};
		case "USER_FAILED_LEVEL":
			currentUser = state[action.username];
			return {
				...state,
				[currentUser.username]: {
					...currentUser,
					lives: action.lives
				}
			};
		case "USER_COMPLETED_LEVEL":
			currentUser = state[action.username];
			const completedTimes = currentUser.completedTimes
				? currentUser.completedTimes
				: {};

			return {
				...state,
				[currentUser.username]: {
					...currentUser,
					maxLevel:
						action.level + 1 > currentUser.maxLevel &&
						action.level + 1 <= config.levelsLimit
							? action.level + 1
							: currentUser.maxLevel,
					lives: action.lives + 1,
					completedTimes: {
						...completedTimes,
						[action.level]: completedTimes[action.level]
							? completedTimes[action.level] + 1
							: 1
					}
				}
			};
		case "RESET_USERS_GAME":
			currentUser = state[action.username];
			return {
				...state,
				[currentUser.username]: {
					...currentUser,
					maxLevel: startLevel,
					lives: 1
				}
			};
		default:
			return state;
	}
};
