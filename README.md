# Three Game

A simple game made with [Three.js](https://github.com/mrdoob/three.js) and [Cannon](https://github.com/pmndrs/cannon-es) limited to a single tap/click for control

Working demo > https://three-game.vercel.app/

## Install and Run
To install packages run: `npm i`.
To start server run: `npm start`.

## Building the project for the web
Once you are happy with your project you'll be sure to want to show it off. Running `npm run build` in terminal will bundle your project into the folder `./build/`. You can upload this directory to a web server. For more complex results read [this guide](https://webpack.js.org/guides/production/).

## TODO List
#### Coding:
- enable deltaTime to have consistent speed across platforms
- make "grounded" boolean for when ground is under cat
- enable pausing game
- make a score display
- make high score functionality
- change cat angle when on a slope
- arc cat when jumping

#### 3D art:
- add backdrop
- create original cat and animations
- make actual obstacles

#### Maybe features?
- follow cat on y axis to enable climbing