export function getNeighbors(grid: Grid, ox: number, oy: number) {
  // Get the positions of all adjacent tiles
  const positions: number[][] = [];
  for (let y = -1; y <= 1; y++) {
    for (let x = -1; x <= 1; x++) {

      if (x == 0 && y == 0)
        continue;

      let px = (ox + x);
      if (px < 0)
        px += grid.width;
      if (px >= grid.width)
        px -= grid.width;

      let py = (oy + y);
      if (py < 0)
        py += grid.height;
      if (py >= grid.height)
        py -= grid.height;

      positions.push([px, py]);
    }
  }

  // Return the tiles at the obtained positions
  const neighbors: State[] = [];
  for (let i = 0; i < positions.length; i++) {
    const x = positions[i][0];
    const y = positions[i][1];
    neighbors.push(grid.cells[y][x]);
  }

  return neighbors;
};

export class State {
  constructor(public state: number = 0, public nextState: number = 0) {

  }
}

export class Grid {
  public cells: State[][] = [];

  constructor(public width: number, public height: number, nums: number[]) {
    for (let y = 0; y < height; y++) {
      const row: State[] = [];
      for (let x = 0; x < width; x++) {
        const randomNum = nums[Math.floor(Math.random() * nums.length)];
        row.push(new State(randomNum, randomNum));
      }
      this.cells.push(row);
    }
  }
}