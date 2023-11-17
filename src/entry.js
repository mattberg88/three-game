import { WebGLRenderer, Scene, Vector3, Clock } from 'three'
import SeedScene from './classes/Scene.js'
import Camera from './classes/Camera.js';

const scene = new Scene()
const renderer = new WebGLRenderer({antialias: false})
const camera = new Camera(renderer, false)
const seedScene = new SeedScene(camera)
const clock = new Clock()
const keys = {
  left: false,
  right: false,
  up: false,
  pause: false,
  pointerLeft: false,
  pointerRight: false,
  pointerClick: false,
  pointerPower: 0,
  pointerPressTime: clock.getElapsedTime()
}

scene.add(seedScene);

camera.position.set(0,3,5);
camera.lookAt(new Vector3(0,1,0));

renderer.setPixelRatio(window.devicePixelRatio);

const onAnimationFrameHandler = (timeStamp) => {
  const deltaTime = clock.getDelta()
  renderer.render(scene, camera);
  seedScene.update(keys, deltaTime);
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
  if(event.keyCode === 80) {
    keys.pause = !keys.pause
  }
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
const pointerdownHandler = (event) => {
  // keys.pointerClick = true
  keys.pointerPressTime = clock.getElapsedTime()
  // keys.pointerClick = true



  const pointerX = event.clientX
  const screenLeft = window.innerWidth/3
  const screenRight = window.innerWidth/3 * 2

  const screenCenter = window.innerWidth/2
  if(pointerX > screenLeft && pointerX < screenRight) {
    keys.pointerClick = true
  }

  if(pointerX < screenLeft){
    keys.pointerLeft = true
  }
  if(pointerX > screenRight){
    keys.pointerRight = true
  }

}

const pointerupHandler = (event) => {
  // if(clock.getElapsedTime()- keys.pointerPressTime < 0.5) {
  //   keys.pointerClick = true
  // }
  keys.pointerLeft = false
  keys.pointerRight = false
  keys.pointerClick = false
}


window.addEventListener('resize', windowResizeHanlder);
window.addEventListener('keydown', keydownHandler);
window.addEventListener('keyup', keyupHandler);
// window.addEventListener('mousemove', mousemoveHandler);
// window.addEventListener('mousedown', pointerdownHandler);
// window.addEventListener('mouseup', pointerupHandler);
window.addEventListener('pointerdown', pointerdownHandler);
window.addEventListener('pointerup', pointerupHandler);



// dom
document.body.style.margin = 0;
document.body.appendChild( renderer.domElement );

