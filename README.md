# Ping vs. Pong
**By: Kenneth Lin**
***********************
***********************

## Overview: 
***********************

60fps Pong with curves! I based my project on the classic arcade game Pong. In both sports and competitive gaming, balance is crucial in order for competitors to demonstrate skill - and to me, Pong represents the earliest iteration of that idea. I used HTML canvas and Javascript to create and render the physics and game logic. 

**Check it out here!** 

(URL)

## Controls:
***********************
Player 1: UP, DOWN

Player 2: W, S

## Features:
***********************
* 2 paddles!
* 1 ball!
* So many curves!
* 60 FPS!
* No friends? No problem! Play vs. AI!
* Action! Excitement!! Explosions!!! (no not really..)

## Technologies Used: 
***********************
**Languages:** 
* Javascript
* HTML
* CSS

**Website Hosting:** 
* Firebase

**Tools:** 
* Git/GitHub
* Sublime Text 3
* Trello


## Notes:
***********************
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

*************************
**Known Bugs:** 
1. If ball.speed is too high, it will not collide with paddle and go through it. Caused by framerate OR poor hitbox detection. Potential fix: adjust hitboxes OR add raycasting.
2. **FIXED** If ball collides with top/bottom wall at certain angle, it will get 'stuck' in the wall. Fixed by checking if ball.position.y is beyond top/bottom wall. If it is, then set ball.position.y at a bit lower than top/bottom edge.

***************************
### ![](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png) 

Project 1 - Submitted by Kenneth Lin on MM:DD:YYYY.
