import PropTypes from 'prop-types';

import { ACTION } from '../constants';

export const currentUserPropType = PropTypes.string;

export default (state = 'default', action) => {
  switch (action.type) {
    case ACTION.SET_CURRENT_USER:
      return action.username;

    default:
      return state;
  }
};
