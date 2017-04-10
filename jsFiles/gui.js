/*
	GUI

	Author: Jacob Stoffregen
*/

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
	var moveButton;
	var attackButton;
	var unitSpecialButton;
	var closeButton;
	var blackColor = new BABYLON.Color4(0,0,0, 1);
	// var canvas = new BABYLON.ScreenSpaceCanvas2D(scene, { 
	//id: "ScreenCanvas",  backgroundFill: "#40404040", backgroundRoundRadius: 10 });

	frame = new BABYLON.Rectangle2D({ parent: gui, id: "frame", size: null, });
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
	/*
	group = new BABYLON.Group2D({
		parent: frame, id: "action_panel", layoutEngine: "StackPanel", x: 50, y: 100, children: [
			new BABYLON.Rectangle2D({ id: "main_panel", width: 350, height: 750, border: "#321BE5FF", borderThickness: 5, fill: "#5AFCDCFF"}),
			new BABYLON.Rectangle2D({ id: "move_button", width: 100, height: 50, marginAlignment: "h: center, v:center", fill: "#FFFFFFFF"}),
		]
	});
	*/

	//Will need to add children to JSON
	
	panelGUI = new BABYLON.Rectangle2D({
		parent: frame,
		id: "actionPanel",
		layoutEngine: "action_panel",
		x: 50,
		y: 100,
		width: 350,
		height: 750,
		border: "#321BE5FF",
		borderThickness: 5,
		fill: "#5AFCDCFF"
	});



	moveButton = new BABYLON.Rectangle2D({ 
		parent: panelGUI,
		id: "move_button",
		width: 110, 
		height: 50, 
		fill: "#FFFFFFFF",
		children: [
			new BABYLON.Text2D("Move", { marginAlignment: "h: center, v:center", defaultFontColor: blackColor})
		]}),

	//moveButton.margin.topPixels = 10;
	//moveButton.padding.topPercentage = 10;

	moveButton.margin.bottomPercentage = 0.9;
	moveButton.margin.leftPercentage = 0.25;
	
	attackButton = new BABYLON.Rectangle2D({
		parent: panelGUI,
		id: "attack_button",
		width: 110,
		height: 50,
		fill: "#FFFFFFFF",
		children: [
			new BABYLON.Text2D("Attack", {marginAlignment: "h: center, v: center", defaultFontColor: blackColor})
		]
	});

	attackButton.margin.bottomPercentage = 0.8;
	attackButton.margin.leftPercentage = 0.25;
	
	unitSpecialButton = new BABYLON.Rectangle2D({
		parent: panelGUI,
		id: "unit_special_button",
		width: 110,
		height: 50,
		fill: "#FFFFFFFF",
		children: [
			new BABYLON.Text2D("Unit Special", {marginAlignment: "h: center, v: center", defaultFontColor: blackColor})
		]
	});

	unitSpecialButton.margin.bottomPercentage = 0.7;
	unitSpecialButton.margin.leftPercentage = 0.25;

	closeButton = new BABYLON.Rectangle2D({
		parent: panelGUI,
		id: "close_panel_button",
		width: 110,
		height: 50,
		fill: "#FFFFFFFF",
		children: [
			new BABYLON.Text2D("Close", {marginAlignment: "h: center, v: center", defaultFontColor: blackColor})
		]
	});

	closeButton.margin.bottomPercentage = 0.1;
	closeButton.margin.leftPercentage = 0.25;
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