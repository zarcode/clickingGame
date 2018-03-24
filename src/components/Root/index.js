import React, {Component} from "react";
import {confirmAlert} from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

import "./Root.css";
import Board from "../Board";
import {connect} from "react-redux";

class Root extends Component {
    constructor(props) {
        super(props);

        this.state = {
        	currentUser: null
		}
	}

	chooseUser = (username) => {
        this.props.setCurrentUser(username);

	};

	createNewUser = (username) => {
        this.props.initNewUser(username);
        this.props.setCurrentUser(username);
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
										   this.chooseUser(username);
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
		console.log(this.props);
		return (
			<div className="app-wrapper">
				<div className="startBar">
					{this.props.currentUser && (
						<div>
							<strong>Current Player:</strong>
							<span>{this.props.currentUser}</span>
						</div>
						)
					}
					<button onClick={this.showChoosePlayer}>Choose player</button>
				</div>
                <div className="app">
					<Board
						{...this.props.boardFunctions}
						currentUser={this.props.users[this.props.currentUser]}
					/>
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
    setCurrentUser: username => dispatch({type: "SET_CURRENT_USER", username}),
    initNewUser: username => dispatch({type: "INIT_NEW_USER", username}),
	boardFunctions: {
        failLevel: (username, lives) => dispatch({type: "USER_FAILED_LEVEL", username, lives}),
        completeLevel: (username, level, lives) =>
            dispatch({type: "USER_COMPLETED_LEVEL", username, level, lives}),
        failGame: (username) => dispatch({type: "RESET_USERS_GAME", username})
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Root);

