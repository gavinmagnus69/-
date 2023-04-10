/*

canvas_TunnelLayer.width
*/

/*

	function drawOnlyFireballPixel(x_PixelRelativeToCoordinatesOfEdgeRelativeToTheCentreOfTheBall, y_PixelRelativeToCoordinatesOfEdgeRelativeToTheCentreOfTheBall, R_Pixel, G_Pixel, B_Pixel, Alpha_Pixel){
        fireballImageData.data[(fireballImageDataWidth * y_PixelRelativeToCoordinatesOfEdgeRelativeToTheCentreOfTheBall + x_PixelRelativeToCoordinatesOfEdgeRelativeToTheCentreOfTheBall) * 4] = R_Pixel;
        fireballImageData.data[(fireballImageDataWidth * y_PixelRelativeToCoordinatesOfEdgeRelativeToTheCentreOfTheBall + x_PixelRelativeToCoordinatesOfEdgeRelativeToTheCentreOfTheBall) * 4 + 1] = G_Pixel;
        fireballImageData.data[(fireballImageDataWidth * y_PixelRelativeToCoordinatesOfEdgeRelativeToTheCentreOfTheBall + x_PixelRelativeToCoordinatesOfEdgeRelativeToTheCentreOfTheBall) * 4 + 2] = B_Pixel;
        fireballImageData.data[(fireballImageDataWidth * y_PixelRelativeToCoordinatesOfEdgeRelativeToTheCentreOfTheBall + x_PixelRelativeToCoordinatesOfEdgeRelativeToTheCentreOfTheBall) * 4 + 3] = Alpha_Pixel;
    }










*/








//console.log(tunnel_2dMap);








// var canvas_TunnelLayer = document.getElementById('tunnel-layer'),
	// ctx_TunnelLayer = canvas_TunnelLayer.getContext("2d");

// var canvas_MapLayer = document.getElementById('map-layer'),
// 	ctx_MapLayer = canvas_MapLayer.getContext("2d");

// var canvas_MapLayerObstacles = document.getElementById('map-layer-obstacles'),
// 	ctx_MapLayerObstacles = canvas_MapLayer.getContext("2d");
var interval;
var killed = false;

var zam = false;
var loop = false;
var firstTime = false;

var hasKey = false;
var hasHAAGaLA = false;
var hasREGEXBOOK = false;


var room = document.getElementById('MC');
var MC = document.getElementById('MC');



var width = 1920;
var height = 1080;
var screenWidth = document.body.clientWidth;
console.log(screenWidth);
var screenSizeRatio = /*0.9 * */width / screenWidth;


function onloadDoc(){
	screenWidth = document.body.clientWidth;
	console.log(screenWidth);
	screenSizeRatio = width / screenWidth;
}


var currentRoom = 0;



