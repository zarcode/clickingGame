import React, {Component} from "react";
import configureStore from "./configureStore";
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";

import "normalize.css/normalize.css";
import "./App.css";
import Root from "./components/Root";

const {store, persistor} = configureStore();

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<Root />
				</PersistGate>
			</Provider>
		);
	}
}

export default App;
