# Ping vs. Pong
**By: Kenneth Lin**
***********************

## Overview: 

Pong with curves! For this project, I used HTML5 canvas, Javascript, and **the power of math** to create the physics and game logic.

The ball will curve up or down at different velocities depending on how you hit it with your paddle. This allows for some pretty crazy volleys once the speed picks up. Trick shots and mind games galore!

**Play it here:** 

(URL)

## Controls: 

Player 1: UP, DOWN

Player 2: W, S

## Features: 

* 2 paddles!
* 1 ball!
* So many curves!
* 60 FPS!
* No friends? No problem! Play vs. AI!
* Action! Excitement!! Explosions!!! (no not really..)

## Technologies Used: 

**Languages:** 
* Javascript
* HTML
* CSS

**Libraries:** 
* jQuery

**Website Hosting:** 
* Firebase

**Tools:** 
* Git/GitHub
* Sublime Text 3
* Trello

**Resources:** 
* https://developer.mozilla.org/en-US/docs/Games/Anatomy
* https://developer.mozilla.org/en-US/docs/Web/API/Performance/
* http://www.w3schools.com/graphics/game_intro.asp
* http://www.gameplaypassion.com/blog/how-to-handle-keyboard-input-like-a-boss-mootools/

*************************
## Notes: 

- Explanation of why I chose window.performance.now();
https://developer.mozilla.org/en-US/docs/Web/API/Performance/

- Adding paddle UP/DOWN movement was easy.
- Adding wall bounce logic was easy.
- Need to add paddle upper-half & lower-half collision animation.
- Not sure how to implement paddle LEFT/RIGHT action.
- Collision detection: "too precise to collide" try using hitbox or ray-casting
- Added curve by changing the speed of y (rate of change).
- Curves supposed to mimick forehand/backhand swing by a table tennis player.
- Need to add sounds. If I include bg music, should also include mute toggle.
- Put entirety of app in single canvas? Issues: rendering UI constantly. Workaround: two canvases, one for menu, one for game. then swap. but at that point, might as well just use a div and manipulate DOM.
- music, sounds, fonts, and images are all open source.
- adding ball trail in the future: http://rectangleworld.com/blog/archives/tag/fading

*************************
**Known Bugs:** 

1. If ball.speed is too high, it will not collide with paddle and go through it. Caused by framerate OR poor hitbox detection. Potential fix: adjust hitboxes OR add raycasting.

2. **FIXED** If ball collides with top/bottom wall at certain angle, it will get 'stuck' in the wall. Fixed by checking if ball.position.y is beyond top/bottom wall. If it is, then 'nudge' ball.position.y a few pixels within than top/bottom edge. 

3. **FIXED** KeyDown is attached to entire window... pressing UP/DOWN will scroll entire window.  BUT using "e.preventDefault();" prevents ANY shortcuts, like cmd+R to refresh, from working at all. Need to find better solution using FOCUS. EDIT: Fixed by just attaching event handlers to app.canvas instead of window. Then gave app.canvas focus.

***************************
### ![](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png) 

Project 1 - Submitted by Kenneth Lin on MM:DD:YYYY.
