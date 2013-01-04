

var mousePoint = view.center;
var colors = ['#363636', '#707070', '#A1A1A1', '#E2E2E2', '#8ACDA3'];
var refSize = new Size(100,100);
var path;
var path1Count = 400;
var path2Count = path1Count*4;

var ease = 0.4;//0.6
var tracerPoint = new Point(0,0);
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



//var tPath = new Path.Circle(tracerPoint,10);
//tPath.fillColor = 'red';

function initPath(){
	path = new Path();
	path.moveTo([0,0]);
	path.arcTo(new Point(refSize.width/2,refSize.height/2), new Point(0,refSize.height));
	path.closed = true;
	
	path.strokeColor = 'black';
	path.strokeColor.alpha = 0.03;//0.015	
}

function drawHemi(point){
	
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
		view.onFrame = null;
		return;	
	}
	
	var refPoint = new Point(Math.floor(point.x/refSize.width)*refSize.width,Math.floor(point.y/refSize.height)*refSize.height);
	//var path = new Path();
	//path.selected = true;
	
	path.position = refPoint + path.bounds.size/2;
	
	//path.strokeColor = 'black';
	//path.strokeColor.alpha = 0.03;//0.015
	
	
	//path.moveTo(refPoint);
	//path.arcTo(new Point(refPoint.x+refSize.width/2,refPoint.y+refSize.height/2), new Point(refPoint.x,refPoint.y+refSize.height));
	//path.closed = true;
	
	//tPath.position = refPoint;
	var angle = 90*Math.floor(Math.random()*4);
	path.rotate(angle,refPoint);
	path.rasterize();
	path.rotate(-angle,refPoint);
	////path.remove();
	//path.removeSegments();
}


//var tracerPath = new Path.Circle(tracerPoint,30);
//tracerPath.fillColor = 'blue';
function onFrame(event) {
	
	tracerPoint.x += tracerSpeed.x;
	tracerPoint.y += tracerSpeed.y;
	tracerSpeed.x = (tracerDest.x - tracerPoint.x)*ease;
	tracerSpeed.y = (tracerDest.y - tracerPoint.y)*ease;
	
	var dVect = tracerDest - tracerPoint;
	if(dVect.length < 6){
		var newPoint = Point.random() * view.size;
		var diff = tracerPoint - newPoint;
		// to be improved
		//while( diff.length > 150){
		//	newPoint = Point.random() * view.size;
		//	diff = tracerPoint - newPoint;
		//}
		tracerDest = newPoint;
	}
	//tracerPath.position = tracerPoint;
	drawHemi(tracerPoint);
}

function onResize(event) {}
