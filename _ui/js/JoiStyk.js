(function(JoiStyk) {
    'use strict';

    var touchable = typeof (document.ontouchend) !== "undefined",
        touches = [],
        touchChange = [],
        isFirstTouch,
        tap,
        tapEnd,
        tapMove,
        tapLeave,
        tapCancel,

        padPos,
        stickPos,
        padRad,
        stickRad,

        canvas,
        ctx,
        
        option = option || {};

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

    function getPosition(canvas, evt) {
        evt.preventDefault();
        var rect = canvas.getBoundingClientRect();
        if (touchable) {
            return {
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

    function drawJSPad() {
        ctx.beginPath();
        ctx.arc(padPos.x, padPos.y, padRad, 0, 2 * Math.PI, false);
        ctx.closePath();
        ctx.fillStyle = option.padcolor || 'rgb(31, 31, 31)';
        ctx.fill();
    }

    function drawJSStick() {
        ctx.beginPath();
        ctx.arc(stickPos.x, stickPos.y, stickRad, 0, 2 * Math.PI, false);
        ctx.closePath();
        ctx.fillStyle = option.stickcolor || 'rgb(241, 241, 241)';
        ctx.fill();
    }

    function calcDist(pointOne, pointTwo){
        var distX = pointOne.x - pointTwo.x,                           // x axis diff
            distY = pointOne.y - pointTwo.y,                           // y axis diff 
            dist = Math.round(Math.sqrt( distX*distX + distY*distY )); // pythagorean theorem, shave the decimal
        return dist;
    }

    function followPad() {
        if ((stickPos.x - stickRad) < (padPos.x - padRad)) {
            padPos.x = (stickPos.x + stickRad);
        }
        if ((stickPos.x + stickRad) > (padPos.x + padRad)) {
            padPos.x = (stickPos.x - stickRad);
        }
        if ((stickPos.y - stickRad) < (padPos.y - padRad)) {
            padPos.y = (stickPos.y + stickRad);
        }
        if ((stickPos.y + stickRad) > (padPos.y + padRad)) {
            padPos.y = (stickPos.y - stickRad);
        }
        
    }
    
    function JoiStykStart(evt) {
        if(touchable){
            touches = evt.touches;
            touchChange = evt.changedTouches;
            isFirstTouch = (touches[0].identifier === touchChange[0].identifier);
        }
        if (isFirstTouch || !touchable){
            padPos = getPosition(canvas, evt);
            stickPos = getPosition(canvas, evt);
        }
    }
    
    function JoiStykMove(evt) {
        stickPos = getPosition(canvas, evt);
    }
    
    function JoiStykEnd(evt) {
        if(touchable){
            touches = evt.touches;
        }
        if (touches.length === 0 || !touchable){
            stickPos = null;
            padPos = null;
        }
    }

    function outputX() {
        return (stickPos.x - padPos.x);
    }

    function outputY() {
        return (stickPos.y - padPos.y);
    }
    
    JoiStyk.debug = {
        showOptions: function(){
            return option;
        },
        showDistance: function(){
            calcDist(stickPos, padPos);
        }
    }

    JoiStyk.play = function (options) {
        option = options;
        padRad = (option.padsize - (option.padsize % 2)) || 60;
        stickRad = (padRad / 2);
        canvas = option.canvas;
        ctx = canvas.getContext('2d');

        canvas.addEventListener(tapMove, JoiStykMove, false);
        canvas.addEventListener(tap, JoiStykStart, false);
        canvas.addEventListener(tapEnd, JoiStykEnd, false);
    }

    JoiStyk.draw = function () {

        if (padPos && stickPos) {
            followPad();
            drawJSPad();
            drawJSStick();

            JoiStyk.x = outputX();
            JoiStyk.y = outputY();
        } else {
            JoiStyk.x = 0;
            JoiStyk.y = 0;
        }
    }

}(window.JoiStyk = window.JoiStyk || {}));