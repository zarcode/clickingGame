import React from 'react';
import PropTypes from 'prop-types';

import styles from './BoardStats.css';

const BoardStats = ({
  movesLeft, time, lives, level,
}) => (
  <div className={styles.stats}>
    <h3 className={`sectionTitle ${styles.sectionTitle}`}>Game Stats</h3>
    <div className={styles.statsDetail}>
      Timer: <strong>{`${time}seconds`}</strong>
    </div>
    <div className={styles.statsDetail}>
      Left to click: <strong>{movesLeft}</strong>
    </div>
    <div className={styles.statsDetail}>
      Lives: <strong>{lives}</strong>
    </div>
    <div className={styles.statsDetail}>
      Level: <strong>{level}</strong>
    </div>
  </div>
);

BoardStats.propTypes = {
  movesLeft: PropTypes.number.isRequired,
  time: PropTypes.number.isRequired,
  lives: PropTypes.number.isRequired,
  level: PropTypes.number.isRequired,
};

export default BoardStats;
