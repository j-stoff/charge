/*

	Author: Jacob Stoffregen
	Date: 2/8/17

	Game implemenation
*/

/*
	Function to create units and place them at static starting positions.
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
