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
		createGUIActionPanel(player, unit, true);
	} else {
		//create basic panel
		createGUIActionPanel(player, unit, false);
	}
	
}


/*
	The responsibility of this function is create a usable panel
	for the player to select the appropriate action and cascade events forward
	in gameplay.
	This should be used if and only if the player and unit are on the same team.
	@param player is the player selecting the unit.
	@param unit is the unit being selected.
	@param actionButtonsPresent sets the action buttons to be visible or not.
*/
function createGUIActionPanel(player, unit, actionButtonsPresent) {
	var scene = getScene();
	var frame;
	var group;
	var panelGUI;
	var moveButton;
	var attackButton;
	var unitSpecialButton;
	var closeButton;
	var blackColor = new BABYLON.Color4(0,0,0, 1);
	var index;


	var messagePanel;
	var unitHealthMessage;
	var unitTypeMessage;
	var unitDamageMessage;
	var unithasActionMessage;
	var unitTeamMessage;
	var unitSpecialDescriptionMessage;

	var unitHealhText;
	var unitTypeText;
	var unitDamageText;
	var unithasActionText;
	var unitTeamText;
	var unitSpecialDescriptionText;
	//var unitRangeMessage; NOT YET IMPLEMENTED!!!!!!!
	var textArray = [0];
	var panelButtonsArray = [];

	var highlightColor = BABYLON.Canvas2D.GetBrushFromString("#6666FFFF");
	var buttonColor = BABYLON.Canvas2D.GetBrushFromString("#FFFFFFFF");




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
		roundRadius: 15,
		border: "#000000FF",
		borderThickness: 10,
		fill: "#D9FFB3FF"
	});



	moveButton = new BABYLON.Rectangle2D({ 
		parent: panelGUI,
		id: "move_button",
		width: 110, 
		height: 50, 
		fill: "#FFFFFFFF",
		isVisible: actionButtonsPresent,
		border: "#476b6bFF",
		borderThickness: 5,
		roundRadius: 10,
		children: [
			new BABYLON.Text2D("Move", { marginAlignment: "h: center, v:center", defaultFontColor: blackColor})
		]}),

	//moveButton.margin.topPixels = 10;
	//moveButton.padding.topPercentage = 10;

	moveButton.margin.bottomPercentage = 0.9;
	moveButton.margin.leftPercentage = 0.25;

	makeMoveAction(moveButton, unit);

	panelButtonsArray.push(moveButton);
	
	attackButton = new BABYLON.Rectangle2D({
		parent: panelGUI,
		id: "attack_button",
		width: 110,
		height: 50,
		fill: "#FFFFFFFF",
		isVisible: actionButtonsPresent,
		border: "#476b6bFF",
		borderThickness: 5,
		roundRadius: 10,
		children: [
			new BABYLON.Text2D("Attack", {marginAlignment: "h: center, v: center", defaultFontColor: blackColor})
		]
	});

	attackButton.margin.bottomPercentage = 0.8;
	attackButton.margin.leftPercentage = 0.25;

	panelButtonsArray.push(attackButton);
	
	unitSpecialButton = new BABYLON.Rectangle2D({
		parent: panelGUI,
		id: "unit_special_button",
		width: 110,
		height: 50,
		fill: "#FFFFFFFF",
		isVisible: actionButtonsPresent,
		border: "#476b6bFF",
		borderThickness: 5,
		roundRadius: 10,
		children: [
			new BABYLON.Text2D("Unit Special", {marginAlignment: "h: center, v: center", defaultFontColor: blackColor})
		]
	});

	unitSpecialButton.margin.bottomPercentage = 0.7;
	unitSpecialButton.margin.leftPercentage = 0.25;

	panelButtonsArray.push(unitSpecialButton);

	closeButton = new BABYLON.Rectangle2D({
		parent: panelGUI,
		id: "close_panel_button",
		width: 110,
		height: 50,
		fill: "#FFFFFFFF",
		border: "#476b6bFF",
		borderThickness: 5,
		roundRadius: 10,
		children: [
			new BABYLON.Text2D("Close", {marginAlignment: "h: center, v: center", defaultFontColor: blackColor})
		]
	});

	closeButton.margin.bottomPercentage = 0.1;
	closeButton.margin.leftPercentage = 0.25;

	panelButtonsArray.push(closeButton);

	for (index = 0; index < panelButtonsArray.length; index += 1) {
		onHoverColorChange(panelButtonsArray[index], highlightColor, buttonColor);
	}

	closePanel(closeButton, panelGUI);

	//panelGUI.domElement.style.width = "400px";
	//panelGUI.domElement.id = "actionPanel";
	unitHealthMessage = "Health: " + unit.getHealth();
	unitTeamMessage = "Team: " + unit.getTeam();
	unitTypeMessage = "Class: " + unit.getTypeOfUnit();
	unitDamageMessage = "Damage: " + unit.getUnitDamage();
	
	if (unit.hasActions()) {
		unithasActionMessage = "Unit can still move";
	} else {
		unithasActionMessage = "No more actions this turn";
	}

	unitSpecialDescriptionMessage = unit.unitSpecial();


	unitHealhText = new BABYLON.Text2D(unitHealthMessage, {defaultFontColor: blackColor});
	unitTeamText = new BABYLON.Text2D(unitTeamMessage, {defaultFontColor: blackColor} );
	unitTypeText = new BABYLON.Text2D(unitTypeMessage, {defaultFontColor: blackColor} );
	unitDamageText = new BABYLON.Text2D(unitDamageMessage, {defaultFontColor: blackColor});
	unithasActionText = new BABYLON.Text2D(unithasActionMessage, {defaultFontColor: blackColor});
	unitSpecialDescriptionText = new BABYLON.Text2D(unitSpecialDescriptionMessage, {defaultFontColor: blackColor, wordwrap: true});

	textArray.push(unitHealhText);
	textArray.push(unitTeamText);
	textArray.push(unitTypeText);
	textArray.push(unitDamageText);
	textArray.push(unithasActionText);
	textArray.push(unitSpecialDescriptionText);

	messagePanel = new BABYLON.Rectangle2D({
		parent: panelGUI,
		id: "unit_stats_panel",
		width: 300,
		height: 200,
		fill: "#FFFFFFFF",
		border: "#476b6bFF",
		borderThickness: 5,
		roundRadius: 20,
		children: [
			unitHealhText,
			unitTeamText,
			unitTypeText,
			unitDamageText,
			unithasActionText,
			unitSpecialDescriptionText
		]
	});

	messagePanel.margin.bottomPercentage = 0.3;
	messagePanel.margin.leftPercentage = 0.05;


	//unitHealhText.margin.leftPercentage = 0.4;

	//alignWithinGUI(unitHealhText, 0.1, 0.1);

	
	for (index = 1; index < textArray.length; index++) {
		alignWithinGUI(textArray[index], 0.1, 1 - (0.15 * index));
	}
	


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
	This function is designed to take an object in and adjust the alignment within a parent object.
	@object the object being aligned
	@horizontalAlignment the horizontal adjustment, aligned from the left (values 0 to 1)
	@verticalAlignment the vertical adjustment, aligned from the bottom (values 0 to 1)
