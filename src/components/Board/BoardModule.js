import { isInside } from '../../utils/index';

const graphTours = function (start, graph, maxNumSolutions) {
  // graph is an array of arrays
  // graph[3] = [4, 5] means nodes 4 and 5 are reachable from node 3
  //
  // Returns an array of tours (up to maxNumSolutions in size), where
  // each tour is an array of nodes visited in order, and where each
  // tour visits every node in the graph exactly once.
  //
  // let node; changed
  let n;
  const completeTours = [];
  const visited = graph.map(() => false);
  const deadEnds = graph.map(() => ({}));
  const tour = [(start[0] * 10) + start[1]];

  const validNeighbors = function (i) {
    return graph[i].reduce((acc, neighbor) => {
      if (deadEnds[i][neighbor]) {
        return acc;
      }
      if (visited[neighbor]) return acc;

      return acc.concat([neighbor]);
    }, []);
  };

  const nextSquareToVisit = function (i) {
    const arr = validNeighbors(i);
    if (arr.length === 0) { return null; }

    // We traverse to our neighbor who has the fewest neighbors itself.
    let fewestNeighbors = validNeighbors(arr[0]).length;
    let neighbor = arr[0];
    arr.map((item, k) => {
      n = validNeighbors(arr[k]).length;
      if (n < fewestNeighbors) {
        fewestNeighbors = n;
        neighbor = arr[k];
      }
      return true;
    });
    return neighbor;
  };

  while (tour.length > 0) {
    let currentSquare = tour[tour.length - 1];
    visited[currentSquare] = true;
    const nextSquare = nextSquareToVisit(currentSquare);
    if (nextSquare != null) {
      tour.push(nextSquare);
      if (tour.length === graph.length) {
        completeTours.push(tour);
        if (completeTours.length === maxNumSolutions) { break; }
      }
      // pessimistically call this a dead end
      deadEnds[currentSquare][nextSquare] = true;
      currentSquare = nextSquare;
    } else {
      // we backtrack
      const doomedSquare = tour.pop();
      deadEnds[doomedSquare] = {};
      visited[doomedSquare] = false;
    }
  }
  return completeTours;
};


const knightGraph = function (boardWidth) {
  // Turn the Knight's Tour into a pure graph-traversal problem
  // by precomputing all the legal moves. Returns an array of arrays,
  // where each element in any subarray is the index of a reachable node.
  const index = (i, j) =>
    // index squares from 0 to n*n - 1
    (boardWidth * i) + j;

  const reachableSquares = function (i, j) {
    const deltas = [[0, 3], [0, -3], [3, 0], [-3, 0], [-2, -2], [2, 2], [2, -2], [-2, 2]];
    return deltas.reduce((acc, delta) => {
      const [di, dj] = delta;
      const ii = i + di;
      const jj = j + dj;
      if (ii >= 0 && ii < boardWidth) {
        if (jj >= 0 && jj < boardWidth) {
          return acc.concat([index(ii, jj)]);
        }
      }
      return acc;
    }, []);
  };

  const graph = [];
  for (let i = 0; i < boardWidth; i += 1) {
    for (let j = 0; j < boardWidth; j += 1) {
      graph[index(i, j)] = reachableSquares(i, j);
    }
  }
  return graph;
};

// const illustrateKnightsTour = function (tour, boardWidth) {
//   const pad = function (n) {
//     if ((n == null)) { return ' _'; }
//     if (n < 10) { return ` ${n}`; }
//     return `${n}`;
//   };
//
//   console.log('\n------');
//   const moves = {};
//   for (let i = 0; i < tour.length; i += 1) {
//     const square = tour[i];
//     moves[square] = i + 1;
//   }
//   return (() => {
//     const result = [];
//     for (let i = 0; i < boardWidth; i += 1) {
//       let s = '';
//       for (let j = 0; j < boardWidth; j += 1) {
//         s += `  ${pad(moves[(i * boardWidth) + j])}`;
//       }
//       result.push(console.log(s));
//     }
//     return result;
//   })();
// };

const BOARD_WIDTH = 10;
const MAX_NUM_SOLUTIONS = 1;

export const generateBoard = (level, start) => {
  const graph = knightGraph(BOARD_WIDTH);
  const tours = graphTours(start, graph, MAX_NUM_SOLUTIONS);
  // illustrateKnightsTour(tours[0], BOARD_WIDTH);
  return tours.length > 0 ?
    tours[0].map((item) => {
      if (item < 10) {
        return [0, item];
      }
      return [parseInt(item / 10, 10), item % 10];
    }).slice(0, level) : null;
};

/* Helper functions */

export const getPossibleMovements = (C) => {
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

  return array.filter(point => isInside(point[0]) && isInside(point[1]));
};

const isPossibleMove = (currF, nextF) => {
  if (!(isInside(nextF[0]) && isInside(nextF[1]))) return false;

  // hypotenuse
  const hypo =
    ((nextF[0] - currF[0]) * (nextF[0] - currF[0])) +
    ((nextF[1] - currF[1]) * (nextF[1] - currF[1]));

  return hypo === 9 || hypo === 8;
};

export const checkSolution = (level, solution) => {
  if (solution.length !== level) return false;

  return solution.reduce((acc, curr, index, array) => {
    if (index + 1 <= array.length - 1) {
      return acc && isPossibleMove(curr, array[index + 1]);
    }

    return acc;
  }, true);
};
