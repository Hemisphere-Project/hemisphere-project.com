

var mousePoint = view.center;
var colors = ['#363636', '#707070', '#A1A1A1', '#E2E2E2', '#8ACDA3'];
var refSize = new Size(100,100);
var path;
var path1Count = Math.floor(80*((1280*460)/(view.size.width*view.size.height)));
var path2Count = path1Count*4;

var ease = 0.6;//0.6
var tracerPoint = new Point(view.size.width/2,view.size.width/2);
var tracerDest = new Point(view.size.width/2, view.size.height/2);
var tracerSpeed = new Point((tracerDest.x - tracerPoint.x)*ease,(tracerDest.y - tracerPoint.y)*ease);

// amount 
// resize


/*for (var i = 0; i < amount; i++) {
	var rect = new Rectangle([0, 0], [25, 25]);
	rect.center = mousePoint;
	var path = new Path.RoundRectangle(rect, 6);
	path.fillColor = colors[i % 4];
	var scale = (1 - i / amount) * 20;
	path.scale(scale);
}*/


//var children = project.activeLayer.children;

initPath();
//function onMouseMove(event) {
	//drawHemi(event.point)
//}

function onMouseUp(event){
//	refSize.width = refSize.height *= 0.5;
}

/*function onMouseMove(event){
	drawHemi(event.point);
}*/

//var tPath = new Path.Circle(tracerPoint,10);
//tPath.fillColor = 'red';

function initPath(){
	path = new Path();
	path.moveTo([0,0]);
	path.arcTo(new Point(refSize.width/2,refSize.height/2), new Point(0,refSize.height));
	path.closed = true;
	
	path.strokeColor = 'black';
	path.strokeColor.alpha = 0.018;//0.015	
}

function drawHemiR(point){
	
	if(path1Count > 0){
		path1Count--;
	}else if(path1Count == 0){
		refSize.width = refSize.height *= 0.5;
		path.remove();
		initPath();
		
		path1Count--;
	}else if(path2Count > 0){
		path2Count--;
	}else{
		//project.activeLayer.rasterize();
		//project.activeLayer.removeChildren();
		//path1Count = 20;//400
		//path2Count = path1Count*4;
		view.onFrame = null;
		return;	
	}
	
	var refPoint = new Point(Math.floor(point.x/refSize.width)*refSize.width,Math.floor(point.y/refSize.height)*refSize.height);
	
/*	var path = new Path();
	path.strokeColor = 'black';
	path.strokeColor.alpha = 0.02;//0.015
	
	
	path.moveTo(refPoint);
	path.arcTo(new Point(refPoint.x+refSize.width/2,refPoint.y+refSize.height/2), new Point(refPoint.x,refPoint.y+refSize.height));
	path.closed = true;*/
	
	
	path.position = refPoint + path.bounds.size/2;
	
	
	rotateAndDraw(refPoint);
	rotateAndDraw(refPoint);
	rotateAndDraw(refPoint);
	rotateAndDraw(refPoint);

	//rotateAndDraw(refPoint);
	
	////path.remove();
}

function rotateAndDraw(refPoint){
	var angle = 90*Math.floor(Math.random()*4);
	path.rotate(angle,refPoint);
	path.rasterize();
	path.rotate(-angle,refPoint);
}

function drawHemiV(point){
	if(path1Count > 0){
		path1Count--;
	}else if(path1Count == 0){
		refSize.width = refSize.height *= 0.5;
		//path.remove();
		//initPath();
		
		path1Count--;
	}else if(path2Count > 0){
		path2Count--;
	}else{
		//project.activeLayer.rasterize();
		//project.activeLayer.removeChildren();
		//path1Count = 20;//400
		//path2Count = path1Count*4;
		view.onFrame = null;
		return;	
	}
	
	var refPoint = new Point(Math.floor(point.x/refSize.width)*refSize.width,Math.floor(point.y/refSize.height)*refSize.height);
	
	placeAndRotate(refPoint);
	placeAndRotate(refPoint);
	placeAndRotate(refPoint);
	placeAndRotate(refPoint);

	
}

function placeAndRotate(refPoint){
	var path = new Path();
	path.strokeColor = 'black';
	path.strokeColor.alpha = 0.02;//0.015
	
	
	path.moveTo(refPoint);
	path.arcTo(new Point(refPoint.x+refSize.width/2,refPoint.y+refSize.height/2), new Point(refPoint.x,refPoint.y+refSize.height));
	path.closed = true;
	
	
	path.position = refPoint + path.bounds.size/2;
	var angle = 90*Math.floor(Math.random()*4);
	path.rotate(angle,refPoint);
}



//var tracerPath = new Path.Circle(tracerPoint,30);
//tracerPath.fillColor = 'blue';
function onFrame(event) {
	
	moveTracerI();
	//moveTracerII();

	//tracerPath.position = tracerPoint;
	
	//drawHemiR(tracerPoint);
	drawHemiV(tracerPoint);
}

function moveTracerI(){
	
	tracerPoint.x += tracerSpeed.x;
	tracerPoint.y += tracerSpeed.y;
	tracerSpeed.x = (tracerDest.x - tracerPoint.x)*ease;
	tracerSpeed.y = (tracerDest.y - tracerPoint.y)*ease;
	
	var dVect = tracerDest - tracerPoint;
	if(dVect.length < 100){
		var newPoint = Point.random() * view.size;
		var diff = tracerPoint - newPoint;
		tracerDest = newPoint;
	}

}

function moveTracerII(){
	tracerPoint.x += tracerSpeed.x;
	tracerPoint.y += tracerSpeed.y;
	tracerSpeed += (Point.random() - {x:0.5,y:0.5})*10;
	tracerSpeed *= 0.99;
	
	if(tracerPoint.x > view.size.width){
		tracerSpeed.x*=-1;
		tracerPoint.x=view.size.width;
	}else if(tracerPoint.x <0){
		tracerSpeed.x*=-1;
		tracerPoint.x=0;		
	}else if(tracerPoint.y > view.size.height){
		tracerSpeed.y*=-1;
		tracerPoint.y=view.size.height;		
	}else if(tracerPoint.y <0){
		tracerSpeed.y*=-1;
		tracerPoint.y=0;		
	}
	
}

function onResize(event) {}
