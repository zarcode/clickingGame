import config from "../config.json";

const isEqual = (a, b) => {
    return a[0] === b[0] && a[1] === b[1]
};

class Board {
	constructor(size) {
		this.boardsize = size;

		this.history = [];
		this.final = [];
	}

	isInside = coo => {
		return coo < this.boardsize && coo >= 0;
	};

	getPossibleMovements = C => {
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
			return this.isInside(point[0]) && this.isInside(point[1]);
		});
	};

	isFieldInArray = (field, array) => {
		const index = array.findIndex(el => {
			return isEqual(el, field);
		});

		return index !== -1;
	};

	getRandomField = (items) => {
		if(items.length === 0) {
			return null;
		}

		const randomIndex = Math.floor(Math.random()*items.length);

		const random = items[randomIndex];

		const used = this.final[random[0]][random[1]];

		if(used) {
			return this.getRandomField([...items.slice(0, randomIndex), ...items.slice(randomIndex + 1)])
		}

		return random;
	};

    getNext = (current) => {
        const items = this.getPossibleMovements(current);
        return this.getRandomField(items);
    };

    getFinalCount = () => {
        return this.final.reduce((a, b) => a.concat(b), []).reduce((count, x) => {
            if(x)
                return count + 1;
            return count;
        },0);
    };

    initMatrix = (size, start) => {
        for(let i = 0; i < size; i++) {
            this.history[i] = [];
            this.final[i] = [];
            for(let j = 0; j < size; j++) {
                this.history[i][j] = undefined;
                this.final[i][j] = false;
            }
        }
	};

    generateBoard = (level, start) => {
    	const size = this.boardsize;

        this.initMatrix(size);

        this.history[start[0]][start[1]] = [size, size];
        this.final[start[0]][start[1]] = true;

        let run = true;
        let current = start;
        while (run) {
            if(this.getFinalCount() === level - 1)
                run = false;

            const next = this.getNext(current);

            if(next) {
                this.history[next[0]][next[1]] = current;
                this.final[next[0]][next[1]] = true;
                // console.log("newpair", JSON.stringify(current) + " " + JSON.stringify(next));
                current = next;
            } else {
                const pre = this.history[current[0]][current[1]];
                if(pre[0] === size && pre[1] === size) {
                    run = false;
                }
                current = pre;
            }
        }

        // console.log("valid", this.checkSolution(array.length, array));

        return this.final.reduce((accI, row, i) => {
            const reducedRow = row.reduce((accJ, point, j) => {
                if(point) return accJ.concat([[i, j]]);

                return accJ;
            }, []);

			if(reducedRow.length !== 0) {
				return accI.concat(reducedRow);
			}

			return accI;
        }, []);

	};

	isPossibleMove = (currF, nextF) => {
		if (!(this.isInside(nextF[0]) && this.isInside(nextF[1]))) return false;

		// hypotenuse
		const hypo =
			(nextF[0] - currF[0]) * (nextF[0] - currF[0]) +
			(nextF[1] - currF[1]) * (nextF[1] - currF[1]);

		return hypo === 9 || hypo === 8;
	};

	checkSolution = (level, solution) => {
		if (solution.length !== level) return false;

		return solution.reduce((acc, curr, index, array) => {
			if (index + 1 <= array.length - 1) {
				const isPossible = this.isPossibleMove(curr, array[index + 1]);
				if(!isPossible) {
                    console.log("failed", JSON.stringify(curr) + " " + JSON.stringify(array[index + 1]));
				}
                return acc && this.isPossibleMove(curr, array[index + 1]);
            }

			return acc;
		}, true);
	};
}

export const getBoardApi = size => {
	return new Board(size);
};

export const startLevel =
	Number.isInteger(config.startLevel) &&
	config.startLevel < 100 &&
	config.startLevel > 0
		? config.startLevel
		: 1;
