JoiStyk
=======

JoiStyk is a joystick for the canvas element. Use it for anything canvas and where you need x/y output.

* Author: Jayson Potter (c) 2013
* License: CC BY-SA 3.0


## Demo

*View a demo of [JoiStyk](http://projects.jaysonpotter.com/JoiStyk/)!*


## Feature Overview

- draws a single "smart" joystick to the canvas element of your choosing
- JoiStyk only appears when you need it. Draws and sends output only when the user touches the canvas.
- JoiStyk follows the user instead of restricting usage area to just one place
- supports custom sizes and colors
- supports touch and mouse interfaces


# How to use JoiStyk

Add the following in your canvas applications init function; make sure to reference your canvas element:

```javascript
JoiStyk.play({canvas: canvas});
```

And make sure to place the following into your drawing function:
```javascript
JoiStyk.draw();
```

## JoiStyk Options
The color values you can use are the same as in CSS: hex codes, rgb(), rgba(), and hsla()

```javascript
JoiStyk.play({
	canvas: canvas,                     // required
	padsize: 100,	                    // optional
	padcolor: 'rgba(0,0,0,0.5)',        // optional
	stickcolor: 'rgba(255,255,255,1)'   // optional
});
```
