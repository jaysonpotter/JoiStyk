window.onload = function () {
    
    var canvas = document.getElementById('JoiStyk'),
        ctx = canvas.getContext('2d');
        
    // START DEMO CONTENT
    var heartProps = {} || heartProps;
        heartProps.x = 135;
        heartProps.y = 100;
        heartProps.w = 50;
        heartProps.h = 50;
    var feedback = function (){
        ctx.font = 'normal 10px Courier';
        ctx.fillStyle = 'rgb(203, 48, 48)';
        ctx.fillText("OUTPUT", 5, 90);
        ctx.fillText("X: " + JoiStyk.x, 5, 100);
        ctx.fillText("Y: " + JoiStyk.y, 5, 110);
    }
    var drawHeart = function (x, y) {
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
    var Hearty = function(){
            
        // This is just to show something move around based on the xy coords of JoiStyk
        heartProps.xSpeed = JoiStyk.x;
        heartProps.ySpeed = JoiStyk.y;
        
        heartProps.x += Math.round((heartProps.xSpeed / 2));
        heartProps.y += Math.round((heartProps.ySpeed / 2));
        
        // messy gross, it's a demo Mkkkrrr
        if(heartProps.x < 0) heartProps.x = 0;
        if(heartProps.y < 0) heartProps.y = 0;
        if((heartProps.x + heartProps.w) > canvas.width) heartProps.x = (canvas.width - heartProps.w);
        if((heartProps.y + heartProps.h) > canvas.height) heartProps.y = (canvas.height - heartProps.h);
        
        drawHeart(heartProps.x, heartProps.y);
    }

    if(canvas && ctx) {
        PopCan.play(canvas, ctx);
        JoiStyk.play({
            canvas: canvas, 
            padsize: 100, 
            padcolor: 'rgb(203, 255, 48)', 
            stickcolor: 'rgb(25, 25, 243)'
        }); // this is how to play with JoiStyk
        PopCan.drawings(JoiStyk.draw, feedback, Hearty);
    }
}