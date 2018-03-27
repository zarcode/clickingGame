import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { scorePropType } from '../../reducers/scores';
import './Scores.css';
import reduceScores from './ScoresModule';

class Scores extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lists: props.scores.map(() => false),
    };

    this.openList = this.openList.bind(this);
    this.closeList = this.closeList.bind(this);
    this.drawCell = this.drawCell.bind(this);
  }

  openList(index) {
    const newLists = this.state.lists;
    newLists[index] = true;
    this.setState({ lists: newLists });
  }

  closeList(index) {
    const newLists = this.state.lists;
    newLists[index] = false;
    this.setState({ lists: newLists });
  }

  drawCell(scoreItem, property, index) {
    if (property === 'level') {
      return `Level ${scoreItem[property]}`;
    }

    if (property === 'allTimes') {
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
            <button
              aria-label="Open List"
              className="open-times"
              onClick={() => {
                this.openList(index);
              }}
            >
              +
            </button>
          </div>
          {this.state.lists[index] === true && (
            <div className="list">
              {allTimes.map(time => <div className="time-item">{`${time} seconds`}</div>)}
              <button
                className="close close-times"
                aria-label="Close"
                onClick={() => {
                  this.closeList(index);
                }}
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
  scores: PropTypes.arrayOf(scorePropType).isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  scores: reduceScores(
    state.scores[ownProps.currentUser.username],
    ownProps.currentUser.completedTimes,
  ),
});

export default connect(mapStateToProps)(Scores);
