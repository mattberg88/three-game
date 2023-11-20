import { WebGLRenderer, Scene, Vector3, Clock } from 'three'
import SeedScene from './classes/Scene.js'
import Camera from './classes/Camera.js';

const scene = new Scene()
const renderer = new WebGLRenderer({antialias: false})
const camera = new Camera(renderer, false)
const seedScene = new SeedScene(camera)
scene.add(seedScene);
camera.position.set(-1.3,0.8,0);
camera.lookAt(new Vector3(0,1,0));

renderer.setPixelRatio(window.devicePixelRatio);
const onAnimationFrameHandler = (timeStamp) => {
  renderer.render(scene, camera);
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

window.addEventListener('resize', windowResizeHanlder);
window.addEventListener('wheel', function(evt) {
  evt.preventDefault()
  seedScene.wheel.scroll(evt.deltaY/100)
  seedScene.cat.scroll(evt.deltaY/500)
}, { passive: false });

let startVal
window.addEventListener('touchstart', (evt) => {
  evt.preventDefault()
  startVal = getTouches(evt)[0].clientY;
}, { passive: false })

window.addEventListener('touchmove', (evt) => {
  evt.preventDefault()
  const diff = startVal - getTouches(evt)[0].clientY
  startVal = getTouches(evt)[0].clientY;
  seedScene.wheel.scroll(diff/250)
  seedScene.cat.scroll(diff/500)
}, { passive: false });

function getTouches(evt) {
  return evt.touches || evt.originalEvent.touches
}

document.body.style.margin = 0;
document.body.appendChild( renderer.domElement );
