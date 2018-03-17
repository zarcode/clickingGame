import React, {Component} from "react";
import {connect} from "react-redux";

import "./Root.css";
import Board from "../Board";

class Root extends Component {
	render() {
		return (
			<div className="App">
				<Board />
			</div>
		);
	}
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
	// onRefresh: () => dispatch({type: "KITTY_LIST_REQUEST", refresh: true}),
});

export default connect(mapStateToProps, mapDispatchToProps)(Root);
