import { WebGLRenderer, PerspectiveCamera, Scene, Vector3 } from 'three'
import SeedScene from './objects/Scene.js'

const scene = new Scene()
const camera = new PerspectiveCamera()
const renderer = new WebGLRenderer({antialias: true})
const seedScene = new SeedScene()
let command = 0
const vec = new Vector3()
const mousePos = new Vector3()
let mouseClick = false

scene.add(seedScene);

camera.position.set(0,3,-3);
camera.lookAt(new Vector3(0,0,0));

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0x7ec0ee, 1);

const onAnimationFrameHandler = (timeStamp) => {
  renderer.render(scene, camera);
  seedScene.update && seedScene.update(timeStamp, command, mousePos, mouseClick);
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
  command = event.which
}

const keyupHandler = (event) => {
  if(command === event.which) {
    command = 0
  }
}

const mousemoveHandler = (event) => {
  vec.set(
    ( event.clientX / window.innerWidth ) * 2 - 1,
    - ( event.clientY / window.innerHeight ) * 2 + 1,
    0.5 );
  vec.unproject( camera );
  vec.sub( camera.position ).normalize();
  const distance = - camera.position.z / vec.z;
  mousePos.copy( camera.position ).add( vec.multiplyScalar( distance ) );
}

const mousedownHandler = (event) => {
  mouseClick = true
}

window.addEventListener('resize', windowResizeHanlder);
window.addEventListener('keydown', keydownHandler);
window.addEventListener('keyup', keyupHandler);
window.addEventListener('mousemove', mousemoveHandler);
window.addEventListener('mousedown', mousedownHandler);



// dom
document.body.style.margin = 0;
document.body.appendChild( renderer.domElement );
