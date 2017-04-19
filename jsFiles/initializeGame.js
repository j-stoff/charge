/*
	Initilize game

*/

function removeForm() {
	var form = document.getElementById("form");

	form.style.visibility = "hidden";
	form.style.backgroundColor  = "blue";
	form.style.height = "0";
}

/*
	Main function calling the other functions to initialize
*/
function forward() {

	console.log("This far");
	removeForm();

	startGame();

}