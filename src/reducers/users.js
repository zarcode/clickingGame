import PropTypes from 'prop-types';

import config from '../config.json';
import { ACTION } from '../constants';

/*
This reducer data types:

type completedObject = Map<number,number>

type user = {
    username: string,
    maxLevel: number,
    lives: number,
    completedTimes: completedObject
}

type users = Map<string,user>

===========================================

Example:
users: {
    "default": {
        username: "default",
        maxLevel: 5,
        lives: 3,
        completedTimes: { 3: 1, 4: 2 }
    }
    ...
}
*/

export const userPropType = PropTypes.shape({
  username: PropTypes.string.isRequired,
  maxLevel: PropTypes.number.isRequired,
  lives: PropTypes.number.isRequired,
});

export const usersPropType = PropTypes.objectOf(userPropType);

const { startLevel } = config;

const defaultUser = {
  username: 'default',
  maxLevel: startLevel,
  lives: 1,
};

const defaultState = {};

defaultState[defaultUser.username] = defaultUser;

export default (state = defaultState, action) => {
  let currentUser = {};
  switch (action.type) {
    case ACTION.INIT_NEW_USER:
      return {
        ...state,
        [action.username]: {
          ...defaultUser,
          username: action.username,
        },
      };
    case ACTION.USER_FAILED_LEVEL:
      currentUser = state[action.username];
      return {
        ...state,
        [currentUser.username]: {
          ...currentUser,
          lives: action.lives,
        },
      };
    case ACTION.USER_COMPLETED_LEVEL: {
      currentUser = state[action.username];
      const completedTimes = currentUser.completedTimes ? currentUser.completedTimes : {};

      return {
        ...state,
        [currentUser.username]: {
          ...currentUser,
          maxLevel:
            action.level + 1 > currentUser.maxLevel && action.level + 1 <= config.levelsLimit
              ? action.level + 1
              : currentUser.maxLevel,
          lives: action.lives + 1,
          completedTimes: {
            ...completedTimes,
            [action.level]: completedTimes[action.level] ? completedTimes[action.level] + 1 : 1,
          },
        },
      };
    }
    case ACTION.RESET_USERS_GAME:
      currentUser = state[action.username];
      return {
        ...state,
        [currentUser.username]: {
          ...currentUser,
          maxLevel: startLevel,
          lives: 1,
        },
      };
    default:
      return state;
  }
};
