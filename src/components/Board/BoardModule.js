import { isInside } from '../../utils/index';
import config from '../../config.json';

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

export const uniqueArray = a => a.filter((item, pos) => {
  const index = a.findIndex(x => x[0] === item[0] && x[1] === item[1]);
  return index === pos;
});

/* Helper functions End */

function print(a) {
  const array = [];
  for (let i = 1; i <= 100; i += 1) {
    const index = a.findIndex(item => item === i);
    array.push([parseInt(index / 10, 10), index % 10]);
  }

  return array;
}

// ES6 program to for Knight's tour problem using
// Warnsdorff's algorithm
const N = config.boardSize;
let gx;
let gy;
const a = [];

// Move pattern on basis of the change of
// x coordinates and y coordinates respectively
const cx = [3, -3, 0, 0, 2, -2, 2, -2];
const cy = [0, 0, 3, -3, 2, -2, -2, 2];

// function restricts the knight to remain within
// the 8x8 chessboard
function limits(x, y) {
  return ((x >= 0 && y >= 0) && (x < N && y < N));
}

/* Checks whether a square is valid and empty or not */
function isempty(ar, x, y) {
  return (limits(x, y)) && (ar[(x * N) + y] < 0);
}

/* Returns the number of empty squares adjacent
 to (x, y) */
function getDegree(ar, x, y) {
  let count = 0;
  for (let i = 0; i < N; i += 1) {
    if (isempty(ar, (x + cx[i]), (y + cy[i]))) {
      count += 1;
    }
  }

  return count;
}

// Picks next point using Warnsdorff's heuristic.
// Returns false if it is not possible to pick
// next point.
function nextMove() {
  let minDegIdx = -1;
  let c;
  let minDeg = (N + 1);
  let nx;
  let ny;

  // Try all N adjacent of (*x, *y) starting
  // from a random adjacent. Find the adjacent
  // with minimum degree.
  const start = Math.floor(Math.random() * (N + 1));
  for (let count = 0; count < N; count += 1) {
    const i = (start + count) % N;
    nx = gx + cx[i];
    ny = gy + cy[i];

    c = getDegree(a, nx, ny);
    if ((isempty(a, nx, ny)) && c < minDeg) {
      minDegIdx = i;
      minDeg = c;
    }
  }

  // IF we could not find a next cell
  if (minDegIdx === -1) {
    return false;
  }

  // Store coordinates of next point
  nx = gx + cx[minDegIdx];
  ny = gy + cy[minDegIdx];
  // Mark next move
  a[(nx * N) + ny] = a[((gx) * N) + (gy)] + 1;
  // Update next point
  gx = nx;
  gy = ny;

  return true;
}

/* checks its neighbouring sqaures */
/* If the knight ends on a square that is one
knight's move from the beginning square,
then tour is closed */
function neighbour(x, y, xx, yy) {
  for (let i = 0; i < N; i += 1) {
    if (((x + cx[i]) === xx) && ((y + cy[i]) === yy)) {
      return true;
    }
  }

  return false;
}

/* Generates the legal moves using warnsdorff's
heuristics. Returns false if not possible */
function findClosedTour(sx, sy) {
  // Filling up the chessboard matrix with -1's
  for (let i = 0; i < N * N; i += 1) {
    a[i] = -1;
  }

  // Randome initial position
  // var sx = Math.floor(Math.random() * (N + 1));
  // var sy = Math.floor(Math.random() * (N + 1));

  // Current points are same as initial points
  gy = sy;
  gx = sx;
  a[(gx * N) + gy] = 1; // Mark first move.

  // Keep picking next points using
  // Warnsdorff's heuristic
  for (let i = 0; i < (N * N) - 1; i += 1) {
    if (nextMove() === false) {
      return false;
    }
  }

  // Check if tour is closed (Can end
  // at starting point)
  if (!neighbour(gx, gy, sx, sy)) {
    return false;
  }
  return print(a);
}

export const getSolution = (start) => {
  let solution = null;
  // While we don't get a solution
  while (true) {
    solution = findClosedTour(start[0], start[1]);
    if (solution) {
      break;
    }
  }
  return solution;
};

export const generateBoard = (level, start) => getSolution(start).slice(0, level);
