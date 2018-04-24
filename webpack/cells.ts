const getNeighbors = function (grid, ox, oy) {
  const gridWidth = grid[0].length;
  const gridHeight = grid.length;

  // Get the positions of all adjacent tiles
  const positions = [];
  for (let y = -1; y <= 1; y++) {
    for (let x = -1; x <= 1; x++) {

      if (x == 0 && y == 0)
        continue;

      let px = (ox + x);
      if (px < 0)
        px += gridWidth;
      if (px >= gridWidth)
        px -= gridWidth;

      let py = (oy + y);
      if (py < 0)
        py += gridHeight;
      if (py >= gridHeight)
        py -= gridHeight;

      positions.push([px, py]);
    }
  }

  // Return the tiles at the obtained positions
  const neighbors = [];
  for (let i = 0; i < positions.length; i++) {
    const x = positions[i][0];
    const y = positions[i][1];
    neighbors.push(grid[y][x]);
  }

  return neighbors;
};

window.onload = function () {
  const setupCanvas = function () {
    const canvas = document.createElement("canvas");
    const pageWidth = document.body.clientWidth;
    const pageHeight = document.body.clientHeight;
    canvas.width = pageWidth * 2;
    canvas.height = pageHeight * 2;
    canvas.style.width = pageWidth + "px";
    canvas.style.height = pageHeight + "px";
    document.body.appendChild(canvas);
    return canvas;
  }
  const canvas = setupCanvas();

  // Grid constants
  const tileSize = 20;
  const gridWidth = Math.ceil(document.body.clientWidth * 2 / tileSize);
  const gridHeight = Math.ceil(document.body.clientHeight * 2 / tileSize);
  const grid = createGrid(gridWidth, gridHeight, NUMS);

  // Update
  let tickTimer = 0;
  const update = function () {
    if (tickTimer == 0) {
      // Calculate the next grid state
      for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
          updateGrid(grid, x, y);
        }
      }

      // Update current state
      for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
          grid[y][x].state = grid[y][x].nextState;
        }
      }
    }
    tickTimer++;
    if (tickTimer > 5)
      tickTimer = 0;
  };
  setInterval(update, 1000 / 60);
  update();

  const ctx = canvas.getContext("2d");
  const draw = function () {
    window.requestAnimationFrame(draw);

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#fff";

    // Draw the grid
    for (let y = 0; y < grid.length; y++) {
      const row = grid[y];
      for (let x = 0; x < row.length; x++) {
        const cell = row[x];
        ctx.globalAlpha = OPACITIES[cell.state];
        ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
      }
    }
  };
  window.requestAnimationFrame(draw);
};

const createGrid = function (width, height, nums) {
  const grid = [];
  for (let y = 0; y < height; y++) {
    const row = [];
    for (let x = 0; x < width; x++) {
      const randomNum = nums[Math.floor(Math.random() * nums.length)];
      row.push({
        state: randomNum,
        nextState: randomNum
      });
    }
    grid.push(row);
  }
  return grid;
};