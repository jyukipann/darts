/* var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
document.body.appendChild(canvas);
var width = document.body.clientWidth;
var height = window.innerHeight;
var mouseX = 0, mouseY = 0;
var mainloop;

resetCanvas();
hidden();
 */
var game_mode = "start_menu";
var game_mode_list = ["01","COUNT-UP","CRICKET"];
var zero_one_start = 301;
var round = 8;
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

/* function hidden(){
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
} */

var all_elements = [];
var player_inputs = [];
var players_num = 0;
var start_menu_div;
async function start_menu(){
	try{
		start_menu_div.style.display = "inline";
		console.log("display");
	}catch(err){
		console.log("generate");

		start_menu_div = document.createElement("div");
		start_menu_div.name = "start_menu";
		start_menu_div.style.display = "inline";
	
		var title = document.createElement("h1");
		all_elements.push(title);
		title.className = "start_menu";
		title.innerHTML = 'DARTS';
	
		var form = document.createElement("form");
		all_elements.push(form);
		form.id = "input_player";
		form.className = "start_menu";
		
		var add_player_button = document.createElement("input");
		all_elements.push(add_player_button);
		add_player_button.className = "start_menu";
		add_player_button.type = 'button';
		add_player_button.value = "add Player";
		set_last_players();
		add_player_button.addEventListener("mouseup",() => {add_player_input("")});
	
		var selected_label = document.createElement("h2");
		all_elements.push(selected_label);
		selected_label.className = "start_menu";
		selected_label.innerHTML = 'selected : '+game_mode;
	
		var radio_button_list = document.createElement("div");
		all_elements.push(radio_button_list);
		radio_button_list.className = "start_menu";

		var zero_one_radio_button_list = document.createElement("div");
		all_elements.push(zero_one_radio_button_list);
		zero_one_radio_button_list.className = "start_menu";
		zero_one_radio_button_list.style.display = "none";
		var zero_one_nums = [301,501,701,901,1101,1301,1501];
		zero_one_nums.forEach(num => make_zero_one_radio_button(num));
	
		game_mode_list.forEach(name => make_radio_button(name));
		let br = document.createElement("br");
		all_elements.push(br);
		br.className = "start_menu";
	
		var players_list = document.createElement("div");
		all_elements.push(players_list);
		players_list.className = "start_menu";
	
		var start_button = document.createElement("input");
		all_elements.push(start_button);
		start_button.className = "start_menu";
		start_button.type = 'button';
		start_button.value = "start";
		start_button.addEventListener("mouseup",() => {
			get_player_name_list();
			game_start();
		});
	
		document.body.appendChild(start_menu_div);
		start_menu_div.appendChild(title);
		start_menu_div.appendChild(form);
		form.appendChild(selected_label);
		form.appendChild(radio_button_list);
		radio_button_list.appendChild(br);
		radio_button_list.appendChild(zero_one_radio_button_list);
		form.appendChild(add_player_button);
		form.appendChild(players_list);
		form.appendChild(start_button);
	
		function set_last_players(){
			player_inputs = [];
			players_num = 0;
			players.forEach(name => {
				add_player_input(name);
			});
		}
	
		function get_player_name_list(){
			players = [];
			player_inputs.forEach(input => {
				if(input.value !== ""){
					players.push(input.value);
				}
			});
			players_num = players.length;
		}
	
		function add_player_input(name){
			//console.log("add_player_input");
	
			player_inputs.push(document.createElement("input"));
			all_elements.push(player_inputs[players_num]);
			player_inputs[players_num].className = "start_menu";
			player_inputs[players_num].value = name == ""? "Player " + (players_num+1): name;
			player_inputs[players_num].type = 'text';
			player_inputs[players_num].id = players_num;
			players_list.appendChild(player_inputs[players_num]);
	
			let delete_button = document.createElement("input");
			all_elements.push(delete_button);
			delete_button.type = 'button';
			delete_button.value = 'delete';
			delete_button.className = "start_menu";
			delete_button.id = players_num;
			delete_button.addEventListener("mouseup",(e)=>{
				player_inputs[e.target.id].remove();
				document.getElementById("players_list_br_"+e.target.id).remove();
				e.target.remove();
			});
			players_list.appendChild(delete_button);
	
			let br = document.createElement("br");
			all_elements.push(br);
			br.id = "players_list_br_"+players_num;
			br.className = "start_menu";
			players_list.appendChild(br);

			players_num++;
		}

		function make_zero_one_radio_button(num){
			var zero_one_radio_button = document.createElement("input");
			all_elements.push(zero_one_radio_button);
			zero_one_radio_button.className = "start_menu";
			zero_one_radio_button.type = 'radio';
			zero_one_radio_button.name = 'zero_one_start';
			zero_one_radio_button.value = num;
			zero_one_radio_button.addEventListener("mouseup",(e)=>{
				zero_one_start = Number(e.target.value);
				selected_label.innerHTML = 'selected : ' + game_mode + " start at " + zero_one_start;
			});
			zero_one_radio_button_list.appendChild(zero_one_radio_button);
			var zero_one_mode_num_label = document.createElement("span");
			all_elements.push(zero_one_mode_num_label);
			zero_one_mode_num_label.className = "start_menu";
			zero_one_mode_num_label.innerHTML = ""+num;
			zero_one_radio_button_list.appendChild(zero_one_mode_num_label);
		}
	
		function make_radio_button(name){
			var game_radio_button = document.createElement("input");
			all_elements.push(game_radio_button);
			game_radio_button.className = "start_menu";
			game_radio_button.type = 'radio';
			game_radio_button.name = 'game_mode';
			game_radio_button.value = name;
			game_radio_button.addEventListener("mouseup",(e)=>{
				game_mode = e.target.value;
				selected_label.innerHTML = 'selected : ' + game_mode;
				if(game_mode === "01"){
					try{
						zero_one_radio_button_list.style.display = "inline";
					}catch(err){}
				}else{
					zero_one_radio_button_list.style.display = "none";
				}
			});
			radio_button_list.appendChild(game_radio_button);
			var game_mode_name_label = document.createElement("span");
			all_elements.push(game_mode_name_label);
			game_mode_name_label.className = "start_menu";
			game_mode_name_label.innerHTML = name;
			radio_button_list.appendChild(game_mode_name_label);
		}
	}
}

function game_start(){
	function debug_log(){
		console.log("game_start");
		console.log(players);
		console.log(game_mode);
		console.log(round);
	}
	var game;
	switch(game_mode){
		case "01":
			if(zero_one_start < 901){
				round = 8;
			}else if(zero_one_start < 1301){
				round = 10;
			}else{
				round = 15;
			}
			game = zeroOne;
			break;
		case "COUNT-UP":
			round = 8;
			break;
		case "CRICKET":
			round = 20;
			break;
		default:
			game = start_menu;
	}
	debug_log();
	if(players.length > 0){
		start_menu_div.style.display = "none";
		game();
	}
}

async function zeroOne(){
	console.log("zero one : ",zero_one_start);
	var winer = -1;
	for(let i = 0; i < round; round--){
		if(winer > -1){
			break;
		}
		for(let j = 0; j < players.length; i++){

		}
	}
}

window.addEventListener("load", start_menu);
window.addEventListener('resize', resizeCanvas);
canvas.addEventListener("mouseup",getMouseXY);