/*

	Author: Jacob Stoffregen
	Date: 2/8/17

	Game implemenation
*/

var unitsOnBoard = [];



/*
	Get function to return an array of the units currently on the board.
*/
function getUnitsOnBoard() {

	return unitsOnBoard;
}



/*
	This function initilizes the unit objects and returns them to be used elsewhere.
*/
function createInitialUnitPositionsBlue() {
	"use strict";
	var position = new BABYLON.Vector3(10, 1, 1.5);
	var unitArray = [];
	var testUnitBlue = new primeUnit("blue", position)

	unitArray.push(testUnitBlue);
	unitsOnBoard.push(testUnitBlue);

	return unitArray;
}


/*
	Function to create units and place them at static starting positions.
	This is for the red team.
*/

function createInitialUnitPositionsRed() {
	"use strict";
	var unitArray = [];
	var testUnitRed = new primeUnit("red", [0,0]);
	/*
	testUnit.setVisualDisplay(null) {


	}
	*/
	unitArray.push(testUnitRed);
	unitsOnBoard.push(testUnitRed);

	return unitArray;
}


/*
	Function used for game initialization and setup
*/

function gameSetUp() {
	"use strict";
	initializeDisplay();

	//need a method to create visuals for units

}



function startGame() {
	"use strict";
	gameSetUp();

}
