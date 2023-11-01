import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import {Box, Vec3, Body} from 'cannon-es'

export default class GameObject extends Group {
  constructor(obj, world) {
    const loader = new GLTFLoader();
    super();

    loader.load(obj, (gltf)=>{
      this.mesh = gltf.scene
      this.add(gltf.scene);
      const shape = new Box(new Vec3(2, 1, 2))
      this.body = new Body({ mass: 1 })
      this.body.addShape(shape)
      world.addBody(this.body)
    });


  }
}