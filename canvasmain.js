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
directionIndex = 0;   //方向，0下，1左，2上，3右。

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

function moveLittleRectToPos(x, y) { 				//移動方塊至指定格
	littleRect.x = x;
	littleRect.y = y;
	draw();
}

function rotateLittleRectBy(r) {					//旋轉方塊
	
	var directionIndexOffset = r*2/Math.PI;			//只有90 180 －90三個旋轉角度選項，因此directionIndexOffset取值只可能為1，－1，2
	directionIndex += directionIndexOffset;         //計算當前方向
	
	if (directionIndex < 0) {                       //保証方向介於0～3
		directionIndex = directionIndex + 4;
	}
	
	if (directionIndex > 3) {
		directionIndex = directionIndex - 4;
	}
	
	littleRect.r += r;
	draw();
}

function draw() {
	ctx.clearRect(0,0, canvas.width, canvas.height);
	drawPanel();
	littleRect.draw();
}

function buttonClicked() {
	
	var command = document.getElementById("command").value;
	command = command.toUpperCase();
	
	switch (command) {
		
		case 'TUN LEF':
			rotateLittleRectBy(Math.PI/2);
		break;
		
		case 'TUN RIG':
			rotateLittleRectBy(-Math.PI/2);
		break;
		
		case 'TUN BAC':
			rotateLittleRectBy(Math.PI);
		break;
		
		case 'GO':
			switch (directionIndex) {
				case 0:                                //方向為下時
					moveLittleRectToPos(littleRect.x, littleRect.y + 1 <= 10 ? littleRect.y + 1 : littleRect.y);  //大於10則不移動
				break;
				
				case 1:									//方向為左時
					moveLittleRectToPos(littleRect.x - 1 >= 1 ? littleRect.x - 1 : littleRect.x, littleRect.y);
				break;
														
				case 2:									 //方向為上時
					moveLittleRectToPos(littleRect.x, littleRect.y - 1 >= 1 ? littleRect.y - 1 : littleRect.y);
				break;
				
				case 3:							//方向為右時
					moveLittleRectToPos(littleRect.x + 1 <= 10 ? littleRect.x + 1 : littleRect.x, littleRect.y);
				break;
				
				default:
				break;
			}
		break;
		
		default:
		break;
	}

}

function init() {
       draw();         
}
