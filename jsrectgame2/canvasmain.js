canvas = document.getElementById('canvas');
ctx = canvas.getContext('2d');

var littleRect = {																						//遊戲方塊
	
	width: 50,
	x: Math.floor(Math.random()*10 + 1),                  												 //方塊當前所在的格子（初始位置隨機，隨機數永遠小於1所以此處不會大於10）
	y: Math.floor(Math.random()*10 + 1),
	r: 0,																								//方塊旋轉量(初始向下）
	
	draw: function() {
	  ctx.save();
	  ctx.translate(this.x*this.width + this.width/2, this.y*this.width + this.width/2);                  //將坐標移動至需要繪製的方塊中心
	  ctx.rotate(this.r);																				  //旋轉坐標
	  var lingrad = ctx.createLinearGradient(-this.width/2, -this.width/2, -this.width/2, this.width/2);  //因為坐標原點位於中心，所以方塊需要從 -長度／2 位置開始著色
	  lingrad.addColorStop(0, 'red');						  
	  lingrad.addColorStop(0.8, 'red');
	  lingrad.addColorStop(0.8, 'blue')
	  lingrad.addColorStop(1, 'blue');																	   //分段上色，始終點相同顏色來取消漸變
	  ctx.fillStyle = lingrad;
	  ctx.fillRect(-this.width/2, -this.width/2, this.width, this.width);                                  //因為坐標原點位於中心，所以方塊需要從 -長度／2 位置開始繪製
	  ctx.restore();
	 }
};

rectWidth = 50;      //單格尺寸
rectNumber = 11;     //總格數（序號佔位一個格子！）
lineWidth = 2;       //網格線條寬
fontSize = 20;       //序號字體大小
font = fontSize.toString() + "px" + " PingFang-TC"; //序號字體
var animation; 
endPointX = 0;     	//终点X坐标
endPointY = 0; 		//终点Y坐标
endPointR = 0;		//终点角度
offsetX = 0;		//offset x per frame
offsetY = 0;		//offset y per frame
offsetR = 0;		//offset r per frame
FPS = 60;			//frames per second
duration = 1;		//动画时长
currentFrame = 0;   //frame计数器


littleRect.width = rectWidth;

function drawPanel(){				//畫出表格
	 
	for (var v=0;v<rectNumber;v++) {                  //網格垂直方向線條
		if(v<10) {                         //繪出水平方向序號
			ctx.font = font;
			ctx.fillText(v+1, rectWidth*(v+1) + rectWidth/2 - fontSize/2, rectWidth/2);        
		}
		ctx.strokeStyle = (v==0 || v==10) ? '#000': '#AAA';                           //邊框醒目顏色
		drawLine(rectWidth*(v+1), rectWidth, rectWidth*(v+1), rectWidth*rectNumber);
	}
	
	for (var h=0;h<rectNumber;h++) {               //網格水平方向線條
		if(h<10) {                          //繪出垂直方向序號
			ctx.font = font;
			ctx.fillText(h+1, rectWidth/2 - fontSize/2, rectWidth*(h+1) + rectWidth/2);        
		}
		ctx.strokeStyle = (h==0 || h==10) ? '#000': '#AAA';                            //邊框醒目顏色
		drawLine(rectWidth, rectWidth*(h+1), rectWidth*rectNumber,  rectWidth*(h+1));
	}
}

function drawLine(originX, originY, endX, endY) {    //單線條繪製

		ctx.lineWidth = lineWidth;  
		ctx.lineJoin = 'round';      
		ctx.beginPath();
		ctx.moveTo(originX, originY);
		ctx.lineTo(endX, endY);
		ctx.stroke();
}

function moveLittleRectToPos(x, y, r) { 				//移動方塊至指定格指定角度

	offsetX = (x - littleRect.x)/(FPS*duration);
	offsetY = (y - littleRect.y)/(FPS*duration);
	offsetR = (r - littleRect.r)/(FPS*duration);
	
	endPointR = r;
	endPointX = x;
	endPointY = y;
	
	animation = setInterval(function() { draw(); }, 1000 / FPS); //開始動畫
}


function draw() {
	ctx.clearRect(0,0, canvas.width, canvas.height);
	drawPanel();
	littleRect.x += offsetX;
	littleRect.y += offsetY;
	littleRect.r += offsetR;
	littleRect.draw();
	if(currentFrame >= FPS*duration) {
		clearInterval(animation);   //動畫結束
		currentFrame = 0;
		littleRect.x = endPointX;                      //修正最终位置，60帧无法整除的情况。
		littleRect.y = endPointY;
		littleRect.r = endPointR;
		ctx.clearRect(0,0, canvas.width, canvas.height);
		drawPanel();
		littleRect.draw();
	}else{
		currentFrame += 1;
		}
}

function buttonClicked() {
	
	var command = document.getElementById("command").value;
	command = command.toUpperCase();
	
	switch (command) {
		
		case 'TRA LEF':
			moveLittleRectToPos(littleRect.x - 1 >= 1 ? littleRect.x - 1 : littleRect.x, littleRect.y, littleRect.r);
		break;
		
		case 'TRA RIG':
			moveLittleRectToPos(littleRect.x + 1 <= 10 ? littleRect.x + 1 : littleRect.x, littleRect.y, littleRect.r);
		break;
		
		case 'TRA BOT':
			moveLittleRectToPos(littleRect.x, littleRect.y + 1 <= 10 ? littleRect.y + 1 : littleRect.y, littleRect.r); 
		break;
		
		case 'TRA TOP':
			moveLittleRectToPos(littleRect.x, littleRect.y - 1 >= 1 ? littleRect.y - 1 : littleRect.y, littleRect.r);
		break;
		
		case 'MOV LEF':
			moveLittleRectToPos(littleRect.x - 1 >= 1 ? littleRect.x - 1 : littleRect.x, littleRect.y, Math.PI/2);
		break;
		
		case 'MOV TOP':
			moveLittleRectToPos(littleRect.x, littleRect.y - 1 >= 1 ? littleRect.y - 1 : littleRect.y, Math.PI);
		break;
		
		case 'MOV RIG':
			moveLittleRectToPos(littleRect.x + 1 <= 10 ? littleRect.x + 1 : littleRect.x, littleRect.y, -Math.PI/2);
		break;
		
		case 'MOV BOT':
			moveLittleRectToPos(littleRect.x, littleRect.y + 1 <= 10 ? littleRect.y + 1 : littleRect.y, 0); 
		break;
		
		default:
		break;
	}

}

function init() {
		endPointX = littleRect.x;
		endPointY = littleRect.y;
		endPointR = littleRect.r;
       draw();         
}
