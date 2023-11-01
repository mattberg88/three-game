import { Group } from 'three';
import {Box, Vec3, Body} from 'cannon-es'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import LAND from '../assets/Land.glb';

export default class Land extends Group {
  constructor(world) {
    const loader = new GLTFLoader();
    super();
    loader.load(LAND, (gltf)=>{
      this.mesh = gltf.scene
      this.add(gltf.scene);
      const shape = new Box(new Vec3(10, 0, 10))
      this.body = new Body({ mass: 0 })
      this.body.addShape(shape)
      world.addBody(this.body)
    });


  }
}