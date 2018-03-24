import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import "./Scores.css";
import {reduceScores} from "./ScoresModule";

class Scores extends Component {
	constructor(props) {
		super(props);

		this.state = {
			lists: props.scores.map(x => false)
		};
	}

	openList = index => {
		const newLists = this.state.lists;
		newLists[index] = true;
		this.setState({lists: newLists});
	};

	closeList = index => {
		const newLists = this.state.lists;
		newLists[index] = false;
		this.setState({lists: newLists});
	};

	drawCell = (scoreItem, property, index) => {
		if (property === "level") {
			return `Level ${scoreItem[property]}`;
		}

		if (property === "allTimes") {
			const allTimes = scoreItem[property].sort((a, b) => {
				if (a < b) {
					return -1;
				}
				if (a > b) {
					return 1;
				}
				return 0;
			});

			return (
				<div className="all-times">
					<div className="first time-item">
						<span>{`${allTimes[0]} seconds`}</span>
						<a
							role="button"
							aria-label="Open List"
							tabIndex="0"
							className="open-times"
							onClick={() => {
								this.openList(index);
							}}
						>
							+
						</a>
					</div>
					{this.state.lists[index] === true && (
						<div className="list">
							{allTimes.map((time, i) => (
								<div className="time-item" key={i}>{`${time} seconds`}</div>
							))}
							<a
								className="close close-times"
								role="button"
								tabIndex="0"
								aria-label="Close"
								onClick={() => {
									this.closeList(index);
								}}
							>
								X
							</a>
						</div>
					)}
				</div>
			);
		}

		return scoreItem[property];
	};

	render() {
		return (
			<div className="score">
				<div className="top-score">
					<h3 className="sectionTitle">Top Score</h3>
					<hr />
					{this.props.scores.length !== 0 && (
						<table>
							<thead>
								<tr>
									<th>Level</th>
									<th>
										<div className="time-item">Time</div>
									</th>
									<th>Times complited</th>
								</tr>
							</thead>
							<tbody>
								{this.props.scores.map((item, i) => {
									return (
										<tr key={i}>
											{Object.keys(item).map((property, j) => (
												<td key={j}>{this.drawCell(item, property, i)}</td>
											))}
										</tr>
									);
								})}
							</tbody>
						</table>
					)}
				</div>
			</div>
		);
	}
}

const scorePropType = PropTypes.shape({
    level: PropTypes.number.isRequired,
    allTimes: PropTypes.arrayOf(PropTypes.number).isRequired,
    count: PropTypes.number.isRequired,
});

Scores.propTypes = {
    scores: PropTypes.arrayOf(scorePropType).isRequired,
};

const mapStateToProps = (state, ownProps) => {
	return {
		scores: reduceScores(
			state.scores[ownProps.currentUser.username],
			ownProps.currentUser.completedTimes
		)
	};
};

export default connect(mapStateToProps)(Scores);
