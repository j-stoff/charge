/*
	GUI

	Author: Jacob Stoffregen
*/

//var canvas;
//var scene;
var guiSystem;
var guiMade = false;
var gui;


/*
	This is the initialztion method to create the backbone of the GUI.
	A guiSystem variable is necessary for all GUi. Canvas is retreived using 
	a simple get function.
*/

function makeGUISystem() {

	gui = new BABYLON.ScreenSpaceCanvas2D(scene, {id: "CanvasGUI"});

	//guiSystem = new CASTORGUI.GUIManager(canvas);

	guiMade = true;

	console.log("GUI system was made " + guiMade);

}

/*
	This is a high level function that determines which panel to create.
	@param player is the player that caused the panel to be created
*/

function createPanel(player, unit) {

	
	
	if (!guiMade) {
		makeGUISystem();
	}

	//player.getPlayerTeam()
	//unit.getTeam()

	//If player and team are the same, create action panel
	if (true) {
		createGUIActionPanel(player, unit);
	} else {
		//create basic panel
		createSimplePanel(player, unit);
	}
	
}


/*
	The responsibility of this function is create a usable panel
	for the player to select the appropriate action and cascade events forward
	in gameplay.
	This should be used if and only if the player and unit are on the same team.
	@param player is the player selecting the unit
	@param unit is the unit being selected
*/
function createGUIActionPanel(player, unit) {
	console.log("This far");

	var scene = getScene();
	var frame;
	var group;
	var panelGUI;
	// var canvas = new BABYLON.ScreenSpaceCanvas2D(scene, { 
	//id: "ScreenCanvas",  backgroundFill: "#40404040", backgroundRoundRadius: 10 });

	frame = new BABYLON.Rectangle2D({ parent: gui, id: "frame", size: null, border: "#CAE428FF", borderThickness: 1 });
	/*
	group = new BABYLON.Group2D({
        parent: frame, id: "group", layoutEngine: "StackPanel", children: [
            new BABYLON.Rectangle2D({ id: "rect1", width: 100, height: 100, fill: "#40C040FF", marginAlignment: "v: center, h:center" }),
            new BABYLON.Rectangle2D({ id: "rect2", width: 100, height: 100, fill: "#C04040FF", margin: 10 }),
            new BABYLON.Rectangle2D({ id: "rect3", width: 100, height: 100, fill: "#4040C0FF" }),
        ]
    });
	*/
	var oldgui = document.querySelector("#datGUI");
	if (oldgui != null)
	{
		console.log("Old GUI removed");
		oldgui.remove();
	}
	
	//Will need to add children to JSON
	
	panelGUI = new BABYLON.Rectangle2D({
		parent: gui,
		id: "actionPanel",
		x: 150,
		y: 200,
		w: 5,
		h: 5,
		fill: "#40C040FF"
	});
	
	//panelGUI.domElement.style.width = "400px";
	//panelGUI.domElement.id = "actionPanel";




	console.log("Gui made");

	//Add player.getTeam()
	/* OLD STUFF - CASTOR GUI
	panelName = "_player_action_panel";

	canvasWidth = guiSystem.getCanvasWidth().width;
	canvasHeight = guiSystem.getCanvasWidth().height;

	console.log("In the actual action panel");	

	console.log(canvasWidth);
	console.log(canvasHeight);

	var panel = new CASTORGUI.GUIPanel("test", {x:5, y:10, w:50 h:50, overflow: "hidden"}, guiSystem);
	*/
}



/*
	This panel is simply to display infortmation about the unit selected.
	Only used if the player and unit are not the same team.
	@param player is the player selecting the unit
	@param unit is the unit being selected
*/
function createSimplePanel(player, unit) {

}