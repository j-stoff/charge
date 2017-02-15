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
	canvas = document.getElementById("canvas");
	engine = new BABYLON.Engine(canvas);
	scene = new BABYLON.Scene(engine);

	//camera = new BABYLON.ArcRotateCamera("Camera", 3 * Math.PI / 2, Math.PI / 8, 20, BABYLON.Vector3(5, 5, 5), scene);
	camera = new BABYLON.FreeCamera("Camera", new BABYLON.Vector3(4.5, 4.5, -12), scene);
	//camera.attachControl(canvas, true);

	light = new BABYLON.HemisphericLight("hemi", new BABYLON.Vector3(0, 1, 0), scene);

	console.log(camera.position);
	
	var grid = createGrid(1, 1);	//Will need to pass in params later

	for (var counter = 0; counter < grid.length; counter++) {
		var coordinates = grid[counter];



		var box = BABYLON.Mesh.CreateBox("box", 1, scene);
		box.position = new BABYLON.Vector3(coordinates[0], coordinates[1], 2);
		var mat = new BABYLON.StandardMaterial("mat", scene);
		
		//mat.emissiveColor = new BABYLON.Color3(Math.random(), Math.random(), Math.random());

		
		mat.emissiveColor = colorChanger(coordinates);
		
		box.material = mat;
		grid[counter] = box;
	}

	renderScene();
	
}




