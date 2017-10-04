/* Todo:
    Speed settings
    Size settings
*/

// Grid
var gridWidth; // Number of columns (cells)
var gridHeight; // Number of rows (cells)
var kLineWidth = 3.0;
var kCellSize = 10.0; // px
var cellSize = kCellSize;

// Canvas
var width;
var height;

var cellFillStyle = "#fff";
var cellEmptyStyle = "#000";
var highlightFillStyle = "#faa";
var gridStrokeStyle = "#666";

var updateInterval = 100; //ms

function getCellFromMousePos(mousePos, rect) {
    if (mousePos[0] < rect.left || mousePos[0] > rect.right || mousePos[1] < rect.top || mousePos[1] > rect.bottom) {
        return [-1, -1];
    }
    var posX = Math.floor((mousePos[0] - rect.left) / (cellSize + kLineWidth));
    var posY = Math.floor((mousePos[1] - rect.top) / (cellSize + kLineWidth));
    return [posX, posY];
}

function isValidCell(cellPos) {
    return (cellPos[0] >= 0 && cellPos[0] < gridWidth && cellPos[1] >= 0 && cellPos[1] < gridHeight);
}

function setCell(currentState, pos, val, updatedCells) {
    if (isValidCell(pos)) {
        // No need to update anything if the cell won't be changed
        if (currentState[pos[1]][pos[0]] != val) {
            currentState[pos[1]][pos[0]] = val;
            updatedCells.push([pos[0], pos[1]]);
        }
    }
}

function clearCells(currentState, updatedCells) {
    for (var y = 0; y < gridHeight; ++y) {
        for (var x = 0; x < gridWidth; ++x) {
            setCell(currentState, [x, y], 0, updatedCells);
        }
    }
}

function countLivingNeighbors(state, x, y) {
    var count = 0;
    for (var i = -1; i <= 1; ++i) {
        var yPos = y + i;
        if (yPos < 0) yPos += gridHeight;
        if (yPos >= gridHeight) yPos -= gridHeight;

        for (var j = -1; j <= 1; ++j) {
            var xPos = x + j;
            if (xPos < 0) xPos += gridWidth;
            if (xPos >= gridWidth) xPos -= gridWidth;

            count += state[yPos][xPos];
        }
    }

    if (state[y][x] == 1) {
        --count; // The cell itself shouldn't be counted as a living neighbor
    }

    return count;
}

function drawGridLines(context) {
    context.strokeStyle = gridStrokeStyle;
    context.beginPath();

    // Draw horizontal lines
    for (var y = 1; y < gridHeight; ++y) {
        context.moveTo(0, (cellSize + kLineWidth / 2) * y + (kLineWidth / 2) * (y - 1));
        context.lineTo(width, (cellSize + kLineWidth / 2) * y + (kLineWidth / 2) * (y - 1));
    }

    // Draw vertical lines
    for (var x = 1; x < gridWidth; ++x) {
        context.moveTo((cellSize + kLineWidth / 2) * x + (kLineWidth / 2) * (x - 1), 0);
        context.lineTo((cellSize + kLineWidth / 2) * x + (kLineWidth / 2) * (x - 1), height);
    }

    context.stroke();
}

function removeHighlight(context, currentState, highlightedCellPos) {
    // Remove the previous highlight if applicable
    if (isValidCell(highlightedCellPos)) {
        var x = highlightedCellPos[0];
        var y = highlightedCellPos[1];
        var xPos = (cellSize + kLineWidth) * x;
        var yPos = (cellSize + kLineWidth) * y;

        if (currentState[y][x] == 1) {
            context.fillStyle = cellFillStyle;
            context.fillRect(xPos, yPos, cellSize, cellSize);
        } else {
            context.fillStyle = cellEmptyStyle;
            context.fillRect(xPos, yPos, cellSize, cellSize);
        }
    }
}

function drawHighlight(context, currentState, currentCellPos) {
    // Draw transparent preview of currently moused-over cell if applicable
    if (isValidCell(currentCellPos)) {
        context.globalAlpha = 0.6;
        context.fillStyle = highlightFillStyle;
        context.fillRect((cellSize + kLineWidth) * currentCellPos[0], (cellSize + kLineWidth) * currentCellPos[1], cellSize, cellSize);

        context.globalAlpha = 1.0;
    }
}

