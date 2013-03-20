window.onload = function () {

	// Yes they're global, yes it's gross. A lot is. I'm working on it. This is my playground. Thank you for checking it out

	// All the touchy and interactive
	var touchable = 'ontouchend' in document,
		tap,
		tapEnd,
		tapMove,
		tapLeave,
		tapCancel;
		
	// Stores the info about the JoiStyk drawing elements, perhaps padRad and stickRad need to be params for JoiStyk
	var padPos,
		stickPos,
		trackPos,
		padRad = 80,
		stickRad = 40;
	
	// Canvas selection, size, and context
	var canvas = document.getElementById('JoiStyk'),
		ctx = canvas.getContext('2d');
  		canvas.width = window.innerWidth;
  		canvas.height = window.innerHeight;
  	
  	// store initial canvas size to use when scaling the canvas for high dpi
  	var baseWidth = canvas.width,
        baseHeight = canvas.height;
  	
  	// Pixel density info gathering, or default to 1
  	var pixelRatio = window.devicePixelRatio || 1;
  	var backingStoreRatio = ctx.webkitBackingStorePixelRatio ||
                            ctx.mozBackingStorePixelRatio ||
                            ctx.msBackingStorePixelRatio ||
                            ctx.oBackingStorePixelRatio ||
                            ctx.backingStorePixelRatio || 1;
    var ratio = pixelRatio / backingStoreRatio;
    
    // this is just to set some values to access and add to later in the drawing, yes gross variables
	var heartProps = {} || heartProps;
		heartProps.x = 50;
		heartProps.y = 50;
	
	// this sets the listener names, whisper whisper
	if (touchable) {
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
  	function getPosition(canvas, evt) {
  		evt.preventDefault();
		var rect = canvas.getBoundingClientRect();
		if(touchable){
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
    
    // If there are double or more pixels, scale the drawing times that ratio and stuff it back into the original dimensions
    // needs to be smarter like change on device orientation change and desktop resize
  	if (pixelRatio > 1) {
        canvas.width = baseWidth * ratio;
        canvas.height = baseHeight * ratio;
        canvas.style.width = baseWidth + 'px';
        canvas.style.height = baseHeight + 'px';
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
	function drawJSPad() {
		ctx.beginPath();
		ctx.arc(padPos.x, padPos.y, padRad, 0, 2 * Math.PI, false);
		ctx.closePath();
		ctx.fillStyle = 'rgb(203, 48, 48)';
		ctx.fill();
	}
	
	function drawJSStick() {
		ctx.beginPath();
		ctx.arc(stickPos.x, stickPos.y, stickRad, 0, 2 * Math.PI, false);
		ctx.closePath();
		ctx.fillStyle = 'rgb(241, 241, 241)';
		ctx.fill();
	}
	
	function feedback(){
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
	
	function drawHeart(x, y) {
		ctx.beginPath();
		ctx.moveTo(x + 40.0, y + 10.0);
		ctx.lineTo(x + 40.0, y + 0.0);
		ctx.lineTo(x + 30.0, y + 0.0);
		ctx.lineTo(x + 30.0, y + 10.0);
		ctx.lineTo(x + 20.0, y + 10.0);
		ctx.lineTo(x + 20.0, y + 0.0);
		ctx.lineTo(x + 10.0, y + 0.0);
		ctx.lineTo(x + 10.0, y + 10.0);
		ctx.lineTo(x + 0.0, y + 10.0);
		ctx.lineTo(x + 0.0, y + 20.0);
		ctx.lineTo(x + 0.0, y + 30.0);
		ctx.lineTo(x + 10.0, y + 30.0);
		ctx.lineTo(x + 10.0, y + 40.0);
		ctx.lineTo(x + 20.0, y + 40.0);
		ctx.lineTo(x + 20.0, y + 50.0);
		ctx.lineTo(x + 30.0, y + 50.0);
		ctx.lineTo(x + 30.0, y + 40.0);
		ctx.lineTo(x + 40.0, y + 40.0);
		ctx.lineTo(x + 40.0, y + 30.0);
		ctx.lineTo(x + 50.0, y + 30.0);
		ctx.lineTo(x + 50.0, y + 20.0);
		ctx.lineTo(x + 50.0, y + 10.0);
		ctx.lineTo(x + 40.0, y + 10.0);
		ctx.closePath();
		ctx.fillStyle = "rgb(203, 48, 48)";
		ctx.fill();
	}
	//END Shapes
	
	function trackTouch(){
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
	}
	
	function joiStykBounds(){
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
	}
	
	//START Animation
	function animate() {
 		draw();
		requestAnimFrame( animate );
	}
	
	function clearCanvas(){
		// This resets the canvas to draw the next "frame"
		ctx.clearRect(0,0, canvas.width, canvas.height);
	}
	
	function draw() {
		
		clearCanvas();
		
		// Checks if there are positions available for the pad and stick
		if(padPos && stickPos && trackPos){
			
			trackTouch();
			joiStykBounds();
			
			drawJSPad();
			drawJSStick();
			//feedback();
	    	
	    	// This is just to show something move around based on the xy coords of the joystick
			heartProps.xSpeed = (stickPos.x - padPos.x);
			heartProps.ySpeed = (stickPos.y - padPos.y);
			
			heartProps.x += (heartProps.xSpeed / 2.8);
	    	heartProps.y += (heartProps.ySpeed / 2.8);
	    	
	    	// messy gross presuptuous, needs to work better with high density, is moving across double the canvas so this needs some iffys
	    	if(heartProps.x < -50) heartProps.x = baseWidth;
			if(heartProps.y < -50) heartProps.y = baseHeight;
			if(heartProps.x > baseWidth) heartProps.x = -50;
			if(heartProps.y > baseHeight) heartProps.y = -50;
			
		}
		
		drawHeart(heartProps.x, heartProps.y);
		
	}
	
  	if(canvas && ctx) {	
	 	animate();
	}
}