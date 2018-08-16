import { getNeighbors, Grid } from './cells';

export const NUMS = [0, 1, 2];
export const OPACITIES = [0.0, 0.1, 0.2];

export function updateGrid (grid: Grid, x: number, y: number) {
  const cell = grid.cells[y][x];

  const neighbors = getNeighbors(grid, x, y);
  let livingNeighbors = 0;
  for (var i = 0; i < neighbors.length; i++) {
    if (neighbors[i].state == 1)
      livingNeighbors++;
  }
  if (cell.state > 0) {
    cell.nextState = (cell.state + 1) % 3;
  } else {
    if (livingNeighbors == 2)
      cell.nextState = 1;
  }
};