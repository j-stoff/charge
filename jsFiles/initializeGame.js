/*
	Initilize game

*/

function removeContainer() {
	var container = document.getElementById("container");

	container.style.visibility = "hidden";
	container.style.margin = "0";

}

function removeForm() {
	var form = document.getElementById("form");

	form.style.visibility = "hidden";
	form.style.height = "0";
}

/*
	Main function calling the other functions to initialize
*/
function forward() {

	removeForm();

	removeContainer();

	startGame();

}