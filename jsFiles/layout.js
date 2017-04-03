/*

	Author: Jacob Stoffregen
	Date: 1/29/17

	Layout for grid and physical rendering
*/

var canvas;
var engine;
var scene;
var camera;
var light;
var number;
var physicalGrid;
var unitsOnMap;
var gridMap;
var physicalGrid
//var unitsOnMap;


/*
	For retreiving the engine variable. Unsure if this is useful.
	@return engine running the application.
*/
function getEngine() {

	return engine;
}


/*
	A get function for canvas.
	@return canvas used by the game.
*/
function getCanvas() {

	return canvas;
}

/*
	A get function for scene.
	@return current scene.
*/
function getScene() {

	return scene;
}

function getUnitsOnMap(){
	"use strict";
	return unitsOnMap;
}


function getGridMap() {
	"use strict";
	return gridMap;
}

function renderScene() {
	"use strict";
	var renderLoop = function() {
		scene.render();

	}

	engine.runRenderLoop(renderLoop);

}

/*Function to make all of the boxes selectable in order to move

@param box is the box which have an action associated with it
@param boolean, is this code to be executed or not
@param animation string with value of move, attack, or special
*/
/*
function loadBoxAction(box, boolean, animation, unit) {

	boxPosition = [];
	boxPosition.push(box.position.x);
	boxPosition.push(box.position.y);


	if (animation === "move") {
		box.actionManager.registerAction(
			new BABYLON.ExecuteCodeAction(
				BABYLON.ActionManager.OnPickTrigger,
				function(unit, boxPosition){animationMove(unit, boxPosition);};
				boolean)
			);

	}

	if (animation === "attack") {
		//stuff for attack
	}

	if (animation === "special") {
		//Special for the unit
	}



}
*/

function colorChanger(coordinates) {
	"use strict";
	var color;
	var xCoordinate = coordinates[0];
	var yCoordinate = coordinates[1];

	if ( (xCoordinate % 2) === (yCoordinate % 2) ) {
		color = new BABYLON.Color3(0, 0, 0);
	} else {
		color = new BABYLON.Color3(255, 255, 255);
	}

	return color;
}

function colorPicker(coordinates) {
	"use strict";
	var color;
	var xCoordinate = coordinates[0];
	var yCoordinate = coordinates[1];

	if ( (xCoordinate % 2) === (yCoordinate % 2) ) {
		color = BABYLON.Color3.White();
	} else {
		color =  BABYLON.Color3.Black();
	}

	return color;
}

function createPhysicalGrid() {
	"use strict";
	//canvas = document.getElementById("canvas");
	//engine = new BABYLON.Engine(canvas);
	//scene = new BABYLON.Scene(engine);

	//camera = new BABYLON.ArcRotateCamera("Camera", 3 * Math.PI / 2, Math.PI / 8, 20, BABYLON.Vector3(5, 5, 5), scene);
	//camera = new BABYLON.FreeCamera("Camera", new BABYLON.Vector3(4.5, 4.5, -12), scene);
	//camera.attachControl(canvas, true);

	//light = new BABYLON.HemisphericLight("hemi", new BABYLON.Vector3(0, 1, 0), scene);
	var boxName;
	var coordinates;
	var box;
	var mat;
	var materialName;

	physicalGrid = createGrid(1, 1);	//Will need to pass in params later

	gridMap = new Map();

	for (var counter = 1; counter < physicalGrid.length; counter++) {
		coordinates = physicalGrid[counter];
		boxName = "box_" + counter;
		materialName = "mat_" + counter;

		box = BABYLON.Mesh.CreateBox(boxName, 1, scene);
		box.position = new BABYLON.Vector3(coordinates[1], coordinates[0], 2);
		mat = new BABYLON.StandardMaterial(materialName, scene);
		
		//mat.emissiveColor = new BABYLON.Color3(Math.random(), Math.random(), Math.random());

		
		mat.emissiveColor = colorChanger(coordinates);
		
		box.material = mat;
		physicalGrid[counter] = box;

		gridMap.set(box.position, box);
	}

}


function makePhysicalBodyBlue () {
	"use strict";

	//scene = new BABYLON.Scene(engine);

	var unitList = createInitialUnitPositionsBlue();
	var unit = unitList[0];
	//var position = unit.position;

	var body = BABYLON.Mesh.CreateSphere("body", 0.5, 1, scene);

	body.position = unit.position;

	var mat = new BABYLON.StandardMaterial("mat", scene);

	mat.diffuseColor = new BABYLON.Color3(0,0, 255);

	body.material = mat;

	unit.setVisualDisplay(body);

	renderScene();

	unitsOnMap.push(unit);
}



