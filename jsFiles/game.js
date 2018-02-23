/*

	Author: Jacob Stoffregen
	Date: 2/8/17

	Game implemenation
	
	Adding a comment
*/

var unitsOnBoard = [];
var players = [];





/*
	This function simply logs to the console that a function call was successful
*/
var testFunction = function testFunction() {
	console.log("TEST FUNCTION SUCCESSFUL");
}

/*
	Get function to return an array of the units currently on the board.
*/
function getUnitsOnBoard() {

	return unitsOnBoard;
}


function makeUnit(team, position, number) {
	var unitName = team + "_" + number;

	var unit = new primeUnit(team, position, unitName);

	unitsOnBoard.push(unit);

	return unit;
}

/*
	This function initilizes the unit objects and returns them to be used elsewhere.
*/
function createInitialUnitPositionsBlue() {
	"use strict";
	var position = new BABYLON.Vector3(10, 1, 1.5);
	var unitArray = [];
	var unitName = "BlueSphere1";
	var testUnitBlue = new primeUnit("blue", position, unitName)
	var index;
	var unitCatch;

	unitArray.push(testUnitBlue);
	unitsOnBoard.push(testUnitBlue);

	for (index = 2; index <= 10; index += 1) {
		position = new BABYLON.Vector3(10, index, 1.5);
		unitCatch = makeUnit("blue", position, index);
		unitArray.push(unitCatch);
	}

	return unitArray;
}


/*
	Function to create units and place them at static starting positions.
	This is for the red team.
*/

function createInitialUnitPositionsRed() {
	"use strict";
	var position = new BABYLON.Vector3(1, 1, 1.5);
	var unitArray = [];
	var unitName = "RedSphere1";
	var testUnitRed = new primeUnit("red", position, unitName);
	var index;
	var unitCatch;
	/*
	testUnit.setVisualDisplay(null) {


	}
	*/

	unitArray.push(testUnitRed);
	unitsOnBoard.push(testUnitRed);
	
	for (index = 2; index <= 10; index += 1) {
		position = new BABYLON.Vector3(1, index, 1.5);
		unitCatch = makeUnit("red", position, index);
		unitArray.push(unitCatch);
	}
	


	return unitArray;
}


/*
	Function used for game initialization and setup
*/

function gameSetUp() {
	"use strict";
	var canvas;
	var player1Name = document.getElementById("player1Name").value;
	var player2Name = document.getElementById("player2Name").value;

	var player1 = new Player(player1Name, "red");
	var player2 = new Player(player2Name, "blue");

	var panel1;
	var panel2;


	initializeDisplay();

	canvas = getCanvas();

	console.log("Canvas width: " + canvas.width);
	console.log("Canvas height: " + canvas.height);

	panel1 = playerNamePanel(player1, (canvas.width * 0.02), (canvas.height * 0.88));
	panel2 = playerNamePanel(player2, (canvas.width * 0.82), (canvas.height * 0.88));

	//need a method to create visuals for units

}



function startGame() {
	"use strict";
	gameSetUp();

}
