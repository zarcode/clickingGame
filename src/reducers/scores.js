const defaultState = {};

defaultState["default"] = [];

export default (state = defaultState, action) => {
    switch (action.type) {
        case "USER_COMPLETED_LEVEL":
            const newScore = {
                level: action.level,
                time: action.time
            };

            const currentUserScores = state[action.username];

            return {
                ...state,
                [action.username]: [
                    ...currentUserScores,
                    newScore
                ]
            };
        default:
            return state;
    }
};