let sq_size = 6;
let cBoard;
let nBoard;
let rows;
let columns;
let start_frequency = 10;
let color1 = 54;
let color2 = 244;
let rate = 5;
let width;
let height;
let pressedStart = true;

function setup() {
	if (document.readyState === "complete") {
		var canvasContainer = document.getElementById("canvasContainer");
		var height = canvasContainer.offsetHeight;
		var width = canvasContainer.offsetWidth;
		console.log(width);
	}

	frameRate(rate);
	var canvas = document.getElementById("canvasContainer");
	newWidth = canvas.style.width;
	newHeight = canvas.style.height;
	createCanvas(width, height);
	rows = Math.ceil(width / sq_size);
	columns = Math.ceil(height / sq_size);

	nBoard = new Array(rows);
	cBoard = new Array(rows);
	for (var i = 0; i < cBoard.length; i++) {
		cBoard[i] = new Array(columns);
		nBoard[i] = new Array(columns);
	}
	noLoop();
}

function draw() {
	//sets up initial Values
	if (cBoard[1][1] == null) {
		start();
	} else {
		modify();
	}
}

function start() {
	for (var n = 0; n < cBoard.length; n++) {
		for (var m = 0; m < cBoard[n].length; m++) {
			randomNumber = Math.floor(Math.random() * start_frequency);
			cBoard[n][m] = randomNumber;
		}
	}
	re_draw();
}

function re_draw() {
	//cba takin care about the border apporpiatly, so i jsut dont draw the border
	for (var n = 2; n < cBoard.length - 2; n++) {
		for (var m = 2; m < cBoard[n].length - 2; m++) {
			// Draw a square at location (30, 20) with a side size of 55.
			//square(30, 20, 55);
			xPos = n * sq_size;
			yPos = m * sq_size;
			square(xPos, yPos, sq_size);

			if (cBoard[n][m] == 0) {
				fill(color1);
			} else {
				fill(color2);
			}
		}
	}
}

function copyBoards(oldBoard) {
	newBoard = new Array(rows);
	for (var i = 0; i < cBoard.length; i++) {
		newBoard[i] = new Array(columns);
	}
	for (var n = 0; n < oldBoard.length; n++) {
		for (var m = 0; m < oldBoard[n].length; m++) {
			newBoard[n][m] = oldBoard[n][m];
		}
	}
	return newBoard;
}

function modify() {
	nBoard = copyBoards(cBoard);
	var aliveNeighbourCounter;

	for (var n = 1; n < cBoard.length - 1; n++) {
		for (var m = 1; m < cBoard[n].length - 1; m++) {
			aliveNeighbourCounter = 0;

			topLeft = nBoard[n - 1][m - 1];
			if (topLeft == 0) {
				aliveNeighbourCounter += 1;
			}
			topMid = nBoard[n - 1][m];
			if (topMid == 0) {
				aliveNeighbourCounter += 1;
			}
			topRight = nBoard[n - 1][m + 1];
			if (topRight == 0) {
				aliveNeighbourCounter += 1;
			}

			midLeft = nBoard[n][m - 1];
			if (midLeft == 0) {
				aliveNeighbourCounter += 1;
			}
			midRight = nBoard[n][m + 1];
			if (midRight == 0) {
				aliveNeighbourCounter += 1;
			}

			bottomLeft = nBoard[n + 1][m - 1];
			if (bottomLeft == 0) {
				aliveNeighbourCounter += 1;
			}
			bottomMid = nBoard[n + 1][m];
			if (bottomMid == 0) {
				aliveNeighbourCounter += 1;
			}
			bottomRight = nBoard[n + 1][m + 1];
			if (bottomRight == 0) {
				aliveNeighbourCounter += 1;
			}
			//GameConditions
			if (nBoard[n][m] != 0 && aliveNeighbourCounter == 3) {
				cBoard[n][m] = 0;
			} else if (nBoard[n][m] != 0 && aliveNeighbourCounter != 3) {
				cBoard[n][m] = 1;
			}
			if (
				(nBoard[n][m] == 0 && aliveNeighbourCounter < 2) ||
				(nBoard[n][m] == 0 && aliveNeighbourCounter > 3)
			) {
				cBoard[n][m] = 1;
			} else if (
				(nBoard[n][m] == 0 && aliveNeighbourCounter == 2) ||
				(nBoard[n][m] == 0 && aliveNeighbourCounter == 3)
			) {
				cBoard[n][m] = 0;
			}
		}
	}
	re_draw();
}

document.getElementById("playButton").onclick = function () {
	loop();
};

document.getElementById("stopButton").onclick = function () {
	noLoop();
};

document.getElementById("singleStepButton").onclick = function () {
	noLoop();
	redraw();
};

document.getElementById("slowButton").onclick = function () {
	noLoop();
	rate -= 1;
	frameRate(rate);
	loop();
};

document.getElementById("fasterButton").onclick = function () {
	noLoop();
	rate += 1;
	frameRate(rate);
	loop();
};

document.getElementById("refillButton").onclick = function () {
	start();
};
