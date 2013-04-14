(function(JoiStyk) {
    'use strict';

    // Add support for dual joysticks
    // Fix when dual fingers are on stage
    // Add support for custom image and/or color
    // Add support for stationary joystick vs the amazing dynamic fantasticaliciousness it is today

    // All the touchy and interactive
    var touchable = typeof (document.ontouchend) !== "undefined",
        tap,
        tapEnd,
        tapMove,
        tapLeave,
        tapCancel,

    // Stores the info about the JoiStyk drawing elements, perhaps padRad and stickRad need to be params for JoiStyk
        padPos,
        stickPos,
        trackPos,
        padRad,
        stickRad,

        canvas,
        ctx;

    // this sets the listener names, kind of an experiment in mouseVStouch and leaner than a trycatch
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
    // END Touch

    // Gets the position of the mouse or single finger
    function getPosition(canvas, evt) {
        evt.preventDefault();
        var rect = canvas.getBoundingClientRect();
        if (touchable) {
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

    function trackTouch() {
        // This moves the pad around with the user, it also updates the stick position
        if ((trackPos.x - stickRad) < (padPos.x - padRad)) {
            padPos.x = (trackPos.x + stickRad);
            stickPos.x = trackPos.x;
        }
        if ((trackPos.x + stickRad) > (padPos.x + padRad)) {
            padPos.x = (trackPos.x - stickRad);
            stickPos.x = trackPos.x;
        }
        if ((trackPos.y - stickRad) < (padPos.y - padRad)) {
            padPos.y = (trackPos.y + stickRad);
            stickPos.y = trackPos.y;
        }
        if ((trackPos.y + stickRad) > (padPos.y + padRad)) {
            padPos.y = (trackPos.y - stickRad);
            stickPos.y = trackPos.y;
        }
    }

    function stickBounds() {
        // This is keeping the stick from leaving the pad area, needs to be updated to stay fixed within the radius instead of a square
        if (stickPos.x < (padPos.x - stickRad)) {
            stickPos.x = (padPos.x - stickRad);
        }
        if (stickPos.x > (padPos.x + stickRad)) {
            stickPos.x = (padPos.x + stickRad);
        }
        if (stickPos.y < (padPos.y - stickRad)) {
            stickPos.y = (padPos.y - stickRad);
        }
        if (stickPos.y > (padPos.y + stickRad)) {
            stickPos.y = (padPos.y + stickRad);
        }
    }

    function outputX() {
        return (stickPos.x - padPos.x);
    }

    function outputY() {
        return (stickPos.y - padPos.y);
    }

    JoiStyk.play = function (yoCanvas, bigness) {
        
        // padRads awesomeness formula just makes sure that the number we work with is an even one, otherwise the output ends up having a .5
        padRad = (bigness - (bigness % 2)) || 60;
        stickRad = (padRad / 2);
        
        canvas = yoCanvas || undefined;
        ctx = canvas.getContext('2d');

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

        canvas.addEventListener(tapEnd, function(evt) {
            stickPos = null;
            padPos = null;
        }, false);
        // END Events
    }

    JoiStyk.draw = function () {
    
        // Checks if there are positions available for the pad and stick
        if (padPos && stickPos && trackPos) {

            trackTouch();
            stickBounds();

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