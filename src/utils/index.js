import config from "../config.json";

export const isEqual = (a, b) => {
	return a[0] === b[0] && a[1] === b[1];
};

export const isInside = coo => {
	return coo < config.boardSize && coo >= 0;
};

export const isFieldInArray = (field, array) => {
	const index = array.findIndex(el => {
		return isEqual(el, field);
	});

	return index !== -1;
};

export const startLevel =
	Number.isInteger(config.startLevel) &&
	config.startLevel < 100 &&
	config.startLevel > 0
		? config.startLevel
		: 1;
