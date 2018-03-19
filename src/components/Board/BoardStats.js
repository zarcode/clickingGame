import React from "react";
import PropTypes from "prop-types";

import "./BoardStats.css";

const BoardStats = ({movesLeft, time, lives, level}) => {
	return (
		<div className="stats">
			<h3>Game Stats</h3>
			<div className="stats-detail">
				Timer: <strong>{`${time}seconds`}</strong>
			</div>
			<div className="stats-detail">
				Left to click: <strong>{movesLeft}</strong>
			</div>
			<div className="stats-detail">
				Lives: <strong>{lives}</strong>
			</div>
			<div className="stats-detail">
				Level: <strong>{level}</strong>
			</div>
		</div>
	);
};

BoardStats.propTypes = {
	movesLeft: PropTypes.number.isRequired,
	time: PropTypes.number.isRequired,
	lives: PropTypes.number.isRequired,
	level: PropTypes.number.isRequired
};

export default BoardStats;
