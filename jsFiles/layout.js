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
var unitsRed;
var unitsBlue;


function renderScene() {
	var renderLoop = function() {
		scene.render();

	}

	engine.runRenderLoop(renderLoop);

}



function colorChanger(coordinates) {
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
	//canvas = document.getElementById("canvas");
	//engine = new BABYLON.Engine(canvas);
	//scene = new BABYLON.Scene(engine);

	//camera = new BABYLON.ArcRotateCamera("Camera", 3 * Math.PI / 2, Math.PI / 8, 20, BABYLON.Vector3(5, 5, 5), scene);
	//camera = new BABYLON.FreeCamera("Camera", new BABYLON.Vector3(4.5, 4.5, -12), scene);
	//camera.attachControl(canvas, true);

	//light = new BABYLON.HemisphericLight("hemi", new BABYLON.Vector3(0, 1, 0), scene);
	
	var physicalGrid = createGrid(1, 1);	//Will need to pass in params later

	for (var counter = 0; counter < physicalGrid.length; counter++) {
		var coordinates = physicalGrid[counter];



		var box = BABYLON.Mesh.CreateBox("box", 1, scene);
		box.position = new BABYLON.Vector3(coordinates[0], coordinates[1], 2);
		var mat = new BABYLON.StandardMaterial("mat", scene);
		
		//mat.emissiveColor = new BABYLON.Color3(Math.random(), Math.random(), Math.random());

		
		mat.emissiveColor = colorChanger(coordinates);
		
		box.material = mat;
		physicalGrid[counter] = box;
	}
	//renderScene();
}


function makePhysicalBodyBlue () {

	//scene = new BABYLON.Scene(engine);
	unitsBlue = [];
	var unitList = createInitialUnitPositionsBlue();
	var unit = unitList[0];

	var body = BABYLON.Mesh.CreateSphere("body", 0.5, 1, scene);

	body.position = new BABYLON.Vector3(0 , 9, 1.5);
	var mat = new BABYLON.StandardMaterial("mat", scene);

	mat.diffuseColor = new BABYLON.Color3(0,0, 255);

	body.material = mat;

	unit.setVisualDisplay(body);

	console.log("End of blue Make");

	renderScene();

	unitsBlue.push(unit);
}



function makePhysicalBodyRed () {


	//scene = new BABYLON.Scene(engine);
	unitsRed = [];
	var unitList = createInitialUnitPositionsRed();
	var unit = unitList[0];

	var body = BABYLON.Mesh.CreateSphere("body", 0.5, 1, scene);

	body.position = new BABYLON.Vector3(0, 0, 1.5);
	var mat = new BABYLON.StandardMaterial("mat", scene);

	mat.diffuseColor = new BABYLON.Color3(255, 0, 0);

	body.material = mat;

	unit.setVisualDisplay(body);

	console.log("End of red Make");

	renderScene();

	unitsRed.push(unit);
}



function animationMove(unit, destination){
	//var moveCheckPassed = false;
   
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


function initializeDisplay() {

	canvas = document.getElementById("canvas");
	engine = new BABYLON.Engine(canvas);
	scene = new BABYLON.Scene(engine);

	//camera = new BABYLON.ArcRotateCamera("Camera", 3 * Math.PI / 2, Math.PI / 8, 20, BABYLON.Vector3(5, 5, 5), scene);
	camera = new BABYLON.FreeCamera("Camera", new BABYLON.Vector3(4.5, 4.5, -12), scene);
	//camera.attachControl(canvas, true);

	light = new BABYLON.HemisphericLight("hemi", new BABYLON.Vector3(0, 1, 0), scene);


	createPhysicalGrid();

	makePhysicalBodyRed();
	makePhysicalBodyBlue();

	animationMove(unitsRed[0], [4,4]);

	renderScene();

}