const player = {
	x: 200,
	y: 200,
	z: 0,
	alpha: Math. PI / 180 * 60,
	betta: Math. PI / 180 * 0,
	moveSpeedX: 9,
	moveSpeedY: 9,
	moveSpeedZ: 9,
	rotationSpeedAlpha: Math. PI / 180 * 3,
	rotationSpeedBetta: Math. PI / 180 * 3,

	FOV_w : Math.PI / 1.8, // /3*2	
	// FOV_v :  2 * Math.atan(canvas_TunnelLayer.height / canvas_TunnelLayer.width * Math.tan(Math.PI / 1.8 / 2)),

	//deltaFOV_w : (this.FOV_w / 1000), //0.001
	deltaFOV_w : Math.PI / 1.8 / 2000, //0.001
	rayCastSpeed : 0.1,
	visionDistance : 300,



	width: 50,
	length: 75,
	shLength: 50,

	moveRotate : function(){
		// let prev = [this.x, this.y, this.z, this.alpha, this.betta];
		let prev = [this.x, this.y, this.alpha];
		//console.log(prev);
		if(rightPressed){
			this.alpha -= this.rotationSpeedAlpha /* * deltaTime */;
		}
		if(leftPressed){
			this.alpha += this.rotationSpeedAlpha /* * deltaTime */;

			// console.log("wefwe");
		}



		if(upPressed){
			this.z += Math.sin(this.betta) * this.moveSpeedZ;
			this.y += Math.cos(this.betta) * Math.cos(this.alpha) * this.moveSpeedY /* * deltaTime */;
			this.x += Math.cos(this.betta) * Math.sin(this.alpha) * this.moveSpeedX /* * deltaTime */;
			// console.log("UP");

		}
		if(downPressed){
			this.z -= Math.sin(this.betta) * this.moveSpeedZ;
			this.y -= Math.cos(this.betta) * Math.cos(this.alpha) * this.moveSpeedY /* * deltaTime */;
			this.x -= Math.cos(this.betta) * Math.sin(this.alpha) * this.moveSpeedX /* * deltaTime */;

		}

		//console.log(prev);
		[this.x, this.y] = [this.x * screenSizeRatio, this.y * screenSizeRatio];

		console.log(Math.floor(this.y + 50), Math.floor(this.x + 50), screenSizeRatio);
		
		let state = tunnel_2dMap[currentRoom][Math.floor(this.y + 50)][Math.floor(this.x + 50/* / 10*/)];
		if(state == 1 ||state > 2 && state < 100 /*"#"*/){
			[this.x, this.y, this.alpha] = prev;
			[this.x, this.y] = [this.x * screenSizeRatio, this.y * screenSizeRatio];

			// console.log("111111");
		//}else if(state == 2){
		}else{

			//to take and talk
			if(state == 3 && currentRoom == 1){
				hasHAAGaLA = true;
			}else if(currentRoom == 2){
				// if(hasKey){//slaunikov will give the key
					
				// }
			}






			//to walk
			if(state == "room-0"){
				[this.x, this.y, this.alpha] = [150, 450, 0];
				currentRoom = 0;
				document.getElementById('room').src = "room-0.png";
				console.log("no whoop(");
			}else{
				// if(currentRoom == 0){
				// if(state == "room-1" || 
				// 	state == "room-2" ||
				// 	state == "room-3" ||
				// 	state == "room-4" ||
				// 	state == "room-1" ||
				// 	state == "room-1" ){

					// if(!loop){
					// 	alert('К. Меня вызывает директор, нужно к нему. Его кабинет находится в конце коридора');
					// 	if(this.y < 500){
					// 		this.y += 50;
					// 	}else{
					// 		this.y -= 50;
					// 	}
					// }else{

						if(state == "agala"){
							alert('Пара по АГИЛе\n\
Комедия в одном действии\n\
\
Действующие лица:\n\
Кривников - преподаватель АГИЛы\n\
Студенты\n\
\n\
Действие первое.  \n\
Явление первое.\n\
Аудитория 312 четвертого корпуса БГУИР. Студенты сидят. Входит Кривников.\n\
Кривников. Добрый день. Извините за задержку. Я вам отсылал на почту домашнее задание(сегодня в час ночи). Вашей группе надо было сделать 2 задания. Получили задания?\n\
Какой-то студент кивает головой.\n\
Кривников. Ну хорошо. Скажите, стоит ли разбирать их на доске или, может быть, разберем устно?\n\
Все молчат.\n\
Кривников. Давайте разберем устно.\n\
Далее 20 минут Кривников разговаривает сам с собой. Параллельно несколько раз произнося одно слово. СЛАУ. Проносится небольшой смешок.\n\
\n\
Явление второе. \n\
Кривников. Давайте теперь приступим к новой теме. <Имя старосты группы>, назначьте дежурного.\n\
Староста назначает дежурного(в 1 группе все хотят назначить Анну Аксенову). Дежурный моет доску. \n\
Кривников. Запишем новую тему.\n\
Записывает новую тему, параграф и условие задачи. Далее что-то говорит про задачу.\n\
Кривников. Может, кто-то хочет пойти к доске?\n\
(Далее обычно никто не хочет. Но есть маленький шанс, что кто-то выйдет сам.\n\
Предположим, что так и было в этой пьесе .)\n\
Студент поднимает руку и выходит. Студент  решает задачу. Кривников комментирует каждое дейтсвие. Упоминает СЛАУ. В аудитории вновь поднимается смех.\n\
Студент садится. Кривников вызывает дежурного.\n\
Далее действие повторяется (обычно 2 раза).\n\
\n\
Явление третье.\n\
Кривников. Запишите, пожалуйста, домашнее задание. И давайте приступим к проверке дз на сегодня.\n\
Все быстро встают из-за парт и занимают очередь. Кривников спрашивает количество решенных задач из дз и дополнительных задач. Ставит плюсики.\n\
Занавес.\n\
Автор - человек с темным жрецом на аватарке');
							hasHAAGaLA = true;
				[this.x, this.y, this.alpha] = [150, 450, 0];

						}

						if(state == "room-1" && hasKey){
							[this.x, this.y, this.alpha] = [930, 150, 0];

							currentRoom = 1;
							document.getElementById('room').src = "room-1.png";
						}else if(state == "room-1" && !hasKey ){
							alert('Г. Не думаю, что в этом есть смысл');

							// [this.x, this.y, this.alpha] = prev;
							// [this.x, this.y] = [this.x * screenSizeRatio, this.y * screenSizeRatio];
							if(this.y < 500){
							this.y += 50;
						}else{
							this.y -= 50;
						}

						}
						if(state == "room-2"){
							[this.x, this.y, this.alpha] = [400, 500, 0];
							currentRoom = 2;
							document.getElementById('room').src = "supermegafinal.png";
							alert('Г. Привет, Слауников.\n\
С. Привет. Что надо?\n\
Г. Ну как бы тебе сказать. Меня вот директор убил.\n\
С. А я сам умер.\n\
Г. Я серьезно, он меня убил, потом я возродился в коридоре. Вот');
								if (zam){
									console.log('Г. Еще и зам наш та еще тварь, но речь не про него');
								}
								alert('С. Все это звучит сомнительно. Но я готов тебе поверить, \n\
если сможешь правильно посчитать определитель третьего порядка');	
								var matrix = [];
								for (var i = 0; i < 3; i++) {
								  var row = [];
								  for (var j = 0; j < 3; j++) {
									row.push(Math.floor((Math.random()) * 5));
								  }
								  matrix.push(row);
								}


								out = ''
								for (let i = 0; i < 3; i++)
								{
									for (let j = 0; j < 3; j++)
									{
										out += matrix[i][j] + ' ';
									}
									out += '\n'
								}

								ans = matrix[0][0]*(matrix[1][1]*matrix[2][2] - matrix[1][2]*matrix[2][1])
									  - matrix[0][1]*(matrix[1][0]*matrix[2][2] - matrix[1][2]*matrix[2][0])
									  + matrix[0][2]*(matrix[1][0]*matrix[2][1] - matrix[1][1]*matrix[2][0]);
									  console.log(ans);

								let input = prompt(out);
								while (isNaN(input))
								{
									input = prompt(out);
									console.log(input);
								}
								if (input == ans)
								{
									alert('С. Ну что ж я готов тебе помочь. Держи ключ. Теперь иди в свой кабинет, \n\
											там находится сейф, в котором лежит дз по учебной дисциплине "АГиЛА".\n\
												К. А как мне это поможет?\n\
												С. Без понятия. Возьми эту тетрадку и победи директора.');
									hasKey = true;
								}

						}
						if(state == "room-3"){
							[this.x, this.y, this.alpha] = [400, 500, 0];
							currentRoom = 3;
							document.getElementById('room').src = "zamdirectora.png";
						}
						if(state == "room-4"){
							[this.x, this.y, this.alpha] = [400, 500, 0];
							currentRoom = 4;
							document.getElementById('room').src = "enemiesoffice.png";
						}


					// }
				// }
				
				if(state == "room-5"){
					[this.x, this.y, this.alpha] = [400, 500, 0];
					currentRoom = 5;

					if(!loop){
						
						// loop = true;
						firstTime  = true;
						document.getElementById('room').src = "room-5.png";
						if(hasHAAGaLA){
							alert('К. Директор, я принес вам кое-что важное');
							alert('Д отвлекается на дз по агиле, К убивает Д');
							alert("Game Over! Ви перемогли!")
						}else{ alert('К. Здравствуйте, я немного задержался.\n\
								Д. Ну что ж. Это уже ваши проблемы.');}
						console.log("whoop!-whoop!");
						killed = true;
					}

					/*document.getElementById('room').src = "room-5.png";
					console.log("whoop!-whoop!");
					killed = true;*/
			// 		clearInterval(interval);

			// document.getElementById('dead').style.display = "block";
			// document.getElementById('MC').src = "bloody-puddle.png";

			// setTimeout(intervalStart(), 10000);
				}
				if(state == "exit"){
					killed = true;
				}
			}

			
		}

		//}
		[this.x, this.y] = [(this.x) / screenSizeRatio, (this.y) / screenSizeRatio];
		MC.style.position = "relative";//
		MC.style.left = this.x + 'px';
		MC.style.top = this.y + 'px';
		//MC.style.rotate = this.alpha + "";

		let deg = -this.alpha / 3.14 * 180 + 180;
		// MC.style.webkitTransform = "rotate(" + 180 + ")";
		MC.style.webkitTransform = 'rotate('+deg+'deg)'; 
	    MC.style.mozTransform    = 'rotate('+deg+'deg)'; 
	    MC.style.msTransform     = 'rotate('+deg+'deg)'; 
	    MC.style.oTransform      = 'rotate('+deg+'deg)'; 
	    MC.style.transform       = 'rotate('+deg+'deg)'; 
		// MC.style.webkitTransform = "rotate(" + this.alpha + ")";
		//console.log(this.x + " " + this.y + " " + this.z);





		if(killed){
			clearInterval(interval);
			// document.getElementById('room').src = "room-5.png";
			document.getElementById('dead').style.display = "block";
			document.getElementById('MC').src = "bloody-puddle.png";

			setTimeout(intervalStart, 5000);
		}
	}
}



