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

const defaultState = {};

defaultState["default"] = [];

export default (state = defaultState, action) => {
    switch (action.type) {
        case "USER_COMPLETED_LEVEL":
            const currentUserScores = state[action.username];

            return {
                ...state,
                [action.username]: [
                    ...currentUserScores,
                    {
                        level: action.level,
                        time: action.time
                    }
                ]
            };
        default:
            return state;
    }
};