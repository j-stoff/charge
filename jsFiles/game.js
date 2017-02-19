/*

	Author: Jacob Stoffregen
	Date: 2/8/17

	Game implemenation
*/

/*
	This function initilizes the unit objects and returns them to be used elsewhere.
*/
function createInitialUnitPositionsBlue() {

	var unitArray = [];
	var testUnit = new dummyUnit("blue", [9,0])

	unitArray.push(testUnit);

	return unitArray;
}


/*
	Function to create units and place them at static starting positions.
	This is for the red team.
*/

function createInitialUnitPositionsRed() {

	var unitArray = [];
	var testUnit = new dummyUnit("red", [0,0]);
	/*
	testUnit.setVisualDisplay(null) {


	}
	*/
	unitArray.push(testUnit);

	return unitArray;
}


/*
	Function used for game initialization and setup
*/

function gameSetUp() {

	initializeDisplay();

	//need a method to create visuals for units

}



function startGame() {
	gameSetUp();

}
