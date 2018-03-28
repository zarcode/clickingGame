import PropTypes from 'prop-types';

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
  level: PropTypes.number.isRequired,
  allTimes: PropTypes.arrayOf(PropTypes.number).isRequired,
  count: PropTypes.number.isRequired,
});

export const scoresPropType = PropTypes.arrayOf(scorePropType);

const defaultState = {};

const DEFAULT_USERNAME = 'default';

defaultState[DEFAULT_USERNAME] = [];

export default (state = defaultState, action) => {
  if (action.type === 'USER_COMPLETED_LEVEL') {
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
