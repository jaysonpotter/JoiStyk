window.onload = function () {

	// Yes they're global, yes it's gross. A lot is. I'm working on it. This is my playground. Thank you for checking it out

	// All the touchy and interactive
	var try_touch;
	var tap;
	var tapEnd;
	var tapMove;
	var tapLeave;
	var tapCancel;
	
	// If thou hast nay touch thy shall be treated as rattus
	try {
		document.createEvent('TouchEvent');
		try_touch = 1;
	} catch (e) {
		try_touch = 0;
	}
	
	// this sets the listener names, whisper whisper
	if (try_touch === 1) {
		tap = 'touchstart';
		tapEnd = 'touchend';
		tapMove = 'touchmove';
		
		tapCancel = 'touchcancel';
		tapLeave = 'touchleave';
	} else {
		tap = 'mousedown';
		tapEnd = 'mouseup';
		tapMove = 'mousemove';
	}
	// END Detect the touch
	
	// Gets the position of the mouse or single finger
  	var getPosition = function(canvas, evt) {
  		evt.preventDefault();
		var rect = canvas.getBoundingClientRect();
		if(try_touch === 1){
			return {
				// this only tracks a single touch
				x: evt.targetTouches[0].clientX - rect.left,
				y: evt.targetTouches[0].clientY - rect.top
			};
		} else {
			return {
				x: evt.clientX - rect.left,
				y: evt.clientY - rect.top
			};
		}
	}
	
	// Stores the info about the JoiStyk drawing elements
	var padPos;
	var stickPos;
	var trackPos;
	var padRad = 80;
	var stickRad = 40;
	
	// Canvas selection, size, and context
	var canvas = document.getElementById('JoiStyk');
  		canvas.width = 300;
  		canvas.height = 300;
  	// START Events
		canvas.addEventListener(tapMove, function(evt) {
			stickPos = getPosition(canvas, evt);
			trackPos = getPosition(canvas, evt);
		}, false);
		
		canvas.addEventListener(tap, function(evt) {
			padPos = getPosition(canvas, evt);
			stickPos = getPosition(canvas, evt);
			trackPos = getPosition(canvas, evt);
		}, false);
		
		canvas.addEventListener(tapEnd, function(evt){
			stickPos = null;
			padPos = null;
		}, false);
	//END Events
  	var ctx = canvas.getContext('2d');
  	
  	// Pixel density info gathering, or default to 1
  	var pixelRatio = window.devicePixelRatio || 1;
  	var backingStoreRatio = ctx.webkitBackingStorePixelRatio ||
                            ctx.mozBackingStorePixelRatio ||
                            ctx.msBackingStorePixelRatio ||
                            ctx.oBackingStorePixelRatio ||
                            ctx.backingStorePixelRatio || 1;
    var ratio = pixelRatio / backingStoreRatio;
    
    // If there are double or more pixels, scale the drawing times that ratio and stuff it back into the original dimensions
  	if (pixelRatio >= 2) {
  		var oldWidth = canvas.width;
        var oldHeight = canvas.height;

        canvas.width = oldWidth * ratio;
        canvas.height = oldHeight * ratio;

        canvas.style.width = oldWidth + 'px';
        canvas.style.height = oldHeight + 'px';
  		ctx.scale(ratio, ratio);
  	}
	
	// requestAnim shim layer by Paul Irish <- Crafty devil
	window.requestAnimFrame = (function(){
		return window.requestAnimationFrame		  || 
			   window.webkitRequestAnimationFrame || 
			   window.mozRequestAnimationFrame	  || 
			   window.oRequestAnimationFrame	  || 
			   window.msRequestAnimationFrame	  || 
			   function(callback, element){
				   window.setTimeout(callback, 1000 / 60);
			   };
	}()); // <-- tucked in the, as Crockford says it, dog balls
	
	//START Shapes
	var drawJSPad = function() {
		ctx.beginPath();
		ctx.arc(padPos.x, padPos.y, padRad, 0, 2 * Math.PI, false);
		ctx.closePath();
		ctx.fillStyle = 'rgb(203, 48, 48)';
		ctx.fill();
	}
	
	var drawJSStick = function() {
		ctx.beginPath();
		ctx.arc(stickPos.x, stickPos.y, stickRad, 0, 2 * Math.PI, false);
		ctx.closePath();
		ctx.fillStyle = 'rgb(241, 241, 241)';
		ctx.fill();
	}
	
	var feedback = function(){
		ctx.font = 'normal 10px Courier';
		ctx.fillStyle = 'rgb(203, 48, 48)';
		ctx.fillText("INPUT", 5, 10);
		ctx.fillText("Track X: " + trackPos.x + " | Track Y: " + trackPos.y, 5, 20);
		ctx.fillText("Stick X: " + stickPos.x + " | Stick Y: " + stickPos.y, 5, 30);
		ctx.fillText("Pad X:   " + padPos.x + " | Pad Y:   " + padPos.y, 5, 40);
		ctx.fillText("OUTPUT", 5, 90);
		ctx.fillText("X: " + (stickPos.x - padPos.x), 5, 100);
		ctx.fillText("Y: " + (stickPos.y - padPos.y), 5, 110);
	}
	//END Shapes
	
	//START Animation
	function animate() {
 		draw();
		requestAnimFrame( animate );
	}
	
	function draw() {
		// This resets the canvas to draw the next "frame"
		ctx.clearRect(0,0, 300, 300);
		
		// Checks if there are positions available for the pad and stick
		if(padPos && stickPos && trackPos){
		
			// This moves the pad around with the user, it also prevents the stick from some odd behavior. Try commenting out the stickPos updates in this minirithm
			if((trackPos.x - stickRad) < (padPos.x - padRad)){
				padPos.x = (trackPos.x + stickRad);
				stickPos.x = trackPos.x;
			}
			if((trackPos.x + stickRad) > (padPos.x + padRad)){
				padPos.x = (trackPos.x - stickRad);
				stickPos.x = trackPos.x;
			}
			if((trackPos.y - stickRad) < (padPos.y - padRad)){
				padPos.y = (trackPos.y + stickRad);
				stickPos.y = trackPos.y;
			}
			if((trackPos.y + stickRad) > (padPos.y + padRad)){
				padPos.y = (trackPos.y - stickRad);
				stickPos.y = trackPos.y;
			}
			
			// This is keeping the stick from leaving the pad area, needs to be updated to stay fixed within the radius instead of a square
			if(stickPos.x < (padPos.x - stickRad)){
				stickPos.x = (padPos.x - stickRad);
			}
			if(stickPos.x > (padPos.x + stickRad)){
				stickPos.x = (padPos.x + stickRad);
			}
			if(stickPos.y < (padPos.y - stickRad)){
				stickPos.y = (padPos.y - stickRad);
			}
			if(stickPos.y > (padPos.y + stickRad)){
				stickPos.y = (padPos.y + stickRad);
			}
			
			drawJSPad();
			drawJSStick();
			feedback();
			
		}
		
	}
	
  	if(canvas && ctx) {	
	 	animate();
	}
}