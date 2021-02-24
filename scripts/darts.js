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


/* function resetCanvas(){
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
} */

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

function start_menu(){
	try{
		start_menu_div.style.display = "block";
		//console.log("start_menu : display");
	}catch(err){
		//console.log("start_menu : generate");
		start_menu_div = document.createElement("div");
		start_menu_div.name = "start_menu";
		start_menu_div.style.display = "block";
	
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

		var start_button_div = document.createElement("div");
		start_button_div.style.textAlign = "center";
	
		var start_button = document.createElement("button");
		all_elements.push(start_button);
		start_button.className = "start_menu";
		start_button.type = 'button';
		start_button.value = "start";
		start_button.style.textAlign = "center";
		start_button.innerHTML = "<h1>start</h1>"
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
		start_menu_div.appendChild(start_button_div);
		start_button_div.appendChild(start_button);
	
		function set_last_players(){
			//console.log(arguments.callee.name);
			player_inputs = [];
			players_num = 0;
			players.forEach(name => {
				add_player_input(name);
			});
		}
	
		function get_player_name_list(){
			//console.log(arguments.callee.name);
			players = [];
			player_inputs.forEach(input => {
				if(input.value !== ""){
					players.push(input.value);
				}
			});
			players_num = players.length;
		}
	
		function add_player_input(name){
			//console.log(arguments.callee.name);
	
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
			//console.log(arguments.callee.name);
			var zero_one_radio_button = document.createElement("input");
			all_elements.push(zero_one_radio_button);
			zero_one_radio_button.className = "start_menu";
			zero_one_radio_button.type = 'radio';
			zero_one_radio_button.name = 'zero_one_start';
			zero_one_radio_button.value = num;
			zero_one_radio_button.addEventListener("mouseup",(e)=>{
				zero_one_start = Number(e.target.value);
				selected_label.innerHTML = 'selected : ' + zero_one_start;
			});
			zero_one_radio_button_list.appendChild(zero_one_radio_button);
			var zero_one_mode_num_label = document.createElement("span");
			all_elements.push(zero_one_mode_num_label);
			zero_one_mode_num_label.className = "start_menu";
			zero_one_mode_num_label.innerHTML = ""+num;
			zero_one_radio_button_list.appendChild(zero_one_mode_num_label);
		}
	
		function make_radio_button(name){
			//console.log(arguments.callee.name);
			var game_radio_button = document.createElement("input");
			all_elements.push(game_radio_button);
			game_radio_button.className = "start_menu";
			game_radio_button.type = 'radio';
			game_radio_button.name = 'game_mode';
			game_radio_button.value = name;
			game_radio_button.addEventListener("mouseup",(e)=>{
				game_mode = e.target.value;
				selected_label.innerHTML = 'selected : ' + game_mode;
				let set = (s) => {try{zero_one_radio_button_list.style.display = s;}catch(err){console.log(err)}}
				if(game_mode === "01"){
					set("block");
				}else{
					set("none");
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

async function game_start(){
	//console.log(arguments.callee.name);
	function debug_log(){
		//console.log(arguments.callee.name);
		console.log(players);
		console.log(game_mode);
		console.log(round);
	}
	var game = () => {console.log(game_mode+"()")};
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
			game = countUP;
			break;
		case "CRICKET":
			round = 20;
			break;
		default:
			game = start_menu;
	}
	debug_log();
	if(players.length > 0){
		try{
			start_menu_div.style.display = "none";
			console.log("display='none'");
		}catch(err){
			console.log(err);
		}
		game();
	}
}

async function zeroOne(){
	console.log(arguments.callee.name,zero_one_start);
	var winer = -1;
	for(let i = 0; i < round; i++){
		if(winer > -1){
			break;
		}
		for(let j = 0; j < players.length; j++){

		}
	}
}

async function countUP(){
	players_score_list = [];
	let segment = "";
	for(let i = 0; i < players.length; i++){
		players_score_list.push(0);
	}

	var countUP_div = document.createElement("div");
	countUP_div.className = "game";
	countUP_div.innerHTML = "<h1>COUNT-UP</h1>"

	var round_label = document.createElement("h3");
	round_label.innerHTML = round;

	var player_name_label = document.createElement("h2");
	player_name_label.innerHTML = "";
	
	var point_label = document.createElement("h1");
	point_label.innerHTML = "";
	point_label.style.textAlign = "center";

	var button_div = document.createElement("div");
	button_div.style.textAlign = "center";

	var next_player_button = document.createElement("button");
	next_player_button.innerHTML = "<h1>MISS</h1>"
	next_player_button.style.visibility = "visible";
	next_player_button.style.textAlign = "center";

	var score_table = document.createElement("table");
	score_table.className = "score_table";

	var score_table_head = document.createElement("tr");

	let tr_head = ["ROUND"].concat(players);
	tr_head.forEach(head => {
		let th = document.createElement("th");
		th.innerHTML = head;
		th.style.textAlign = "center";
		score_table.appendChild(th);
	});
	
	document.body.appendChild(countUP_div);
	countUP_div.appendChild(round_label);
	countUP_div.appendChild(player_name_label);
	countUP_div.appendChild(point_label);
	countUP_div.appendChild(button_div);
	button_div.appendChild(next_player_button);
	countUP_div.appendChild(score_table);
	score_table.appendChild(score_table_head);


	var tr,td;
	for(let i = 0; i < round; i++){
		tr = document.createElement("tr");
		score_table.appendChild(tr);
		td = document.createElement("td");
		tr.appendChild(td);
		td.innerHTML = i;
		for(let j = 0; j < players.length; j++){
			player_name_label.innerHTML = players[j];
			point_label.innerHTML = players_score_list[j];
			let round_points = [];
			//next_player_button.style.visibility = "visible";
			next_player_button.innerHTML = "<h1>MISS</h1>"
			for(let k = 3; k > 0; k--){
				round_label.innerHTML = "round : " + (i+1) + " | " 
				round_points.forEach(point => {round_label.innerHTML += " "+point});
				round_label.innerHTML += " 🚀".repeat(k);
				let result = await Promise.race([segment_and_point(), wait_button_tap(next_player_button)]);
				if(result === "pushed"){
					next_player_button.innerHTML = "<h1>NEXT PLAYER</h1>"
					round_label.innerHTML = "round : " + (i+1) + " | " 
					round_points.forEach(point => {round_label.innerHTML += " "+point});
					round_label.innerHTML += " -".repeat(k);
					
					break;
				}else{
					[segment,point] = result;
				}
				round_points.push(point);
				players_score_list[j] += point;
				point_label.innerHTML = players_score_list[j];
				console.log(segment,point);
			}
			round_label.innerHTML = "round : " + (i+1) + " | " 
			round_points.forEach(point => {round_label.innerHTML += " "+point});
			next_player_button.innerHTML = "<h1>NEXT PLAYER</h1>"
			await new Promise(resolve => next_player_button.addEventListener("mouseup", resolve));
		}
	}
	countUP_div.remove();
	start_menu();
}

async function wait_button_tap(button){
	return new Promise(resolve => button.addEventListener("mouseup", (e)=>{console.log("button push");resolve("pushed");}));
}

async function segment_and_point(){
	let point = 0;
	let segment = "";
	while(point < 1 || 60 < point){
		segment = await get_darts_board_segment();
		point = segment2point(segment);
		//console.log(segment,point);
	}
	return new Promise(resolve => {resolve([segment,point])});
}

async function get_darts_board_segment(){
	segcheck = "1234567890sdtiob"
	segment = "";
	while(segment.length < 3){
		segment += await new Promise(resolve => window.addEventListener("keydown", (e) => {resolve(segcheck.includes(e.key)?e.key:"")}));
		console.log(segment);
	}
	return new Promise(resolve => {resolve(segment)});
}

function segment2point(segment){
	if("ib" === segment.slice(1,3)){
		return 50;
	}else if("ob" === segment.slice(1,3)){
		return 50;
	}
	var num = 1*segment.slice(0,2);
	if(isNaN(num)){
		num = 0;
	}
	switch(segment.slice(-1)){
		case "s":
			return num;
		case "d":
			return num*2;
		case "t":
			return num*3;
		default:
			return 0;
	}
}

async function pushed_esc(){
	var result = confirm("Are you sure you want to exit?");
	if(result){
		try{document.getElementsByClassName("game")[0].remove();}catch(err){}
		start_menu();
	}
}

async function keydown(e){
	//console.log(e.key);
	if(""+e.keyCode === "27"){
		pushed_esc();
	}
}

window.addEventListener("load", start_menu);
window.addEventListener("keydown",keydown);
//window.addEventListener('resize', resizeCanvas);
//canvas.addEventListener("mouseup",getMouseXY);