import { PerspectiveCamera } from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export default class Camera extends PerspectiveCamera {
  constructor(renderer, orbit) {
    super();
    if(orbit) {
      const controls = new OrbitControls( this, renderer.domElement );
      controls.target.set( 0, 0.5, 0 );
      controls.update();
      controls.enablePan = false;
      controls.enableDamping = true;
    }

  }
}