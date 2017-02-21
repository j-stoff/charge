/*
	Author: Jacob Stoffregen
	Date: 1/29/17

	Rules for the game and all logic therein
*/


//Global constants
const STANDARD_GRID_LENGTH = 10;
const STANDARD_GRID_WIDTH = 10;
const ZERO = 0;


//Global Variables

var grid = [];


function createGrid(gridLength, gridWidth) {
	var length;
	var width;
	var counter = 0;

	if (true)  {	//TODO Check if input is null or over bounds
		length = STANDARD_GRID_LENGTH
	}

	if (true) {		//TODO Check if input is null or over bounds
		width = STANDARD_GRID_WIDTH
	}

	for (var index = 0; index < width; index += 1) {
		for(var insideIndex = 0; insideIndex < length; insideIndex += 1) {
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
	if (unitPosition === destinationPosition) {
		return false;
	}

	return true;
}