const display = {

	width : 1920,
	height : 1080,
	distance : 1920 / (Math.tan(player.FOV_w / 2)), //more than 20
	//distance : 50, //more than 20
//1732

	translate: function(x, y){
		return [this.width / 2 + x, this.height / 2 - y];
	}
};


function drawLine(xStart, yStart, xEnd, yEnd, R_Pixel, G_Pixel, B_Pixel, A_Pixel){
	
	let dx = xEnd - xStart;
	let dy = yEnd - yStart;
	let steps = Math.max(Math.abs(dx), Math.abs(dy));
	let ddx = dx / steps;
	let ddy = dy / steps;
	for(let i = 0; i <= steps; i++){
		//putPixel(displayTunnelLayerImageData, Math.round(xStart), Math.round(yStart), R_Pixel, G_Pixel, B_Pixel, A_Pixel);
		xStart += ddx;
		yStart += ddy;

	}

	//putPixel(displayTunnelLayerImageData, j, i, 255, 255, 255, 255);

}







var tunnel_2dMap = [];
for(let room = 0; room < 10; room++){
	tunnel_2dMap[room] = [];
	for(let i = 0; i < height; i++){
		tunnel_2dMap[room][i] = [];
		//tunnel_2dMap[room][i].length = 100;
		for(let j = 0; j < width; j++){
			
			// if(room == 0){
			// 	if(i < 100 || j < 100 || j >= width - 300 || i >= height - 200){
			// 		tunnel_2dMap[room][i][j] = 1;
			// 	}
			// 	if(i >= height - 200 && j >= 200 && j < 400){
			// 		tunnel_2dMap[room][i][j] = 2;
			// 	}
			// }


//corridor
			if(room == 0){
				//walls
				if((i < 134 && (j < 356 || (j > 467 && j < 1297) || j > 1404)) || (( i > 134 && i < 475) && j < 86) || ((i > 594 && i < 985 ) && j < 86) ||
					(i > 985 && (j < 383 || (j > 469 && j < 1323 ) || j > 1401)) || ((i > 134 && i < 470) && j > 1824) || ((i > 566 && i < 986) && j > 1824)){
					tunnel_2dMap[room][i][j] = 1;
				}
				//doors
				
				if(j >= 1150 && j <= 1250 && i <= 134){
					//vice headmasters door
					tunnel_2dMap[room][i][j] = "room-3";
				}
 
				if(j <= 86 && i >= 475 && i <= 594){
					//exit door
					tunnel_2dMap[room][i][j] = "exit";
				}
				if( i < 150 && j >= 320 && j <= 430){
					//friend door
					tunnel_2dMap[room][i][j] = "room-2";
				}
				if(i > 850){
					if(j >= 1200 && j <= 1300){
						//evil persons door
						tunnel_2dMap[room][i][j] = "room-4";
					}else if(j >= 350 && j <= 460){
						//gg door
						tunnel_2dMap[room][i][j] = "room-1";
					}else{
						tunnel_2dMap[room][i][j] = 1;

					}
				}
				if(j >= 1624){
					if( i >= 470 && i <= 566){
						tunnel_2dMap[room][i][j] = "room-5";
					}else{
						tunnel_2dMap[room][i][j] = 1;
					}
				}
			}



//main characters office
			if(room == 1){
				//door
				if(j>=800&&j<=957&&i<=131){
					tunnel_2dMap[room][i][j] = "room-0";
 
				}
				//walls
				if(((i<125)&&(j<857||j>957))||((i>125&&i<955)&&(j<105||j>1800))||i>955){
					tunnel_2dMap[room][i][j] = 1;
				}
				//safe
				if(j>120&&j<320&&i>211&&i<321){
					tunnel_2dMap[room][i][j] = "agala";
				}
				//desk and chair
				if(j>820&&j<1020&&i>722&&i<908){
					tunnel_2dMap[room][i][j] = "key";
				}
			}

//head masters office or any other room
			if(room > 1){
				if(i < 165 || i > 916){
					//wall
					tunnel_2dMap[room][i][j] = 1;
				}
				if((i <= 441 || i >= 620 && i <= 916 ) && j < 405){
				//wall
					tunnel_2dMap[room][i][j] = 1;
				}

				if(i > 600 || i < 450){
					tunnel_2dMap[room][i][j] = 1;

				}

				if(i > 420 && i < 650 && j < 305){
					//door
					tunnel_2dMap[room][i][j] = "room-0";
				}
				
				//desk
				if(j >= 603 && j <= 1700 && i > 165 && i < 405 ){
					tunnel_2dMap[room][i][j] = 1;
				}
 
 
 
			}


		}
	}
}



