function draw(context, currentState, currentCellPos, updatedCells) {
    // Redraw only updated cells
    for (var i = 0; i < updatedCells.length; ++i) {
        var x = updatedCells[i][0];
        var y = updatedCells[i][1];
        var xPos = (cellSize + kLineWidth) * x;
        var yPos = (cellSize + kLineWidth) * y;

        if (currentState[updatedCells[i][1]][x] == 1) {
            context.fillStyle = cellFillStyle;
            context.fillRect(xPos, yPos, cellSize, cellSize);
        } else {
            context.fillStyle = cellEmptyStyle;
            context.fillRect(xPos, yPos, cellSize, cellSize);
        }
    }

    updatedCells.length = 0;

    // Highlight should be drawn on top
    drawHighlight(context, currentState, currentCellPos);
}

function update(context, currentState, paused, updatedCells, currentCellPos) {
    if (paused) return;

    var previousState = JSON.parse(JSON.stringify(currentState));

    var changed = false;
    // Iterate through the grid, updating cells based on their neighbors in the previous state
    for (var y = 0; y < gridHeight; ++y) {
        for (var x = 0; x < gridWidth; ++x) {

            var neighbors = countLivingNeighbors(previousState, x, y);
            if (currentState[y][x] == 1) {
                if (neighbors < 2 || neighbors > 3) {
                    // Living ells with less than 2 neighbors die by underpopulation
                    // Living cells with greater than 3 neighbors die by overpopulation
                    setCell(currentState, [x, y], 0, updatedCells);
                    changed = true;
                }
            } else if (neighbors == 3) {
                // Dead cells with exactly 3 neighbors should become alive
                setCell(currentState, [x, y], 1, updatedCells);
                changed = true;
            }
        }
    }

    if (changed) {
        draw(context, currentState, currentCellPos, updatedCells);
    }
}

function resizeCanvas(highlightedCell, updatedCells, currentState) {
    var useableWidth = $("#game").width();
    
    gridWidth = Math.floor((useableWidth) / (cellSize + kLineWidth));
    gridHeight = 50;
    width = gridWidth * (cellSize + kLineWidth) - kLineWidth;
    height = gridHeight * (cellSize + kLineWidth) - kLineWidth;

    var canvas = document.getElementById("grid");
    var context = canvas.getContext("2d");
    
    canvas.width = width;
    canvas.height = height;
    $("#menu").width(canvas.width);
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawGridLines(context);
    
    highlightedCell = [-1, -1];
    for (var i in updatedCells) {
        updatedCells.pop();
    }
    for (var i in currentState) {
        currentState.pop();
    }
    for (var y = 0; y < gridHeight; ++y) {
        currentState[y] = new Array(gridWidth);
        for (var x = 0; x < gridWidth; ++x) {
            currentState[y][x] = 0;
        }
    }
}

function start() {
    var canvas = document.getElementById("grid");
    var context = canvas.getContext("2d");

    var currentState = new Array(gridHeight);
    var paused = true;
    var holdingMouse = false;
    var mousePos;
    var setValue = 1;
    var updatedCells = [];
    var highlightedCell = [-1, -1],
        currentCellPos = [-1, -1];

    setInterval(function () {
        update(context, currentState, paused, updatedCells, currentCellPos);
    }, updateInterval);

    // Set event listeners (JavaScript, you really need less-convoluted pass-by-reference capabilities)

    $(window).on("mousedown", function (event) {
        if (isValidCell(currentCellPos)) {
            holdingMouse = true;
            setValue = !currentState[currentCellPos[1]][currentCellPos[0]];
            setCell(currentState, currentCellPos, setValue, updatedCells);
        }
    });

    $(window).on("mousemove", function (event) {
        mousePos = [event.clientX, event.clientY];
        var oldCellPos = currentCellPos;
        currentCellPos = getCellFromMousePos(mousePos, canvas.getBoundingClientRect());
        if (oldCellPos[0] != currentCellPos[0] || oldCellPos[1] != currentCellPos[1] || (isValidCell(oldCellPos) && !isValidCell(currentCellPos))) {
            removeHighlight(context, currentState, oldCellPos);
            draw(context, currentState, currentCellPos, updatedCells);
        }

        if (isValidCell(currentCellPos)) {
            // Update the clicked cell if applicable
            if (holdingMouse) {
                setCell(currentState, currentCellPos, setValue, updatedCells);
            }
        }
    });

    $(window).on("mouseup", function (event) {
        holdingMouse = false;
    });

    var pauseButton = $("#pauseButton");

    function togglePaused() {
        paused = !paused;
        pauseButton.text((paused) ? "Play" : "Pause");
    }

    pauseButton.on("click", function (event) {
        togglePaused(paused);
    });

    $("#clearButton").on("click", function (event) {
        clearCells(currentState, updatedCells);
        draw(context, currentState, currentCellPos, updatedCells);
    });

    window.addEventListener("resize", function (event) {
        resizeCanvas(highlightedCell, updatedCells, currentState);
    });
    resizeCanvas(highlightedCell, updatedCells, currentState);
}

start();
