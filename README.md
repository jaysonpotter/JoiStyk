JoiStyk
=======

JoiStyk is a joystick for the canvas element. Use it for anything canvas and where you need x/y output.

* Author: Jayson Potter (c) 2013
* License: CC BY-SA 3.0


## Demo

*View a demo of [JoiStyk](http://projects.jaysonpotter.com/JoiStyk/)!*


## Feature Overview

- draws a single "smart" joystick to the canvas element of your choosing
- JoiStyk only comes around when you need it. Draws and sends output only when and where the user touches the canvas.
- JoiStyk follows the user instead of restricting usage area to just one place
- supports custom sizes
- supports touch and pointer interfaces


# How to use JoiStyk

```html
<canvas id="JoiStyk">
	<p>Awe Snap! Your browser does not support canvas, thus not able to support JoiStyk.</p>
	<p>For that I am sorry, but you may be in luck by upgrading your browser.</p>
	<a href="http://www.updatebrowser.net/">UpdateBrowser.net</a>
</canvas>
```

```javascript
window.onload = function () {
    
    // canvas selection, size, and context
    var canvas = document.getElementById('JoiStyk'),
        ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    
    // hearty position defaults
    var heartProps = {} || heartProps;
        heartProps.x = 50;
        heartProps.y = 50;

    // START Shapes
    var feedback = function(){
        ctx.font = 'normal 10px Courier';
        ctx.fillStyle = 'rgb(203, 48, 48)';
        ctx.fillText("OUTPUT", 5, 90);
        ctx.fillText("X: " + JoiStyk.x, 5, 100);
        ctx.fillText("Y: " + JoiStyk.y, 5, 110);
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
    // END Shapes
    
    // Shape tapped into JoiStyk.x and JoiStyk.y
    var Hearty = function(){
            
        // movement based on JoiStyk.x and JoiStyk.y
        heartProps.xSpeed = JoiStyk.x;
        heartProps.ySpeed = JoiStyk.y;
        
        heartProps.x += Math.round((heartProps.xSpeed / 2.8));
        heartProps.y += Math.round((heartProps.ySpeed / 2.8));
        
        // messy gross presuptuous, just don't do this. It's a demo for crying out loud.
        if(heartProps.x < -50) heartProps.x = canvas.width;
        if(heartProps.y < -50) heartProps.y = canvas.height;
        if(heartProps.x > canvas.width) heartProps.x = -50;
        if(heartProps.y > canvas.height) heartProps.y = -50;
        
        drawHeart(heartProps.x, heartProps.y);
    }
    
    function clearCanvas(){
        ctx.clearRect(0,0, canvas.width, canvas.height);
    }
    
    function draw() {
        clearCanvas();
        
        // add JoiStyk.draw() to your draw loop
        JoiStyk.draw();
        
        // just to show you feedback and drawing movement
        feedback();
        Hearty();
        
    }
    
    // animation loop
    function animate() {
        draw();
        requestAnimFrame( animate );
    }
    
    if(canvas && ctx) { 
        animate();
        
        // make sure to tell JoiStyk where to play before you spark your animation loop
        JoiStyk.play(canvas, 99);
    }
}
```
