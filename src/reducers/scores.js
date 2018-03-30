import PropTypes from 'prop-types';
import { ACTION, SCORE_PROPERTIES } from '../constants';

/*
This reducer data types:

type score = {
    level: number,
    time: number
}

type scoreList = Array<score>

type scores = Map<string,scoreList>

===========================================

Example:
scores: {
    "default": [
        {level: 1, time: 5}
        {level: 2, time: 7}
        ...
    ]
}
*/

export const scorePropType = PropTypes.shape({
  [SCORE_PROPERTIES.LEVEL]: PropTypes.number.isRequired,
  [SCORE_PROPERTIES.ALL_TIMES]: PropTypes.arrayOf(PropTypes.number).isRequired,
  [SCORE_PROPERTIES.COUNT]: PropTypes.number.isRequired,
});

export const scoresPropType = PropTypes.arrayOf(scorePropType);

const defaultState = {};

const DEFAULT_USERNAME = 'default';

defaultState[DEFAULT_USERNAME] = [];

export default (state = defaultState, action) => {
  if (action.type === ACTION.USER_COMPLETED_LEVEL) {
    const currentUserScores = state[action.username] ? state[action.username] : [];
    return {
      ...state,
      [action.username]: [
        ...currentUserScores,
        {
          level: action.level,
          time: action.time,
        },
      ],
    };
  }
  return state;
};
