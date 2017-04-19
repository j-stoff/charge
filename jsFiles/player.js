/*

	Player file to hold player information
	Author: Jacob Stoffregen

*/

var Player = function(name, team) {

	this.name = name;
	this.team = team;

	this.pieces = [];

	this.getName = function getName() {
		return this.name;
	}

	this.getTeam = function getTeam(){
		return this.team;
	}

	this.getPieces = function getPieces() {

		return this.pieces;
	}

	this.setPieces = function setPieces(listOfPieces) {
		this.pieces = listOfPieces;
	}

}