var rightPressed = false,
	leftPressed = false,
	upPressed = false,
	downPressed = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);



function keyUpHandler(e) {
	let rightButton = false;
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
        rightButton = true;
    }
    if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
        rightButton = true;
    }
    if(e.key == "Down" || e.key == "ArrowDown") {
        downPressed = false;
        rightButton = true;
    }
    if(e.key == "Up" || e.key == "ArrowUp") {
        upPressed = false;
        rightButton = true;
    }
	if(rightButton){
		e.preventDefault();
    }
}



function keyDownHandler(e) {
	let rightButton = false;
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
        rightButton = true;
    }
    if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
        rightButton = true;
    }
    if(e.key == "Down" || e.key == "ArrowDown") {
        downPressed = true;
        rightButton = true;
    }
    if(e.key == "Up" || e.key == "ArrowUp") {
        upPressed = true;
        rightButton = true;
    }
    if(rightButton){
    	e.preventDefault();
    }
}






let time0 = Date.now();
let time1 = Date.now();
function renderTunnel() {
	time1 = Date.now();
	// console.log("time for 1 render + draw: " + (time1 - time0));
	time0 = Date.now();


	player.moveRotate();






/*
	for(let i = 0; i < displayHeight; i++){
		for(let j = 0; j < displayWidth; j++){
			displayImageData.data[(displayWidth * i + j) * 4] = 255;
			displayImageData.data[(displayWidth * i + j) * 4 + 1] = 0;
			displayImageData.data[(displayWidth * i + j) * 4 + 2] = 255;
			displayImageData.data[(displayWidth * i + j) * 4 + 3] = 255;
		}
	}
	ctx_TunnelLayer.putImageData(displayImageData, 0, 0);
*/

}




//drawMapWalls();
// setTimeout(changeBackGround(), 5000, "room-0.png");
//interval = setInterval(renderTunnel, 10);
function intervalStart(){

	currentRoom = 0;
	killed = false;
	hasHAAGaLA = false;
	hasREGEXBOOK = false;
	player.y = 500;
	player.x = 250;
	upPressed = false;
	downPressed = false;
	leftPressed = false;
	rifhtPressed = false;
	loop = true;
	document.getElementById('dead').style.display = "none";
	document.getElementById('MC').src = "MC.png";
	document.getElementById('room').src = "room-0.png";
	if(firstTime){
		alert('Г. Что это сейчас было? Он же меня только что убил.\n\
				Г. Почему я еще жив? Надо поспрашивать людей.');
		firstTime = false;
	}
	interval = setInterval(renderTunnel, 10);
}
intervalStart();
// function changeBackGround(backGroundFile){
// 	document.getElementById("map-layer").style.backgroundImage = "url(" + backGroundFile + ")";
// }