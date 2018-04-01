import { getSolution, uniqueArray, checkSolution } from './BoardModule';
import config from '../../config.json';

const N = config.boardSize;

it('algorithm solution is fine', () => {
  for (let i = 0; i < N; i += 1) {
    for (let j = 0; j < N; j += 1) {
      const solution = getSolution([i, j]);
      // is length === 100
      expect(solution.length).toBe(N * N);
      // are all unique
      expect(uniqueArray(solution).length).toBe(100);
      // is sequence correct
      expect(checkSolution(solution.length, solution)).toBe(true);
    }
  }
});
