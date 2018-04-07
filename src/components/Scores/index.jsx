import React, { Component } from 'react';
import { connect } from 'react-redux';

import { scoresPropType } from '../../reducers/scores';
import { SCORE_PROPERTIES } from '../../constants/';
import styles from './Scores.css';
import reduceScores from './ScoresModule';

const uniqid = require('uniqid');

class Scores extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lists: props.scores.map(() => false),
    };
  }

  openList = index => () => {
    const newLists = this.state.lists;
    newLists[index] = true;
    this.setState({ lists: newLists });
  };

  closeList = index => () => {
    const newLists = this.state.lists;
    newLists[index] = false;
    this.setState({ lists: newLists });
  };

  drawCell(scoreItem, property, index) {
    if (property === SCORE_PROPERTIES.LEVEL) {
      return `Level ${scoreItem[property]}`;
    }

    if (property === SCORE_PROPERTIES.ALL_TIMES) {
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
        <div className={styles.allTimes}>
          <div className={`${styles.first} ${styles.timeItem}`}>
            <span>{`${allTimes[0]} seconds`}</span>
            <div className={styles.openTimes}>
              <button
                aria-label="Open List"
                onClick={this.openList(index)}
              >
                +
              </button>
            </div>
          </div>
          {this.state.lists[index] === true && (
            <div className={styles.list}>
              {allTimes.map(time => <div key={uniqid()} className={styles.timeItem}>{`${time} seconds`}</div>)}
              <button
                className={`close ${styles.closeTimes}`}
                aria-label="Close"
                onClick={this.closeList(index)}
              >
                X
              </button>
            </div>
          )}
        </div>
      );
    }

    return scoreItem[property];
  }

  render() {
    return (
      <div className={styles.score}>
        <div className={styles.topScore}>
          <h3 className={`sectionTitle ${styles.sectionTitle}`}>Top Score</h3>
          <hr />
          {this.props.scores.length !== 0 && (
            <table>
              <thead>
                <tr>
                  <th>Level</th>
                  <th>
                    <div className={styles.timeItem}>Time</div>
                  </th>
                  <th>Times complited</th>
                </tr>
              </thead>
              <tbody>
                {this.props.scores.map((item, i) => (
                  <tr key={item.level}>
                    {Object.keys(item).map(property => (
                      <td key={property}>{this.drawCell(item, property, i)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    );
  }
}

Scores.propTypes = {
  scores: scoresPropType.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  scores: reduceScores(
    state.scores[ownProps.currentUser.username],
    ownProps.currentUser.completedTimes,
  ),
});

export default connect(mapStateToProps)(Scores);
