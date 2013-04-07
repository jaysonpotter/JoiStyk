JoiStyk
=======

*View a demo of [JoiStyk](http://projects.jaysonpotter.com/JoiStyk/)!*

Sunday April 6, 2013
* Namespaced this badboy in a self-executing anonymous function. I think it's working out pretty well and makes it easy to extend.
	* JoiStyk.x = Access X position
	* JoiStyk.y = Access Y position
	* JoiStyk.draw = Place in your draw() function to see JoiStyk go!
* Added some more comments and goals

Tuesday March 19, 2013
* JoiStyk demo goes full viewport!!
* cleaned up variable order
* made function names instead of var functions
* general prepping to separate JoyStyk into its own namespace
* need to create utility functions out of the general use functions
	* canvas high DPI scaling 
	* minimalist touch detection
	* getting position of pointer/touch
	* requestAnimationFrame too
* drawings could be their own thang as well

Sunday March 10, 2013 : 
* did a BIT of JSLinting
* changed the follow behavior, now follows the user 1:1 instead of a lag (seemed like a cool idea, but defeated the purpose to the advantage of the joystick following the user)
* changed the basic colors
* added some meta tags with charset and description
* added github fork me ribbon

Saturday March 9, 2013 : 
This is a working prototype of an HTML5 canvas joystick with some key features. 
* Can be used on mouse or touch event driven devices
* JoiStyk is visible when the user is interacting with the canvas, and gone when the user is not
* JoiStyk adjusts to when the user has gone farther than the initial bounds of the pad area.
* Basic output of X and Y coords

Some things I'll be adding to JoiStyk are : 
* plugin-ify-ing JoiStyk
* update output from just text outputs to real returns
* a circular joystick pad collision area in which JoiStyk will be bound to, just a box now
* the ability to use images instead of circles
* color controls

Dropped features :
* add velocity to how JoiStyk follows the pointer
