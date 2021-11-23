let sq_size = 15;
let cBoard;
let nBoard;
let rows;
let columns;
let start_frequency = 10;

function setup() {
	frameRate(5);
	var width = screen.width;
	var height = screen.height;
	createCanvas(width, height);
	rows = Math.ceil(width / sq_size);
	columns = Math.ceil(height / sq_size);
	console.log(rows + " rows, width is: " + width);
	console.log(columns + " columns, height is: " + height);

	nBoard = new Array(rows);
	cBoard = new Array(rows);
	for (var i = 0; i < cBoard.length; i++) {
		cBoard[i] = new Array(columns);
		nBoard[i] = new Array(columns);
	}
	draw();
}

//no clue whats happening here, looks like this is a special function in p5 js which gets called constantly
function draw() {
	//sets up initial Values
	if (cBoard[1][1] == null) {
		console.log(cBoard[1][1] + " stat");
		start();
	} else {
		modify();
	}
}

function start() {
	for (var n = 0; n < cBoard.length; n++) {
		for (var m = 0; m < cBoard[n].length; m++) {
			// Draw a square at location (30, 20) with a side size of 55.
			//square(30, 20, 55);
			xPos = n * sq_size;
			yPos = m * sq_size;
			square(xPos, yPos, sq_size);

			randomNumber = Math.floor(Math.random() * start_frequency);
			cBoard[n][m] = randomNumber;
			console.log(randomNumber);
			if (cBoard[n][m] == 0) {
				fill(51);
			} else {
				fill(255);
			}
		}
	}
}

function re_draw() {
	for (var n = 0; n < cBoard.length; n++) {
		for (var m = 0; m < cBoard[n].length; m++) {
			// Draw a square at location (30, 20) with a side size of 55.
			//square(30, 20, 55);
			xPos = n * sq_size;
			yPos = m * sq_size;
			square(xPos, yPos, sq_size);

			if (cBoard[n][m] == 0) {
				fill(51);
			} else {
				fill(255);
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
	console.log("recalculate");
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

//0 means alive

//first need to get neighbour cells
