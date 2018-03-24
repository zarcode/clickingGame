import {isInside, isFieldInArray} from "../../utils/index";

/**
 * Randomize array element order in-place
 * Using Durstenfeld shuffle algorithm.
 */
const shuffleArray = array => {
	// const array = [...original];

	for (let i = array.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}

	return array;
};

export const getPossibleMovements = C => {
	const [Cx, Cy] = C;
	const array = [
		[Cx, Cy + 3],
		[Cx + 2, Cy + 2],
		[Cx + 3, Cy],
		[Cx + 2, Cy - 2],
		[Cx, Cy - 3],
		[Cx - 2, Cy - 2],
		[Cx - 3, Cy],
		[Cx - 2, Cy + 2]
	];

	return array.filter(point => {
		return isInside(point[0]) && isInside(point[1]);
	});
};

const getNextMoves = path => {
	return shuffleArray(
		getPossibleMovements(path[path.length - 1]).filter(
			x => !isFieldInArray(x, path)
		)
	);
};

const step = (path, requiredLenght) => {
	const moves = getNextMoves(path);

	if (moves.length === 0) {
		return path;
	} else if (requiredLenght === path.length + 1) {
		// don't return longer paths than required
		return path.concat([moves[0]]);
	} else {
		for (let i = 0; i < moves.length; i++) {
			const newPath = step(path.concat([moves[i]]), requiredLenght);

			if (newPath.length === requiredLenght) return newPath;
		}

		return path;
	}
};

export const generateBoard = (level, start) => {
	const array = [start];
	return step(array, level);
};

const isPossibleMove = (currF, nextF) => {
	if (!(isInside(nextF[0]) && isInside(nextF[1]))) return false;

	// hypotenuse
	const hypo =
		(nextF[0] - currF[0]) * (nextF[0] - currF[0]) +
		(nextF[1] - currF[1]) * (nextF[1] - currF[1]);

	return hypo === 9 || hypo === 8;
};

export const checkSolution = (level, solution) => {
	if (solution.length !== level) return false;

	return solution.reduce((acc, curr, index, array) => {
		if (index + 1 <= array.length - 1) {
			const isPossible = isPossibleMove(curr, array[index + 1]);
			if (!isPossible) {
				console.log(
					"failed",
					JSON.stringify(curr) + " " + JSON.stringify(array[index + 1])
				);
			}
			return acc && isPossibleMove(curr, array[index + 1]);
		}

		return acc;
	}, true);
};
