/*

	Author: Jacob Stoffregen
	Date: 2/8/17

	Game implemenation
*/

/*
	This function initilizes the unit objects and returns them to be used elsewhere.
*/
function createInitialUnitPositionsBlue() {
	"use strict";
	var position = new BABYLON.Vector3(10, 1, 1.5);
	var unitArray = [];
	var testUnitBlue = new dummyUnit("blue", position)

	unitArray.push(testUnitBlue);

	return unitArray;
}


/*
	Function to create units and place them at static starting positions.
	This is for the red team.
*/

function createInitialUnitPositionsRed() {
	"use strict";
	var unitArray = [];
	var testUnitRed = new dummyUnit("red", [0,0]);
	/*
	testUnit.setVisualDisplay(null) {


	}
	*/
	unitArray.push(testUnitRed);

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
