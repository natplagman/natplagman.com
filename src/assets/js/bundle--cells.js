/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./webpack/cells.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./webpack/cells.ts":
/*!**************************!*\
  !*** ./webpack/cells.ts ***!
  \**************************/
/*! exports provided: getNeighbors, State, Grid */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getNeighbors\", function() { return getNeighbors; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"State\", function() { return State; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Grid\", function() { return Grid; });\n/* harmony import */ var _conway__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./conway */ \"./webpack/conway.ts\");\n\r\nfunction getNeighbors(grid, ox, oy) {\r\n    // Get the positions of all adjacent tiles\r\n    var positions = [];\r\n    for (var y = -1; y <= 1; y++) {\r\n        for (var x = -1; x <= 1; x++) {\r\n            if (x == 0 && y == 0)\r\n                continue;\r\n            var px = (ox + x);\r\n            if (px < 0)\r\n                px += grid.width;\r\n            if (px >= grid.width)\r\n                px -= grid.width;\r\n            var py = (oy + y);\r\n            if (py < 0)\r\n                py += grid.height;\r\n            if (py >= grid.height)\r\n                py -= grid.height;\r\n            positions.push([px, py]);\r\n        }\r\n    }\r\n    // Return the tiles at the obtained positions\r\n    var neighbors = [];\r\n    for (var i = 0; i < positions.length; i++) {\r\n        var x = positions[i][0];\r\n        var y = positions[i][1];\r\n        neighbors.push(grid.cells[y][x]);\r\n    }\r\n    return neighbors;\r\n}\r\n;\r\nwindow.onload = function () {\r\n    var setupCanvas = function () {\r\n        var canvas = document.createElement(\"canvas\");\r\n        var pageWidth = document.body.clientWidth;\r\n        var pageHeight = document.body.clientHeight;\r\n        canvas.width = pageWidth * 2;\r\n        canvas.height = pageHeight * 2;\r\n        canvas.style.width = pageWidth + \"px\";\r\n        canvas.style.height = pageHeight + \"px\";\r\n        document.body.appendChild(canvas);\r\n        return canvas;\r\n    };\r\n    var canvas = setupCanvas();\r\n    // Grid constants\r\n    var tileSize = 20;\r\n    var gridWidth = Math.ceil(document.body.clientWidth * 2 / tileSize);\r\n    var gridHeight = Math.ceil(document.body.clientHeight * 2 / tileSize);\r\n    var grid = new Grid(gridWidth, gridHeight, _conway__WEBPACK_IMPORTED_MODULE_0__[\"NUMS\"]);\r\n    // Update\r\n    var tickTimer = 0;\r\n    function update() {\r\n        if (tickTimer == 0) {\r\n            // Calculate the next grid state\r\n            for (var y = 0; y < grid.height; y++) {\r\n                for (var x = 0; x < grid.width; x++) {\r\n                    Object(_conway__WEBPACK_IMPORTED_MODULE_0__[\"updateGrid\"])(grid, x, y);\r\n                }\r\n            }\r\n            // Update current state\r\n            for (var y = 0; y < grid.height; y++) {\r\n                for (var x = 0; x < grid.width; x++) {\r\n                    grid.cells[y][x].state = grid.cells[y][x].nextState;\r\n                }\r\n            }\r\n        }\r\n        tickTimer++;\r\n        if (tickTimer > 5)\r\n            tickTimer = 0;\r\n    }\r\n    ;\r\n    setInterval(update, 1000 / 60);\r\n    update();\r\n    var ctx = canvas.getContext(\"2d\");\r\n    function draw() {\r\n        window.requestAnimationFrame(draw);\r\n        if (ctx) {\r\n            // Clear the canvas\r\n            ctx.clearRect(0, 0, canvas.width, canvas.height);\r\n            ctx.fillStyle = \"#fff\";\r\n            // Draw the grid\r\n            for (var y = 0; y < grid.height; y++) {\r\n                for (var x = 0; x < grid.width; x++) {\r\n                    var cell = grid.cells[y][x];\r\n                    ctx.globalAlpha = _conway__WEBPACK_IMPORTED_MODULE_0__[\"OPACITIES\"][cell.state];\r\n                    ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);\r\n                }\r\n            }\r\n        }\r\n    }\r\n    ;\r\n    window.requestAnimationFrame(draw);\r\n};\r\nvar State = /** @class */ (function () {\r\n    function State(state, nextState) {\r\n        if (state === void 0) { state = 0; }\r\n        if (nextState === void 0) { nextState = 0; }\r\n        this.state = state;\r\n        this.nextState = nextState;\r\n    }\r\n    return State;\r\n}());\r\n\r\nvar Grid = /** @class */ (function () {\r\n    function Grid(width, height, nums) {\r\n        this.width = width;\r\n        this.height = height;\r\n        this.cells = [];\r\n        for (var y = 0; y < height; y++) {\r\n            var row = [];\r\n            for (var x = 0; x < width; x++) {\r\n                var randomNum = nums[Math.floor(Math.random() * nums.length)];\r\n                row.push(new State(randomNum, randomNum));\r\n            }\r\n            this.cells.push(row);\r\n        }\r\n    }\r\n    return Grid;\r\n}());\r\n\r\n\n\n//# sourceURL=webpack:///./webpack/cells.ts?");

/***/ }),

/***/ "./webpack/conway.ts":
/*!***************************!*\
  !*** ./webpack/conway.ts ***!
  \***************************/
/*! exports provided: NUMS, OPACITIES, updateGrid */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"NUMS\", function() { return NUMS; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"OPACITIES\", function() { return OPACITIES; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"updateGrid\", function() { return updateGrid; });\n/* harmony import */ var _cells__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cells */ \"./webpack/cells.ts\");\n\r\nvar NUMS = [0, 1];\r\nvar OPACITIES = [0.0, 0.3];\r\nfunction updateGrid(grid, x, y) {\r\n    var cell = grid.cells[y][x];\r\n    var neighbors = Object(_cells__WEBPACK_IMPORTED_MODULE_0__[\"getNeighbors\"])(grid, x, y);\r\n    var livingNeighbors = 0;\r\n    for (var i = 0; i < neighbors.length; i++) {\r\n        if (neighbors[i].state == 1)\r\n            livingNeighbors++;\r\n    }\r\n    // < 2 neighbors -> die\r\n    // > 3 neighbors -> die\r\n    // 3 neighbors -> live\r\n    if (cell.state == 1) {\r\n        if (livingNeighbors < 2)\r\n            cell.nextState = 0;\r\n        if (livingNeighbors > 3)\r\n            cell.nextState = 0;\r\n    }\r\n    else {\r\n        if (livingNeighbors == 3)\r\n            cell.nextState = 1;\r\n    }\r\n}\r\n;\r\n\n\n//# sourceURL=webpack:///./webpack/conway.ts?");

/***/ })

/******/ });