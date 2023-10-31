import { Group, Vector3, Raycaster } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export default class GameObject extends Group {
  constructor(obj) {
    const loader = new GLTFLoader();
    super();
    loader.load(obj, (gltf)=>{
      this.add(gltf.scene);
    });
  }

  update(timeStamp, command, camera) {
  }
}