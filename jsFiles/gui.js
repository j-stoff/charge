/*
	GUI

	Author: Jacob Stoffregen
*/

//var canvas;
//var scene;
var guiSystem;
var guiMade = false;


/*
	This is the initialztion method to create the backbone of the GUI.
	A guiSystem variable is necessary for all GUi. Canvas is retreived using 
	a simple get function.
*/

function makeGUISystem() {



	guiSystem = new CASTORGUI.GUIManager(canvas);

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

	//Add player.getTeam()
	panelName = "_player_action_panel";

	canvasWidth = guiSystem.getCanvasWidth().width;
	canvasHeight = guiSystem.getCanvasWidth().height;

	console.log("In the actual action panel");

	console.log(canvasWidth);
	console.log(canvasHeight);

	//var panel = new CASTORGUI.GUIPanel(panelName, {x:(canvasWidth / 10), y:10, w:(canvasWidth / 12) h: (canvasHeight * 0.9)}, guiSystem, testFunction);

}



/*
	This panel is simply to display infortmation about the unit selected.
	Only used if the player and unit are not the same team.
	@param player is the player selecting the unit
	@param unit is the unit being selected
*/
function createSimplePanel(player, unit) {

}