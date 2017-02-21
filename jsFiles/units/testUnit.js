/*

	Author: Jacob Stoffregen
	Date: 2/8/2017

	Test unit creation
*/


function dummyUnit(team, startPosition) {

	this.name;
	this.health = 4;
	this.team = team;
	this.visualDisplay = null;
	this.attackDamage = 1;
	this.visionRadius = 1;
	this.position = startPosition;
	this.action = true;
	this.buff = null;

	this.moveUnitCheck = function (destination) {

		if(this.position === destination) {
			console.log("No movement");
			return false;
		}

		if (checkBoundsOfGrid(destination)) {
			return false;
		}
		this.position = destination;
		return true;
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

	this.setName = function(newName){
		this.name = newName;
	}

	this.setVisualDisplay = function(object) {
		//Needs testing with 'object'
		this.visualDisplay = object;
	}
}

