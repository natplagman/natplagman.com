/* Todo:
    Optimize drawing code
    Speed settings
    Size settings
*/

var gridWidth = 50; // Number of columns (cells)
var gridHeight = 50; // Number of rows (cells)
var cellSize = 10; // px
var lineWidth = 2.0;

var cellFillStyle = "#fff";
var gridStrokeStyle = "#666";

var updateInterval = 100; //ms

var width = gridWidth * (cellSize + lineWidth) - lineWidth;
var height = gridHeight * (cellSize + lineWidth) - lineWidth;

function getCellFromMousePos(mousePos, rect) {
    var posX = Math.floor((mousePos[0] - rect.left) / (cellSize + lineWidth));
    var posY = Math.floor((mousePos[1] - rect.top) / (cellSize + lineWidth));
    return [posX, posY];
}

function toggleCell(currentState, pos) {
    //console.log("Toggled cell " + pos[0] + ", " + pos[1]);
    currentState[pos[1]][pos[0]] = !currentState[pos[1]][pos[0]];
}

function setCell(currentState, pos, val) {
    currentState[pos[1]][pos[0]] = val;
}

function countNeighbors(state, x, y) {
    var count = 0;
    for (var i = -1; i <= 1; ++i) {
        var yPos = y + i;
        if (yPos < 0) yPos += gridHeight;
        if (yPos >= gridHeight) yPos -= gridHeight;

        for (var j = -1; j <= 1; ++j) {
            var xPos = x + j;
            if (xPos < 0) xPos += gridWidth;
            if (xPos >= gridWidth) xPos -= gridWidth;

            //console.log("Neighbor at " + x + ", " + y);
            count += state[yPos][xPos];
        }
    }

    if (state[y][x] == 1) {
        --count;
    }

    return count;
}

function drawGrid(context) {
    context.strokeStyle = gridStrokeStyle;
    context.beginPath();
    // Draw horizontal lines
    for (var y = 1; y < gridHeight; ++y) {
        context.moveTo(0, (cellSize + lineWidth / 2) * y + (lineWidth / 2) * (y - 1));
        context.lineTo(width, (cellSize + lineWidth / 2) * y + (lineWidth / 2) * (y - 1));
    }

    // Draw vertical lines
    for (var x = 1; x < gridWidth; ++x) {
        context.moveTo((cellSize + lineWidth / 2) * x + (lineWidth / 2) * (x - 1), 0);
        context.lineTo((cellSize + lineWidth / 2) * x + (lineWidth / 2) * (x - 1), height);
    }

    context.stroke();
}

function draw(context, currentState, holdingMouse, mousePos, rect, setValue) {
    if (holdingMouse) {
        var cellPos = getCellFromMousePos(mousePos, rect);
        setCell(currentState, cellPos, setValue);
    }

    context.clearRect(0, 0, width, height);
    drawGrid(context);

    // Draw each cell
    context.fillStyle = cellFillStyle;
    for (var y = 0; y < gridHeight; ++y) {
        var yPos = (cellSize + lineWidth) * y;
        for (var x = 0; x < gridWidth; ++x) {
            if (currentState[y][x] == 1) {
                var xPos = (cellSize + lineWidth) * x;
                context.fillRect(xPos, yPos, cellSize, cellSize);
            }
        }
    }
}

function update(currentState, paused) {
    if (paused) return;

    var previousState = JSON.parse(JSON.stringify(currentState));

    for (var y = 0; y < gridHeight; ++y) {
        for (var x = 0; x < gridWidth; ++x) {
            var neighbors = countNeighbors(previousState, x, y);
            if (neighbors != 0) {
                //console.log("Cell " + x + ", " + y + " has " + neighbors + " neighbors.");
            }
            if (neighbors < 2) {
                currentState[y][x] = 0;
            } else if (neighbors > 3) {
                currentState[y][x] = 0;
            } else if (neighbors == 3) {
                currentState[y][x] = 1;
            }
        }
    }
}

function start() {
    var canvas = document.getElementById("grid");
    var context = canvas.getContext("2d");

    var currentState = new Array(gridHeight);
    for (var y = 0; y < gridHeight; ++y) {
        currentState[y] = new Array(gridWidth);
        for (var x = 0; x < gridWidth; ++x) {
            currentState[y][x] = 0;
        }
    }

    canvas.width = width;
    canvas.height = height;
    var rect = canvas.getBoundingClientRect();
    //console.log("Canvas size: " + width + " by " + height + ", Grid size: " + gridWidth + " by " + gridHeight);
    context.lineWidth = lineWidth;

    var paused = true;
    var holdingMouse = false;
    var mousePos, setValue = 1;

    setInterval(function () {
        update(currentState, paused);
    }, updateInterval);
    setInterval(function () {
        draw(context, currentState, holdingMouse, mousePos, rect, setValue)
    }, updateInterval / 2);

    $("#grid").on("mousedown", function (event) {
        holdingMouse = true;
        mousePos = [event.clientX, event.clientY];
        var cellPos = getCellFromMousePos(mousePos, canvas.getBoundingClientRect());
        setValue = !currentState[cellPos[1]][cellPos[0]];
        //console.log("setValue: " + setValue);
    });

    $("#grid").on("mousemove", function (event) {
        mousePos = [event.clientX, event.clientY];
    });

    $("#grid").on("mouseup", function (event) {
        holdingMouse = false;
    });

    $(window).scroll(function (event) {
        rect = canvas.getBoundingClientRect();
    });

    $(window).resize(function (event) {
        rect = canvas.getBoundingClientRect();
    });

    var pauseButton = $("#pauseButton");

    function togglePaused() {
        paused = !paused;
        pauseButton.text((paused) ? "Play" : "Pause");
    }

    pauseButton.on("click", function (event) {
        togglePaused(paused);
});
}

start();
