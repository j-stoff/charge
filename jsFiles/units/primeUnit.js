/*
	Author: Jacob Stoffregen
	Created: 2/21/17
	
*/


function primeUnit(team, startPosition, unitName) {

	this.name = unitName;
	this.health = 2;
	this.team = team;
	this.visualDisplay;
	this.attackDamage = 1;
	this.visionRadius = 1;
	this.position = startPosition;
	this.actions = 1;
	this.buff = null;
	this.moveSpaces = 2;
	this.isCurrentlySelected = false;
	this.typeOfUnit = "Infantry";

	this.getTeam = function getTeam() {

		return this.team;
	}

	this.getHealth = function getHealth() {
		return this.health;
	}

	this.setHealth = function setHealth(health) {
		this.health = health;
	}

	this.getUnitDamage = function getUnitDamage() {
		return this.attackDamage;
	}

	this.getTypeOfUnit = function getTypeOfUnit() {
		return this.typeOfUnit;
	}


	this.moveUnitCheck = function moveUnitCheck(destination) {

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

	this.setActions = function setActions(changeInAction) {

		this.actions = changeInAction;
	}

	this.getActions = function getActions() {
		return this.actions;
	}

	this.hasActions = function hasActions() {
		if (this.actions >= 1) {
			return true;
		}
		return false;
	}

	this.unitSpecial = function unitSpecial() {
		return "It works";
	}

	this.setName = function setName(newName){
		this.name = newName;
	}

	this.setVisualDisplay = function setVisualDisplay(object) {
		//Needs testing with 'object'
		this.visualDisplay = object;
	}

	this.setIsCurrentlySelected = function setIsCurrentlySelected(boolean) {
		this.isCurrentlySelected = boolean;
	}

}