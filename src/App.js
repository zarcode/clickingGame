import React, {Component} from "react";
import configureStore from "./configureStore";
import {Provider} from "react-redux";

import "./App.css";
import Root from "./components/Root";

const store = configureStore();

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<Root />
			</Provider>
		);
	}
}

export default App;
