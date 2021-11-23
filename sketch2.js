let sq_size = 15;
let cBoard;
let nBoard;
let rows;
let columns;

function setup() {
	var width = screen.width;
	var height = screen.height;
	createCanvas(width, height);
	rows = Math.ceil(width / sq_size);
	columns = Math.ceil(height / sq_size);
	console.log(rows + " rows, width is: " + width);
	console.log(columns + " columns, height is: " + height);

	cBoard = new Array(rows);
	for (var i = 0; i < cBoard.length; i++) {
		cBoard[i] = new Array(columns);
	}
}

function draw() {
	start();
}

function start() {
	for (var n = 0; n < cBoard.length; n++) {
		for (var j = 0; j < cBoard[n].length; j++) {
			// Draw a square at location (30, 20) with a side size of 55.
			//square(30, 20, 55);
			xPos = n * sq_size;
			yPos = j * sq_size;
			square(xPos, yPos, sq_size);

			randomNumber = Math.floor(Math.random() * 2);
			cBoard[n][j] = randomNumber;
			console.log(randomNumber);
			if (cBoard[n][j] == 0) {
				fill(51);
			} else fill(255);
		}
	}
}
