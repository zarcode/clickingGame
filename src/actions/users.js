export const initNewUser = username => ({ type: 'INIT_NEW_USER', username });

export const failLevel = (username, lives) => ({ type: 'USER_FAILED_LEVEL', username, lives });

export const completeLevel = (username, level, lives, time) =>
  ({
    type: 'USER_COMPLETED_LEVEL',
    username,
    level,
    lives,
    time,
  });

export const failGame = username => ({ type: 'RESET_USERS_GAME', username });
