const isEqual = require('lodash/isEqual');

class Board {
    constructor(size) {
        this.boardsize = size
    }

    isInside = (coo) => {
        return (coo < this.boardsize && coo >= 0)
    }

    getPossibleMovements = (C) => {
        const [Cx, Cy] = C;
        const array = [
            [Cx, Cy + 3],
            [Cx + 2, Cy + 2],
            [Cx + 3, Cy],
            [Cx + 2, Cy - 2],
            [Cx, Cy - 3],
            [Cx - 2, Cy - 2],
            [Cx - 3, Cy],
            [Cx - 2, Cy + 2],
        ];

        return array.filter((point) => {
            return this.isInside(point[0]) && this.isInside(point[1])
        })
    };

    isFieldInArray = (field, array) => {
        const index = array.findIndex((el) => {
            return isEqual(el, field)
        });

        return index !== -1;
    };

    getRandomField = (array, items) => {
        const random = items[Math.floor(Math.random() * items.length)];

        if (this.isFieldInArray(random, array)) {
            return this.getRandomField(array, items)
        }
        return random;
    };

    getNext = (array, x) => {
        const items = this.getPossibleMovements(x);
        return this.getRandomField(array, items);
    };

    generateBoard = (level, start) => {
        return Array.apply(0, {length: level})
            .reduce((acc, curr, index) => {
                return acc.concat([(index === 0) ? start : this.getNext(acc, acc[index - 1])])
            }, [])
    };

    isPossibleMove = (currF, nextF) => {
        if(!( this.isInside(nextF[0]) && this.isInside(nextF[1]) ))
            return false;

        const hypo = (nextF[0] - currF[0])*(nextF[0] - currF[0]) + (nextF[1] - currF[1])*(nextF[1] - currF[1]);

        return (hypo === 9 || hypo === 8)
    };

    checkSolution = (level, solution) => {
        if(solution.length !== level)
            return false;

        return solution.reduce((acc, curr, index, array) => {
            // const allPossible = this.getPossibleMovements(curr);
            if(index + 1 <= array.length - 1)
                // return acc && this.isFieldInArray(array[index + 1], allPossible)
                return acc && this.isPossibleMove(curr, array[index + 1]);

            return acc;
        }, true)
    }
}

export const getBoard = (size) => {
    return new Board(size)
};











