import React, {Component} from "react";
import {confirmAlert} from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

import "./Root.css";
import Board from "../Board";
import {connect} from "react-redux";

class Root extends Component {

	chooseUser = (user) => {
        this.props.setCurrentUser(user);
	};

	createNewUser = (username) => {
        this.props.initNewUser(username);
	};

    showChoosePlayer = () => {
        confirmAlert({
            customUI: ({onClose}) => {
                return (
                    <div className="react-confirm-alert-body choose-player-dialog">
                        <a className="close" role="button" tabIndex="0" aria-label="Close" onClick={onClose}>X</a>
                        <div className="field-set">
                            <strong>
                                Click to choose player
                            </strong>
							<ul>
							{Object.keys(this.props.users).map((username, index) =>
								<li
                                    key={index}
								>
									<a role="button"
                                       tabIndex="0"
									   onClick={() => {
										   this.chooseUser(this.props.users[username]);
										   setTimeout(() => {
											   onClose();
										   }, 300)
									   }}
									>{username}</a>
                                </li>
                            )}
                            </ul>
                        </div>
                        <div className="field-set">
                            <label htmlFor="player">
								<strong>
									Or create new
								</strong>
								<div>
                                    <input type="text" name="player" ref={input => {
                                        this.newPlayer = input;
                                    }}/>
									<a role="button"
                                       tabIndex="0"
									   onClick={() => {
									   		const username = this.newPlayer.value;
									   		if(!username)
									   			return false;

									   		this.createNewUser(username);
										   setTimeout(() => {
											   onClose();
										   }, 300)
									   }}
									>Choose</a>
								</div>
                            </label>
                        </div>
                    </div>
                );
            }
        });
    };

	render() {
		return (
			<div className="app-wrapper">
				<div className="startBar">
					<button onClick={this.showChoosePlayer}>Choose player</button>
				</div>
                <div className="app">
					<Board />
					<div className="score">Score</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
    return {
        users: state.users,
        currentUser: state.currentUser
    };
};

const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch({type: "SET_CURRENT_USER", user}),
    initNewUser: username => dispatch({type: "INIT_NEW_USER", username}),
    failLevel: lives => dispatch({type: "USER_FAILED_LEVEL", lives}),
    completeLevel: (level, lives) =>
        dispatch({type: "USER_COMPLETED_LEVEL", level, lives}),
    failGame: () => dispatch({type: "RESET_USERS_GAME"}),
});

export default connect(mapStateToProps, mapDispatchToProps)(Root);

