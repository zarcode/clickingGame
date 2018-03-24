import {defaultUser} from "./currentUser";

const defaultState = {};

defaultState[defaultUser.username] = defaultUser;

export default (state = defaultState, action) => {
	switch (action.type) {
		case "INIT_NEW_USER":
			const newUser = {};
            newUser[action.username] = {
				...defaultUser,
                username: action.username
			};
            return {
                ...state,
				...newUser
            };
		default:
			return state;
	}
};

// const defaultState = [
//     defaultUser
// ];
//
// export default (state = defaultState, action) => {
//     switch (action.type) {
// 		case "INIT_NEW_USER":
//             const userIndex = findIndex(state, function(o) { return o.username === action.user.username; });
//             if(userIndex !== -1) {
//                 return [...state, action.user];
// 			}
//             return [...state.slice[0, userIndex], action.user, ...state.slice[userIndex]];
//
//         default:
//             return state;
//     }
// };
