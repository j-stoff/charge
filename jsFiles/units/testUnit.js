/*

	Author: Jacob Stoffregen
	Date: 2/8/2017

	Test unit creation
*/


function dummyUnit(team, startPosition) {

	this.health = 4;
	this.team = team;
	this.visualDisplay = null;
	this.attackDamage = 1;
	this.visionRadius = 1;
	this.position = startPosition;
	this.action = true;
	this.buff = null;

	this.moveUnit = function (destination) {

		if (checkBoundsOfGrid(destination)) {
				this.position = destination;
		}
	}	

	this.setAction = function(changeInAction) {

		if (changeInAction !== true || changeInAction !== false) {
			console.log("Set action failure, not boolean");
			return;
		}
		this.action = changeInAction;
	}

	this.hasAction = function() {
		return this.action;
	}

	this.unitSpecial = function () {
		return "It works";
	}

	this.setVisualDisplay = function(object) {
		//Needs testing with 'object'
		this.visualDisplay = object;
	}
}

