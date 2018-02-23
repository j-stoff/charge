/*
	Author: Jacob Stoffregen
	Date: 1/29/17

	Rules for the game and all logic therein
*/

// Another comment
// Third comment


//Global constants
const STANDARD_GRID_LENGTH = 10;
const STANDARD_GRID_WIDTH = 10;
const ZERO = 0;
const ONE = 1;


//Global Variables

var grid = [];


function createGrid(gridLength, gridWidth) {
	"use strict";
	var length;
	var width;
	var counter = 1;

	if (true)  {	//TODO Check if input is null or over bounds
		length = STANDARD_GRID_LENGTH
	}

	if (true) {		//TODO Check if input is null or over bounds
		width = STANDARD_GRID_WIDTH
	}

	for (var index = 1; index <= width; index += 1) {
		for(var insideIndex = 1; insideIndex <= length; insideIndex += 1) {
			grid[counter] = [index, insideIndex];

			counter += 1;
		}
	}

	return grid;
}


/*

	Check bounds of grid
*/
function checkBoundsOfGrid(position) {

	"use strict";
	xCoordinate = position[0];
	yCoordinate = position[1];


	if (xCoordinate > STANDARD_GRID_LENGTH || xCoordinate < ZERO) {
			return true;
	} else if (yCoordinate > STANDARD_GRID_WIDTH || yCoordinate < ZERO) {
			return true;
	}

	return false;
}


function checkMoveFromOriginalPosition(unitPosition, destinationPosition) {
	"use strict";
	if (unitPosition === destinationPosition) {
		return false;
	}

	return true;
}


//Takes in the index position from physical grid
//Returns an array of numbers to use for physical grid
function calculateRange(indexPosition, distance) {
	var position 			= indexPosition;	//Offset grid by one
	var rowLength 			= STANDARD_GRID_WIDTH;
	var moves  				= [];
	var counter 			= ONE;

	var moveUpSpaces		= 0;
	var moveDownSpaces		= 0;
	var moveLeftSpaces		= 0;
	var moveRightSpaces		= 0;

	var moveUpBoolean 		= false;
	var moveDownBoolean		= false;
	var moveRightBoolean	= false;
	var moveLeftBoolean		= false;

	var spotChecker;

	//Impossible moves, though likely will not occur
	if (position < 0 || position >= grid.length) {
		console.log("Calculation error");
		return 0;
	}


	//Check initial position of piece

	//Move up check
	if (position < 91 && position > 0) {
		moveUpBoolean = true;
	}

	//Move down check
	if (position > 10 && position < 101) {
		moveDownBoolean = true;
	}

	//Move right check
	if (position % 10 !== 0) {
		moveRightBoolean = true;
	}

	//Move left check
	if ((position - 1) % 10 !== 0) {
		moveLeftBoolean = true;
	}



	//Check for X and Y only
	while (counter <= distance) {

		if (moveUpBoolean) {
			spotChecker = position + (rowLength * counter);
			moves.push(spotChecker);

			moveUpSpaces = spotChecker;
		}


		if (moveDownBoolean) {
			spotChecker = position - (rowLength * counter);
			moves.push(spotChecker);

			moveDownSpaces = spotChecker;
		}

		if (moveRightBoolean) {
			spotChecker = position + (ONE * counter);
			moves.push(spotChecker);

			moveRightSpaces = spotChecker;
		}

		if (moveLeftBoolean) {
			spotChecker = position - (ONE * counter);
			moves.push(spotChecker);

			moveLeftSpaces = spotChecker;
		}

		if (moveUpBoolean && moveRightBoolean) {
			spotChecker = position + ((rowLength * counter) + (ONE * counter));
			moves.push(spotChecker);
		}

		if (moveDownBoolean && moveRightBoolean) {
			spotChecker = position + ((ONE * counter) - (rowLength * counter));
			moves.push(spotChecker);
		}

		if (moveUpBoolean && moveLeftBoolean) {
			spotChecker = position + ((rowLength * counter) - (ONE * counter));
			moves.push(spotChecker);
		}

		if (moveDownBoolean && moveLeftBoolean) {
			spotChecker = position - ((rowLength * counter) + (ONE * counter));
			moves.push(spotChecker);
		}

		if (moveUpSpaces > 90) {
			moveUpBoolean = false;
		}


		if (moveDownSpaces <= 10) {
			moveDownBoolean = false;
		}



		if (moveRightSpaces % 10 === 0) {
			moveRightBoolean = false;
		}


		if ((moveLeftSpaces - ONE) % 10 === 0) {
			moveLeftBoolean = false;
		}


		counter += ONE;
	}


	return moves;


}