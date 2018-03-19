import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
// import { purgeStoredState } from 'redux-persist'
// import { persistConfig } from  "../../configureStore"
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'

import "./Board.css";
import {getBoardApi, startLevel} from "../../utils";
import BoardStats from "./BoardStats";

class Board extends Component {
	constructor(props) {
		super(props);

		this.initialState = {
			started: false, // is level started
			generated: [], // generated fields
			selected: [], // fields user choose
			possible: [], // next possible fileds to select
			moves: 0, // moves count,
			time: 0 // current time spent on this level
		};

		this.state = {
			...this.initialState,
			level: startLevel
		};

		// this.level = props.user.level; // current level
		// this.lives = props.user.lives; // number of lives

		this.size = 10; // board size
		this.board = []; // board generator array
		for (let i = 0; i < this.size; i++) {
			this.board[i] = i;
		}

		this.boardApi = getBoardApi(this.size); // board functions
		this.timer = null; // timer interval
	}

	componentWillUnmount() {
		clearInterval(this.timer);
	}

	componentDidMount() {
		this.setState({
			level: this.props.currentUser.maxLevel
		});
	}

	startNewLevel = (field, level) => {
		// run timer
		this.timer = setInterval(() => {
			this.setState({time: this.state.time + 1});
		}, 1000);

		// init board
		this.setState({
			started: true,
			generated: this.boardApi.generateBoard(level, field)
		});
	};

	handleLevelComplete = (level, lives) => {
		// reset counter
		clearInterval(this.timer);

		this.props.completeLevel(level, lives);

		this.setState({
			level: level + 1
		});
	};

	handleLevelFail = (level, lives, moves) => {
		// reset counter
		clearInterval(this.timer);
		// alert("You are out of moves");

		const newLives = lives - (level - moves);
		if (newLives > 0) {
			this.props.failLevel(newLives);

        } else {
			this.props.failGame();

            // reset to start level
            this.setState({
                level: startLevel
            });
		}
	};

	fieldClick = (field, level, lives, isPossible) => {
		// if game started let user click only "possible" fields
		if (!isPossible && this.state.started) return false;

		// successful select - push field to an array
		const selected = [...this.state.selected];
		selected.push(field);

		// get all possible moves and substract the selected ones
		let possible = [];
		if (this.state.started) {
			possible = this.boardApi.getPossibleMovements(field).filter(x => {
				const notSelected = this.state.generated.filter(
					g => !this.boardApi.isFieldInArray(g, selected)
				);
				return this.boardApi.isFieldInArray(x, notSelected);
				// return this.boardApi.isFieldInArray(x, this.state.generated) && !this.boardApi.isFieldInArray(x, selected);
			});
		} else {
			possible = this.boardApi.getPossibleMovements(field);
		}

		// new move is made
		const moves = this.state.moves + 1;

		// if no possible moves left
		if (possible.length === 0 && level > moves) {
			// level fail
            confirmAlert({
                title: 'End game',
                message: 'You lost this game. Do you want to play again?',
                buttons: [
                    {
                        label: 'No',
                        onClick: () => {}
                    },
                    {
                        label: 'Yes',
                        onClick: () => {
                            this.handleLevelFail(level, lives, moves);
                            // reset board
                            this.setState(this.initialState);
						}
                    },
                ]
            });

			return false;
		}

		// last move
		if (moves === level) {
			// level success
            confirmAlert({
                title: `You have completed level: ${level}`,
                message: 'Do you want to play next level?',
                buttons: [
                    {
                        label: 'No',
                        onClick: () => {}
                    },
                    {
                        label: 'Yes',
                        onClick: () => {
                            this.handleLevelComplete(level, lives);
                            // reset board
                            this.setState(this.initialState);
						}
                    },
                ]
            });

			return false;
		}

		// save to state
		this.setState(
			{
				selected,
				possible
			},
			() => {
				this.setState({moves});
			}
		);

        if (!this.state.started) {
            this.startNewLevel(field, level);
        }
	};

	selectLevel = event => {
        this.setState({...this.initialState, level: parseInt(event.target.value, 10)});
	};

	render() {
		const {lives, maxLevel} = this.props.currentUser;
		const {level} = this.state;

		return (
			<div className="board-wrap">
				<div className="user-bar">
					<label>
						Select level:
						<select onChange={this.selectLevel} value={this.state.level}>
							{Array.from(
								{length: maxLevel - (startLevel - 1)},
								(v, i) => maxLevel - i
							).map(item => (
								<option key={item} value={item}>
									{item}
								</option>
							))}
						</select>
					</label>
				</div>
				<div className="board">
					{this.board.map(x =>
						this.board.map(y => {
							const field = [x, y];
							const isPossible = this.boardApi.isFieldInArray(
								field,
								this.state.possible
							);

							// class details:
							// "initial" => before game fields are generated
							// "passive" => not selected yet
							// "possible" => field that can be select based on last selected
							// "selected" => already selected filed
							const classes =
								(this.boardApi.isFieldInArray(field, this.state.generated)
									? " passive"
									: "") +
								(this.state.generated.length === 0 ? " initial" : "") +
								(isPossible ? " possible" : "") +
								(this.boardApi.isFieldInArray(field, this.state.selected)
									? " selected"
									: "");

							return (
								<div
									className={`field${classes}`}
									onClick={() =>
										this.fieldClick(field, level, lives, isPossible)
									}
									key={x + "" + y}
								/>
							);
						})
					)}
				</div>
				<BoardStats
					movesLeft={
						this.state.generated.length
							? this.state.generated.length - this.state.moves
							: level
					}
					lives={lives}
					level={level}
					time={this.state.time}
				/>
			</div>
		);
	}
}

Board.propTypes = {
    users: PropTypes.object.isRequired,
    currentUser: PropTypes.shape({
        username: PropTypes.string.isRequired,
        maxLevel: PropTypes.number.isRequired,
        lives: PropTypes.number.isRequired
    }).isRequired,
    initNewUser: PropTypes.func.isRequired,
    failLevel: PropTypes.func.isRequired,
    completeLevel: PropTypes.func.isRequired,
    failGame: PropTypes.func.isRequired
};

const mapStateToProps = state => {
	return {
		users: state.users,
		currentUser: state.currentUser
	};
};

const mapDispatchToProps = dispatch => ({
	initNewUser: user => dispatch({type: "INIT_NEW_USER", user}),
	failLevel: lives => dispatch({type: "USER_FAILED_LEVEL", lives}),
	completeLevel: (level, lives) =>
		dispatch({type: "USER_COMPLETED_LEVEL", level, lives}),
	failGame: () => dispatch({type: "RESET_USERS_GAME"})
});

export default connect(mapStateToProps, mapDispatchToProps)(Board);
