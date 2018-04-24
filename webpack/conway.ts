var NUMS = [0, 1];
var OPACITIES = [0.0, 0.3];

var updateGrid = function (grid, x, y) {
  var cell = grid[y][x];

  var neighbors = getNeighbors(grid, x, y);
  var livingNeighbors = 0;
  for (var i = 0; i < neighbors.length; i++) {
    if (neighbors[i].state == 1)
      livingNeighbors++;
  }
  // < 2 neighbors -> die
  // > 3 neighbors -> die
  // 3 neighbors -> live
  if (cell.state == 1) {
    if (livingNeighbors < 2)
      cell.nextState = 0;
    if (livingNeighbors > 3)
      cell.nextState = 0;
  } else {
    if (livingNeighbors == 3)
      cell.nextState = 1;
  }
};