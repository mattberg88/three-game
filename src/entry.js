import { WebGLRenderer, PerspectiveCamera, Scene, Vector3, Clock } from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import SeedScene from './classes/Scene.js'
import Camera from './classes/Camera.js';

const scene = new Scene()
const renderer = new WebGLRenderer({antialias: true})
const camera = new Camera(renderer, true)
const vec = new Vector3()
const mousePos = new Vector3()
let mouseClick = false
const seedScene = new SeedScene()
const keys = {
  left: false,
  right: false,
  up: false,
  click: false
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

// const mousemoveHandler = (event) => {
//   vec.set(
//     ( event.clientX / window.innerWidth ) * 2 - 1,
//     - ( event.clientY / window.innerHeight ) * 2 + 1,
//     0.5 );
//   vec.unproject( camera );
//   vec.sub( camera.position ).normalize();
//   const distance = - camera.position.z / vec.z;
//   mousePos.copy( camera.position ).add( vec.multiplyScalar( distance ) );
// }

const mousedownHandler = () => {
  keys.click = true
}

const mouseupHandler = () => {
  keys.click = false
}

window.addEventListener('resize', windowResizeHanlder);
window.addEventListener('keydown', keydownHandler);
window.addEventListener('keyup', keyupHandler);
// window.addEventListener('mousemove', mousemoveHandler);
window.addEventListener('mousedown', mousedownHandler);
window.addEventListener('mouseup', mouseupHandler);
window.addEventListener('pointerdown', mousedownHandler);
window.addEventListener('pointerup', mouseupHandler);



// dom
document.body.style.margin = 0;
document.body.appendChild( renderer.domElement );
