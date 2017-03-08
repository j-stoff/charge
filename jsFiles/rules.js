/*
	Author: Jacob Stoffregen
	Date: 1/29/17

	Rules for the game and all logic therein
*/


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
	var counter = 0;

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
	var position = indexPosition + 1;
	var rowLength = STANDARD_GRID_WIDTH;
	var moves;
	var xMove;
	var yMove;
	var xCounter;
	var yCounter;
	var spotChecker;

	console.log(position);

	//Impossible moves, though likely will not occur
	if (position < 0 || position >= grid.length) {
		console.log("Calculation error");
		return;
	}

	//
	xCounter = 0;
	while (true) {
		spotChecker = position +
		if (true) {
			break;
		}

	}




}