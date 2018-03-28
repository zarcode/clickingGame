import { SCORE_PROPERTIES } from '../../constants/';

const reduceScores = (scores, levelRepeats) => {
  if (!scores || scores.length === 0) return [];

  return scores
    .sort((a, b) => {
      if (a.level > b.level) {
        return -1;
      }
      if (a.level < b.level) {
        return 1;
      }

      return 0;
    })
    .reduce((acc, curr) => {
      const prev = acc[acc.length - 1];

      if (acc.length === 0 || prev.level !== curr.level) {
        return acc.concat([
          {
            [SCORE_PROPERTIES.LEVEL]: curr.level,
            [SCORE_PROPERTIES.ALL_TIMES]: [curr.time],
            [SCORE_PROPERTIES.COUNT]: levelRepeats[curr.level],
          },
        ]);
      }

      if (prev.level === curr.level) {
        const allTimes = [...prev[SCORE_PROPERTIES.ALL_TIMES], curr.time];
        return [
          ...acc.slice(0, acc.length - 1),
          {
            [SCORE_PROPERTIES.LEVEL]: curr.level,
            [SCORE_PROPERTIES.ALL_TIMES]: allTimes,
            [SCORE_PROPERTIES.COUNT]: levelRepeats[curr.level],
          },
        ];
      }

      return acc;
    }, []);
};

export default reduceScores;
