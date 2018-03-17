import React, {Component} from "react";
import {connect} from "react-redux";

import "./Board.css";
import {getBoardApi} from "../../utils";
import BoardStats from "./BoardStats";

class Board extends Component {
	constructor(props) {
		super(props);

		this.state = {
			started: false, // is level started
			generated: [], // generated fields
			selected: [], // fields user choose
			possible: [], // next possible fileds to select
			moves: 0, // moves count,
            time: 0  // current time spent on this level
		};

		// todo: this should come form props
        this.level = 5; // current level
        this.lives = 5; // number of lives

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

	startLevel = (field) => {
        if (!this.state.started) {
            // run timer
            this.timer = setInterval(() => {
                this.setState({ time: this.state.time + 1 })
            }, 1000);

            // init board
            this.setState({
                started: true,
                generated: this.boardApi.generateBoard(this.level, field)
            });
        }
    }

	fieldClick = (field, isPossible) => {
		// if game started let user click only "possible" fields
		if (!isPossible && this.state.started) return false;

		const moves = this.state.moves + 1;

		// successful select - push field to an array
		const selected = this.state.selected;
		selected.push(field);

		// check moves number
		if (moves === this.level) {
			if (this.boardApi.checkSolution(this.level, selected)) {
				// level success
				alert("Bravo!");
                clearInterval(this.timer);
			} else {
				// level fail
				alert("You are out of moves");
			}

			// reset board
			this.setState({
				started: false,
				generated: [],
				selected: [],
				possible: [],
				moves: 0
			});

			return false;
		}

		// get all possible moves and substract the selected ones
		const possible = this.boardApi
			.getPossibleMovements(field)
			.filter(x => !this.boardApi.isFieldInArray(x, selected));

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

        this.startLevel(field)
	};

	render() {
		return (
		    <div className="board-wrap">
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
                                    onClick={() => this.fieldClick(field, isPossible)}
                                    key={x + "" + y}
                                />
                            );
                        })
                    )}
                </div>
                <BoardStats
                    movesLeft={this.state.generated.length?this.state.generated.length - this.state.moves:this.level}
                    lives={this.lives}
                    level={this.level}
                    time={this.state.time}
                />
            </div>
		);
	}
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
	// onRefresh: () => dispatch({type: "KITTY_LIST_REQUEST", refresh: true}),
});

export default connect(mapStateToProps, mapDispatchToProps)(Board);
