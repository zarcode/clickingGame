export const reduceScores = (scores, levelRepeats) => {
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

			if (acc.length === 0 || prev.level !== curr.level)
				return acc.concat([
					{
						level: curr.level,
						allTimes: [curr.time],
						count: levelRepeats[curr.level]
					}
				]);

			if (prev.level === curr.level) {
				const allTimes = [...prev.allTimes, curr.time];
				return [
					...acc.slice(0, acc.length - 1),
					{level: curr.level, allTimes, count: levelRepeats[curr.level]}
				];
			}

			return acc;
		}, []);
};
