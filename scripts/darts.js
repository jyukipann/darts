var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
document.body.appendChild(canvas);
var width = document.body.clientWidth;
var height = window.innerHeight;
var mouseX = 0, mouseY = 0;
var mainloop;
resetCanvas();
hidden();

var game_mode = "start_menu";
var players = [];

function resetCanvas(){
	canvas.width = width;
	canvas.height = height;
	canvas.style.backgroundColor = "rgb(200,200,200)";
	canvas.style.top = "0";
	canvas.style.left = "0";
	canvas.style.position = "absolute";
	ctx.clearRect(0,0,canvas.width,canvas.height);
}

async function resizeCanvas(){
	width = document.body.clientWidth;
	height = window.innerHeight;
	canvas.width = width;
	canvas.height = height;
}

function hidden(){
	canvas.style.visibility = "hidden";
}

function visible(){
	canvas.style.visibility = "visible";
}

function getMouseXY(e){
	var rect = canvas.getBoundingClientRect();
	mouseX = e.clientX - rect.left;
	mouseY = e.clientY - rect.top;
	endloop();
}

async function start(){
	console.log("start");
	resetCanvas();
	visible();
	mainloop = requestAnimationFrame(update);
}

async function update(){
	//console.log("update");
	ctx.clearRect(0,0,canvas.width,canvas.height);
	ctx.save();
	ctx.fillStyle = "black";
	ctx.restore();
	mainloop = requestAnimationFrame(update);
}

async function endloop(){
	console.log("end");
	cancelAnimationFrame(mainloop);
	resetCanvas();
	hidden();
}

async function start_menu(){
	var all_elements = [];
	var player_inputs = [];
	var players_num = 0;

	var title = document.createElement("h1");
	all_elements.push(title);
	title.className = "start_menu";
	title.innerHTML = 'ダーツ';
	document.body.appendChild(title);

	var form = document.createElement("form");
	all_elements.push(form);
	form.id = "input_player";
	form.className = "start_menu";
	document.body.appendChild(form);

	var add_player_button = document.createElement("input");
	all_elements.push(add_player_button);
	add_player_button.className = "start_menu";
	add_player_button.type = 'button';
	add_player_button.value = "Add Player";
	add_player_button.addEventListener("mouseup",add_player_input);
	document.body.appendChild(add_player_button);

	function add_player_input(){
		console.log("add_player_input");
		player_inputs.push(document.createElement("input"));
		player_inputs[players_num].className = "start_menu";
		player_inputs[players_num].value = "Player " + (players_num+1);
		player_inputs[players_num].type = 'text';
		form.appendChild(player_inputs[players_num]);
		players_num++;
	}
}

async function zeroOne(startNum,round,players){
	console.log("zero one : ",startNum);
	winer = -1;

	for(let i = 0; i < round; round--){
		if(winer > -1){
			break;
		}
		for(let j = 0; j < players.length; i++){

		}
	}

}

//window.addEventListener("load", start);
window.addEventListener('resize', resizeCanvas);
canvas.addEventListener("mouseup",getMouseXY);