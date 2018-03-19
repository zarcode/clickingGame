import React, {Component} from "react";

import "./Root.css";
import Board from "../Board";

class Root extends Component {
	render() {
		return (
			<div className="app">
				<Board />
				<div className="score">Score</div>
			</div>
		);
	}
}

export default Root;