function makePhysicalBodyRed () {

	"use strict";
	//scene = new BABYLON.Scene(engine);

	var unitList = createInitialUnitPositionsRed();
	var unit = unitList[0];
	//var position = unit.position;


	var body = BABYLON.Mesh.CreateSphere("body", 0.5, 1, scene);

	body.position = new BABYLON.Vector3(0, 0, 1.5);
	var mat = new BABYLON.StandardMaterial("mat", scene);

	mat.diffuseColor = new BABYLON.Color3(255, 0, 0);

	body.material = mat;

	unit.setVisualDisplay(body);

	renderScene();


	unitsOnMap.push(unit);
}


//Stub function
function animationSpecial() {


}

//Stub function
function animationAttack() {


}



//Moves target unit to destination
function animationMove(unit, destination){
	//var moveCheckPassed = false;


   	"use strict";
    var xMoveTest = checkMoveFromOriginalPosition(unit.position[0], destination.x);
    var yMoveTest = checkMoveFromOriginalPosition(unit.position[1], destination.y);
    var origin = unit.position;
    var moveName = unit.name + "_turn_" + ""; 		//Add turn number to this string

    var body = unit.visualDisplay;
    var finalPosition;
    var zPosition = 1.5;
	
	var keys = [];


	//moveCheckPassed = unit.moveUnitCheck(destination);

	//change to moveCheckPassed later
	if (xMoveTest) {
		var animationSpehere = new BABYLON.Animation(moveName, "position.x", 5000, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
		 var xCoordinate = destination.x;

		keys.push({
			frame: 0,
			value: unit.position.x
		});

		keys.push({
			frame: 5,
			value: xCoordinate
		});

		animationSpehere.setKeys(keys);

		body.animations.push(animationSpehere);

		scene.beginAnimation(body, 0, 5);

	}

	if (yMoveTest) {
		var animationSpehere = new BABYLON.Animation(moveName, "position.y", 5000, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);

		var yCoordinate = destination.y;


		keys.push({
			frame: 0,
			value: unit.position.y
		});

		keys.push({
			frame: 5,
			value: yCoordinate
		});


		animationSpehere.setKeys(keys);

		body.animations.push(animationSpehere);

		scene.beginAnimation(body, 0, 5);

	}


	if (xMoveTest || yMoveTest) {

		finalPosition = new BABYLON.Vector3( destination.x, destination.y, zPosition);

		unit.position = finalPosition;
	}


}




//Will transform the colors of the boxes back to their original color
//TODO -- NOT DONE
function toBoxOriginalColor(boxes) {
	var boxCoordinates = [];
	var index;
	var colorMaterial = new BABYLON.StandardMaterial("colorMaterial", scene);

	
	for (index = 0; index < boxes.length; index += 1) {
		boxCoordinates.push(boxes[index].position.x);
		boxCoordinates.push(boxes[index].position.y);

		colorMaterial.emissiveColor = colorPicker(boxCoordinates);
		boxes[index].material = colorMaterial;
		console.log(boxes[index].material.emissiveColor + boxes[index].position);
		boxCoordinates = [];

	}
	

}

//Function to create a map based on an array of Box mesh Objects
//@param lsitOfBoxes is an array of box mesh Objects
function generateBoxesMap(listOfBoxes) {
	var map = new Map();
	var index;


	for (index = 0; index < listOfBoxes.length; index += 1) {
		map.set(listOfBoxes[index], listOfBoxes[index].material);
	}


	console.log(map);
	console.log(map.get(listOfBoxes[index - 1]).name);

	return map;
}


//helper function
// A function to create an array by looping through the parameter array
//@param arrayOfIndexPositions is an array filled with the box number based on the physical grid
function getBoxesFromIndexPosition(arrayOfIndexPositions) {
	var arrayWithBoxes = [];
	var index;

	for(index = 0; index < arrayOfIndexPositions.length; index += 1) {
		arrayWithBoxes.push(physicalGrid[arrayOfIndexPositions[index]]);
	}

	return arrayWithBoxes;
}



//Function that will take a list of boxes, loop through the list and for each box
// it adds an action. This function is for the move command and will execute animation move.
function makeBoxesActionMove(singleBox, unit, boxNumberOrigin){
	var index;
	var localXPos;
	var localYPos;
	var listOfBoxObjects;
	var	boxPositionsAroundOrigin;

	boxPositionsAroundOrigin = getBoxesByPosition(boxNumberOrigin, unit.moveSpaces);

	listOfBoxObjects = getBoxesFromIndexPosition(boxPositionsAroundOrigin);

	singleBox.actionManager.registerAction(
			new BABYLON.ExecuteCodeAction(
				BABYLON.ActionManager.OnPickTrigger,
				function(){animationMove(unit, singleBox.position);

					toBoxOriginalColor(listOfBoxObjects);

					var index;
					for (index = 0; index < listOfBoxObjects.length; index += 1) {
						zeroObject(listOfBoxObjects[index]);
					}

				zeroObject(singleBox);


				}
				)

		);


}



function highlightAvailablePositions(box, color) {
	var index;
	var material = new BABYLON.StandardMaterial("material", scene);
	material.emissiveColor = color;

	box.material = material;

}

//With the correct Vector3 position, will find boxes around the given box
function getBoxesByPosition(positionOnBoard, unitRange) {
	//Loop through physicalGrid to find boxes that match these positions
	//return an array of boxes within the range of the unit
	var listOfBoxesByNumber;

	listOfBoxesByNumber = calculateRange(positionOnBoard, unitRange);

	if (listOfBoxesByNumber === 0) {
		return 0;
	}

	return listOfBoxesByNumber;
}



//Creates selectable boxes around the selected unit, movable only
function createMovableSpace(unit) {
	//Calculate unit move range here
	//Unit.position + range
	//Pass all possible locations into the getBoxesByPosition function
	var unitPositionOnGrid = new BABYLON.Vector3(unit.position.x, unit.position.y, 2);

	var unitRange = unit.moveSpaces; 
	var movableGridPositions;
	var boxColorsMap = new Map();
	var arrayOfBoxes = [];
	var arrayOfColors = [];
	var index;
	var moveColor = new BABYLON.Color3.Green();
	var unitSelected = true;
	var boxCoordinates = [];
	var colorMaterial = new BABYLON.StandardMaterial("colorMaterial", scene);
	//var gridLocation = findGridLocation(unitPositionOnGrid);

	for (var boxOnBoard = 1; boxOnBoard < physicalGrid.length; boxOnBoard++) {
		if (unitPositionOnGrid.equals(physicalGrid[boxOnBoard].position)) {
			break;
		}
	}



	movableGridPositions = getBoxesByPosition(boxOnBoard, unitRange);


	if (movableGridPositions === 0) {
		console.log("No moves possible");
		return;
	}


	arrayOfBoxes = getBoxesFromIndexPosition(movableGridPositions);

	boxColorsMap = generateBoxesMap(arrayOfBoxes);



	//Get box at specific position
	//Add box and material to map
	/*
	for (index = 0; index < movableGridPositions.length; index += 1) {
		arrayOfBoxes.push(physicalGrid[movableGridPositions[index]]);
		arrayOfColors.push(arrayOfBoxes[index]);
		boxColorsMap.set(arrayOfBoxes[index].material, movableGridPositions[index]);
	}
	*/
	
	//TODO
	//Double check possible locations, verify that it is possible to move there

	//If the unit was previously selected and clicked again, change the squares back
	if (unit.isCurrentlySelected) {
		//Change squares

		//toBoxOriginalColor(arrayOfBoxes);
		/*
		for (index = 0; index < arrayOfBoxes.length; index += 1) {
			zeroObject(arrayOfBoxes[index]);
		}
		*/
		/*
		for (index = 0; index < arrayOfBoxes.length; index += 1) {
			console.log(arrayOfBoxes[index].material.diffuseColor + arrayOfBoxes[index].position);
		}
		*/
		unit.setIsCurrentlySelected(false);
		return;
	}

	//Change unit to selected
	if (!unit.isCurrentlySelected) {
		unit.setIsCurrentlySelected(true);
	}


	for (index = 0; index < arrayOfBoxes.length; index += 1){
		highlightAvailablePositions(arrayOfBoxes[index], moveColor);
		makeBoxesActionMove(arrayOfBoxes[index], unit, boxOnBoard);

	}




	//Create clickable boxes based on those that changed color
	/*
	for (index = 0; index < arrayOfBoxes.length; index += 1) {
		loadBoxAction(arrayOfBoxes[index], true, animationMove, unit);
	}
	*/



	//Set unit to -1 actions


}




var selectUnit = function (unit) {


	var mesh = unit.visualDisplay;
	/*
	mesh.actionManager = new BABYLON.ActionManager(scene);
	mesh.actionManager.registerAction( 
		new BABYLON.InterpolateValueAction(
			BABYLON.ActionManager.OnRightPickTrigger, 	
			mesh,										
			"position",
			position

		)

	);
	*/
	//unit.setActions(0);

	//Change the color of selected unit back to original
	mesh.actionManager.registerAction(
		new BABYLON.SetValueAction(
			BABYLON.ActionManager.OnPointerOutTrigger,
			mesh.material,
			"emissiveColor",
			mesh.material.emissiveColor)
		);


	//Hover over unit changes color to white
	mesh.actionManager.registerAction(
		new BABYLON.SetValueAction(
			BABYLON.ActionManager.OnPointerOverTrigger,
			mesh.material,
			"emissiveColor",
			BABYLON.Color3.White()
			)
		);


	if (unit.hasActions()) {
		
		//ExecuteCodeAction(trigger, func, condition)
		mesh.actionManager.registerAction(
			new BABYLON.ExecuteCodeAction(
				BABYLON.ActionManager.OnPickTrigger,
				function(){createMovableSpace(unit);}
				)


		);

	}


}


/*
	Function is responsible for creating a panel.
	The panel is created in the gui portion of the code.
*/
function createActionPanel(unit) {

	console.log("Loading panel");



	makeGUISystem();



	createPanel(null, unit);

}



function loadActionManager(unit) {
	var mesh = unit.visualDisplay;

	mesh.actionManager = new BABYLON.ActionManager(scene);


	//Check if player is either 'red' or 'blue'
	//Create one panel if red create other if blue
	if (false) {

	}
	//Will need to make a generic click function to bring up panel
	//Left click creates the panel, cancel button on panel brings it down

	mesh.actionManager.registerAction(
		new BABYLON.ExecuteCodeAction(
			BABYLON.ActionManager.OnLeftPickTrigger,
			function(){createActionPanel(unit);}
		)
	);
}

//Reset actions to do nothing
function zeroObject(mesh) {
	//Action manager must be created?
	//Recreate action mamanger to reset????
	mesh.actionManager = new BABYLON.ActionManager(scene);

	mesh.actionManager.registerAction(
		new BABYLON.DoNothingAction(
			BABYLON.ActionManager.OnPickTrigger
			)
	
	);

}



function selectBoxOnBoard(box){

	zeroObject(box);

	//Move
	/*
	box.actionManager.registerAction(
		new BABYLON.ExecuteCodeAction(
			BABYLON.ActionManager.OnPickTrigger,
			function(){animationMove(unit, box.position);},
			false
			)

		);
	*/
}
/*
	//Move

	box.actionManager.registerAction(
		new BABYLON.ExecuteCodeAction(
			BABYLON.ActionManager.OnPickTrigger,
			function(){animationMove(unit, box.position);},
			false
			)

		);


	//Attack action
	box.actionManager.registerAction(
		new BABYLON.ExecuteCodeAction(
			BABYLON.ActionManager.OnPickTrigger,
			function(){animationAttack();},
			false

		);


	//Special Action
	box.actionManager.registerAction(
		new BABYLON.ExecuteCodeAction(
			BABYLON.ActionManager.OnPickTrigger,
			function(){animationSpecial();},
			false
			)

		);


*/
function initializeDisplay() {

	"use strict";
	canvas = document.getElementById("canvas");
	engine = new BABYLON.Engine(canvas);
	scene = new BABYLON.Scene(engine);
	scene.actionManager = new BABYLON.ActionManager(scene);
	var counter = 0;
	var mockLocation = new BABYLON.Vector3(4,4, 3);
	var diffLocation = new BABYLON.Vector3(10, 10, 1.5);

	//camera = new BABYLON.ArcRotateCamera("Camera", 3 * Math.PI / 2, Math.PI / 8, 20, BABYLON.Vector3(5, 5, 5), scene);
	camera = new BABYLON.FreeCamera("Camera", new BABYLON.Vector3(5.5, 5.5, -12), scene);
	//camera.attachControl(canvas, true);

	light = new BABYLON.HemisphericLight("hemi", new BABYLON.Vector3(0, 1, 0), scene);

	unitsOnMap = [];

	createPhysicalGrid();

	var unitsOnBoard = getUnitsOnBoard();

	makePhysicalBodyRed();
	makePhysicalBodyBlue();

	
	for (counter = 1; counter < physicalGrid.length; counter += 1) {
		selectBoxOnBoard(physicalGrid[counter]);
	}
	
	
	for (counter = 0; counter < unitsOnMap.length; counter++) {
		loadActionManager(unitsOnBoard[counter]);
	}

	//selectUnit(unitsOnBoard[1]);
	//selectUnit(unitsOnBoard[0]);
	
	animationMove(unitsOnMap[0],mockLocation);
	//animationMove(unitsOnMap[0], [4,4]);

	//animationMove(unitsOnMap[1], diffLocation);

	renderScene();

}


