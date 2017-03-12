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

	console.log("End of blue Make");

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

	console.log("End of red Make");

	renderScene();


	unitsOnMap.push(unit);
}



function animationMove(unit, destination){
	//var moveCheckPassed = false;

   	"use strict";
    var xMoveTest = checkMoveFromOriginalPosition(unit.position[0], destination[0]);
    var yMoveTest = checkMoveFromOriginalPosition(unit.position[1], destination[1]);

    var body = unit.visualDisplay;
	
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


	console.log("Animation");


}

//Panel for actions
function createActionPanel() {

}

//Change box color based on input boxes
function highlightAvailablePositions(arrayOfBoxes, color) {
	var index;
	var material = new BABYLON.StandardMaterial("material", scene);
	material.diffuseColor = color;

	for (index = 0; index < arrayOfBoxes.length; index += 1) {
		arrayOfBoxes[index].material = material
	}

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
	var index;
	var moveColor = new BABYLON.Color3((0/255), (255/255), (144/255));
	//var gridLocation = findGridLocation(unitPositionOnGrid);

	for (var counter = 1; counter < physicalGrid.length; counter++) {
		if (unitPositionOnGrid.equals(physicalGrid[counter].position)) {
			break;
		}
	}



	movableGridPositions = getBoxesByPosition(counter, unitRange);

	console.log(movableGridPositions);

	if (movableGridPositions === 0) {
		console.log("No moves possible");
		return;
	}

	//Get box at specific position
	//Add box and material to map
	for (index = 0; index < movableGridPositions.length; index += 1) {
		arrayOfBoxes.push(physicalGrid[movableGridPositions[index]]);
		boxColorsMap.set(movableGridPositions[index], arrayOfBoxes[index].material);
	}

	highlightAvailablePositions(arrayOfBoxes, moveColor);


}


var selectUnit = function (unit) {

	console.log("In selectUnit");
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


	mesh.actionManager = new BABYLON.ActionManager(scene);

	//ExecuteCodeAction(trigger, func, condition)
	mesh.actionManager.registerAction(
		new BABYLON.ExecuteCodeAction(
			BABYLON.ActionManager.OnPickTrigger,
			createMovableSpace(unit),
			false
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
		selectUnit(unitsOnBoard[counter]);
	}
	
	animationMove(unitsOnMap[0], [4,4]);

	renderScene();

}


