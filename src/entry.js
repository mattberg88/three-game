import { WebGLRenderer, PerspectiveCamera, Scene, Vector3, Clock } from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import SeedScene from './classes/Scene.js'
import Camera from './classes/Camera.js';

const scene = new Scene()
const renderer = new WebGLRenderer({antialias: true})
const camera = new Camera(renderer, false)
let mouseClick = false
const seedScene = new SeedScene()
const keys = {
  left: false,
  right: false,
  up: false
}

scene.add(seedScene);
camera.position.set(0,3,4);
camera.lookAt(new Vector3(0,0,0));
renderer.setPixelRatio(window.devicePixelRatio);

const onAnimationFrameHandler = (timeStamp) => {
  renderer.render(scene, camera);
  seedScene.update(keys);
  mouseClick = false
  window.requestAnimationFrame(onAnimationFrameHandler);
}
window.requestAnimationFrame(onAnimationFrameHandler);

const windowResizeHanlder = () => {
  const { innerHeight, innerWidth } = window;
  renderer.setSize(innerWidth, innerHeight);
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
};
windowResizeHanlder();

const keydownHandler = (event) => {
  if(event.keyCode === 68) {
    keys.right = true
  }
  if(event.keyCode === 65) {
    keys.left = true
  }
  if(event.keyCode === 32) {
    keys.up = true
  }
}

const keyupHandler = (event) => {
  if(event.keyCode === 68) {
    keys.right = false
  }
  if(event.keyCode === 65) {
    keys.left = false
  }
  if(event.keyCode === 32) {
    keys.up = false
  }
}

window.addEventListener('resize', windowResizeHanlder);
window.addEventListener('keydown', keydownHandler);
window.addEventListener('keyup', keyupHandler);

document.body.style.margin = 0;
document.body.appendChild( renderer.domElement );
