import logger from "redux-logger";
import {combineReducers, createStore, applyMiddleware} from "redux";

import user from "./reducers/user";
// import type {Middleware} from "redux";

export default navigationMiddleware => {
	// const epicMiddleware = createEpicMiddleware(rootEpic);

	const middleWares = [];

	if (process.env.NODE_ENV) {
		middleWares.push(logger);
	}

	const appReducer = combineReducers({
		user
	});

	return createStore(appReducer, applyMiddleware(...middleWares));
};
