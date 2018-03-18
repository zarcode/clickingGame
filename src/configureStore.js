import logger from "redux-logger";
import {combineReducers, createStore, applyMiddleware} from "redux";

import users from "./reducers/users";
import currentUser from "./reducers/currentUser";
// import type {Middleware} from "redux";

export default configureStore => {
	// const epicMiddleware = createEpicMiddleware(rootEpic);

	const middleWares = [];

	if (process.env.NODE_ENV) {
		middleWares.push(logger);
	}

	const appReducer = combineReducers({
		users,
		currentUser
	});

	return createStore(appReducer, applyMiddleware(...middleWares));
};
