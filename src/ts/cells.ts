import { updateGrid, NUMS, OPACITIES } from './conway.js';
import { Grid } from './grid.js';

let grid: Grid;
const tileSize = 10;
let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D | null;

function setupCanvas() {
  canvas = document.createElement("canvas");
  const parent = document.getElementsByClassName("grid-owner").item(0);
  if (parent) {
    canvas.width = parent.clientWidth;
    canvas.height = parent.clientWidth;
    canvas.style.width = parent.clientWidth + "px";
    canvas.style.height = parent.clientWidth + "px";
    parent.appendChild(canvas);
  }
  ctx = canvas.getContext("2d");
}

function setupGrid() {
  if (parent) {
    const gridWidth = Math.ceil(canvas.clientWidth / tileSize);
    const gridHeight = Math.ceil(canvas.clientHeight / tileSize);
    grid = new Grid(gridWidth, gridHeight, NUMS);
  }
}

window.onresize = function () {
  if (canvas) {
    console.log("Thanks for making me resize the canvas again.");
    const parent = document.getElementsByClassName("grid-owner").item(0);
    if (parent) {
      parent.removeChild(canvas);
    }
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