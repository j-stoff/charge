/*

	Author: Jacob Stoffregen
	Date: 1/29/17

	Layout for grid and physical rendering
*/


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
	
	var grid = createGrid(1, 1);	//Will need to pass in params later

	var canvas = document.getElementById("canvas");
	var engine = new BABYLON.Engine(canvas);
	var scene = new BABYLON.Scene(engine);

	var onColor = 1;

	var camera = new BABYLON.ArcRotateCamera("Camera", 3 * Math.PI / 2, Math.PI / 8, 20, BABYLON.Vector3.Zero(), scene);
	camera.attachControl(canvas, true);
	
	var light = new BABYLON.HemisphericLight("hemi", new BABYLON.Vector3(0, 1, 0), scene);

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

	var renderLoop = function() {
		scene.render();

	}

	engine.runRenderLoop(renderLoop);
}

