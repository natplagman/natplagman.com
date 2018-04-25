import { updateGrid, NUMS, OPACITIES } from './conway';

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

let grid: Grid;
const tileSize = 20;
let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D | null;

function setupCanvas() {
  canvas = document.createElement("canvas");
  const pageWidth = document.body.clientWidth;
  const pageHeight = document.body.clientHeight;
  canvas.width = pageWidth * 2;
  canvas.height = pageHeight * 2;
  canvas.style.width = pageWidth + "px";
  canvas.style.height = pageHeight + "px";
  document.body.appendChild(canvas);
  ctx = canvas.getContext("2d");
}

function setupGrid() {
  const gridWidth = Math.ceil(document.body.clientWidth * 2 / tileSize);
  const gridHeight = Math.ceil(document.body.clientHeight * 2 / tileSize);
  grid = new Grid(gridWidth, gridHeight, NUMS);
}

window.onresize = function () {
  if (canvas) {
    console.log("Thanks for making me resize the canvas again.");
    document.body.removeChild(canvas);
    setupCanvas();
    setupGrid();
  }
}

window.onload = function () {
  setupCanvas();
  setupGrid();

  // Update
  let tickTimer = 0;
  function update() {
    if (tickTimer == 0) {
      // Calculate the next grid state
      for (let y = 0; y < grid.height; y++) {
        for (let x = 0; x < grid.width; x++) {
          updateGrid(grid, x, y);
        }
      }

      // Update current state
      for (let y = 0; y < grid.height; y++) {
        for (let x = 0; x < grid.width; x++) {
          grid.cells[y][x].state = grid.cells[y][x].nextState;
        }
      }
    }
    tickTimer++;
    if (tickTimer > 5)
      tickTimer = 0;
  };
  setInterval(update, 1000 / 60);
  update();

  ctx = canvas.getContext("2d");
  function draw() {
    window.requestAnimationFrame(draw);

    if (ctx) {
      // Clear the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#fff";

      // Draw the grid
      for (let y = 0; y < grid.height; y++) {
        for (let x = 0; x < grid.width; x++) {
          const cell = grid.cells[y][x];
          ctx.globalAlpha = OPACITIES[cell.state];
          ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
        }
      }
    }
  };
  window.requestAnimationFrame(draw);
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