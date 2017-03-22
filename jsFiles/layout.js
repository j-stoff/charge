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
	
	physicalGrid = createGrid(1, 1);	//Will need to pass in params later

	gridMap = new Map();

	for (var counter = 1; counter < physicalGrid.length; counter++) {
		var coordinates = physicalGrid[counter];


		var box = BABYLON.Mesh.CreateBox("box", 1, scene);
		box.position = new BABYLON.Vector3(coordinates[1], coordinates[0], 2);
		var mat = new BABYLON.StandardMaterial("mat", scene);
		
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



function animationMove(unit, destination){
	//var moveCheckPassed = false;

   	"use strict";
    var xMoveTest = checkMoveFromOriginalPosition(unit.position[0], destination[0]);
    var yMoveTest = checkMoveFromOriginalPosition(unit.position[1], destination[1]);

    var body = unit.visualDisplay;
    var finalPosition;
    var zPosition = 1.5;
	
	var keys = [];

	//moveCheckPassed = unit.moveUnitCheck(destination);

	//change to moveCheckPassed later
	if (xMoveTest) {
		var animationSpehere = new BABYLON.Animation("test_move", "position.x", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
		 var xCoordinate = destination[0];

		keys.push({
			frame: 0,
			value: 0
		});

		keys.push({
			frame: 60,
			value: 4
		});

		animationSpehere.setKeys(keys);

		body.animations.push(animationSpehere);

		scene.beginAnimation(body, 0, 60);

	}

	if (yMoveTest) {
		var animationSpehere = new BABYLON.Animation("test_move", "position.y", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);

		var yCoordinate = destination[1];


		keys.push({
			frame: 0,
			value: 0
		});

		keys.push({
			frame: 60,
			value: 4
		});


		animationSpehere.setKeys(keys);

		body.animations.push(animationSpehere);

		scene.beginAnimation(body, 0, 60);

	}


	if (xMoveTest || yMoveTest) {

		finalPosition = new BABYLON.Vector3( destination[0], destination[1], zPosition);

		unit.position = finalPosition;
	}


}

//Panel for actions
function createActionPanel() {

	console.log("In action panel!");

}


//Will transform the colors of the boxes back to their original color
function toBoxOriginalColor(boxes) {
	var boxCoordinates = [];
	var index;
	var colorMaterial = new BABYLON.StandardMaterial("colorMaterial", scene);

	
	for (index = 0; index < boxes.length; index += 1) {
		boxCoordinates.push(boxes[index].position.x);
		boxCoordinates.push(boxes[index].position.y);

		colorMaterial.diffuseColor = colorPicker(boxCoordinates);
		boxes[index].material = colorMaterial;
		console.log(boxes[index].material.diffuseColor + boxes[index].position);
		boxCoordinates = [];

	}
	

}



//Change box color based on input boxes
/*
function highlightAvailablePositions(arrayOfBoxes, color) {
	var index;
	var material = new BABYLON.StandardMaterial("material", scene);
	material.diffuseColor = color;

	for (index = 0; index < arrayOfBoxes.length; index += 1) {
		arrayOfBoxes[index].material = material
	}

}
*/

function highlightAvailablePositions(box, color) {
	var index;
	var material = new BABYLON.StandardMaterial("material", scene);
	material.diffuseColor = color;

	box.material = material;

}

//With the correct Vector3 position, will find boxes around the given box
function getBoxesByPosition(arrayCounter, unitRange) {
	//Loop through physicalGrid to find boxes that match these positions
	//return an array of boxes within the range of the unit
	var listOfBoxesByNumber;

	listOfBoxesByNumber = calculateRange(arrayCounter, unitRange);

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

	for (var counter = 1; counter < physicalGrid.length; counter++) {
		if (unitPositionOnGrid.equals(physicalGrid[counter].position)) {
			break;
		}
	}



	movableGridPositions = getBoxesByPosition(counter, unitRange);


	if (movableGridPositions === 0) {
		console.log("No moves possible");
		return;
	}

	//Get box at specific position
	//Add box and material to map
	for (index = 0; index < movableGridPositions.length; index += 1) {
		arrayOfBoxes.push(physicalGrid[movableGridPositions[index]]);
		arrayOfColors.push(arrayOfBoxes[index]);
		boxColorsMap.set(arrayOfBoxes[index].material, movableGridPositions[index]);
	}


	//TODO
	//Double check possible locations, verify that it is possible to move there

	//If the unit was previously selected and clicked again, change the squares back
	if (unit.isCurrentlySelected) {
		//Change squares

		toBoxOriginalColor(arrayOfBoxes);
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
			function(){createActionPanel();}
		)
	);
}




function initializeDisplay() {

	"use strict";
	canvas = document.getElementById("canvas");
	engine = new BABYLON.Engine(canvas);
	scene = new BABYLON.Scene(engine);
	scene.actionManager = new BABYLON.ActionManager(scene);

	//camera = new BABYLON.ArcRotateCamera("Camera", 3 * Math.PI / 2, Math.PI / 8, 20, BABYLON.Vector3(5, 5, 5), scene);
	camera = new BABYLON.FreeCamera("Camera", new BABYLON.Vector3(5.5, 5.5, -12), scene);
	//camera.attachControl(canvas, true);

	light = new BABYLON.HemisphericLight("hemi", new BABYLON.Vector3(0, 1, 0), scene);

	unitsOnMap = [];

	createPhysicalGrid();

	var unitsOnBoard = getUnitsOnBoard();

	makePhysicalBodyRed();
	makePhysicalBodyBlue();

	
	for (var counter = 0; counter < unitsOnMap.length; counter++) {
		loadActionManager(unitsOnBoard[counter]);
	}

	selectUnit(unitsOnBoard[1]);
	selectUnit(unitsOnBoard[0]);
	
	animationMove(unitsOnMap[0], [4,4]);

	renderScene();

}