*/
function alignWithinGUI(object, horizontalAlignment, verticalAlignment) {
	object.margin.leftPercentage = horizontalAlignment;
	object.margin.bottomPercentage = verticalAlignment;

}

/*
	This function is create an on hover color change for the selected element.
	@param element the object which will change color
	@param highlight the color to change to (Color brush for fill)
	@param originalColor is the default color (Color brush for fill)
*/
function onHoverColorChange(element, highlight, originalColor) {
	//The original color
	element.actionManager.registerAction(
		new BABYLON.SetValueAction(
			BABYLON.ActionManager.OnPointerOutTrigger,
			element,
			"fill",
			originalColor
		)

	);


	//Highlight color
	element.actionManager.registerAction(
		new BABYLON.SetValueAction(
			BABYLON.ActionManager.OnPointerOverTrigger,
			element,
			"fill",
			highlight
		)

	);

}

function makeMoveAction(moveButton, unit) {
	moveButton.actionManager.registerAction(
		new BABYLON.ExecuteCodeAction(
			BABYLON.ActionManager.OnPickTrigger,
			function(){selectUnit(unit);}
		)
	);


}


function closePanel(button, panel) {
	button.actionManager.registerAction(
		new BABYLON.SetValueAction(
			BABYLON.ActionManager.OnPickTrigger,
			panel,
			"levelVisible",
			false
		)
	);

}


function playerNamePanel(player) {

	if (!guiMade) {
		makeGUISystem();
	}

	var frame;
	var namePanel;
	var blackColor = new BABYLON.Color4(0,0,0, 1);
	var playerName =  "";
	var fillColor;

	frame = new BABYLON.Rectangle2D({ parent: gui, id: "namePanelFrame", size: null, });


	playerName += player.getName();

	if (player.getTeam === "red") {
		fillColor = "#FF0505FF";
	} else {
		fillColor = "#0519FFFF";
	}

	namePanel = new BABYLON.Rectangle2D({
		parent: frame,
		id: "namePanel",
		x: 0,
		y: 0,
		width: 300,
		height: 100,
		roundRadius: 12,
		fill: fillColor,
		childred: [
			new BABYLON.Text2D("test", {marginAlignment: "h: center, v: center", defaultFontColor: blackColor})
		]
	});

	
	console.log(playerName);

	return namePanel;


}