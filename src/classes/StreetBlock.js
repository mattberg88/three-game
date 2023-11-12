import { Group, BoxGeometry, Mesh, MeshLambertMaterial } from 'three';
import {Box, Vec3, Body, Material} from 'cannon-es'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import STREET from '../assets/StreetBlock.glb'

export default class StreetBlock extends Group {
  constructor(world, startPos, startAngle) {
    const loader = new GLTFLoader()
    super();
    loader.load(STREET, (gltf) => {
      this.mesh = gltf.scene
      // var newMaterial = new MeshPhongMaterial({color: 0x444444});
      //this.mesh.material = newMaterial
      this.mesh.scale.set(0.01,0.01,0.01)
      const streetMat = new Material('street')
      streetMat.friction = 1
      this.body = new Body({ mass: 0, material: streetMat, position: startPos})
      this.shape = new Box(new Vec3(0.5,0.5,0.5))
      this.body.quaternion.copy(this.mesh.quaternion)
      this.body.addShape(this.shape, new Vec3(0.1, 0.15, 0))
      this.add(this.mesh);
      this.world = world
      this.world.addBody(this.body)
    })
    if(startPos && this.mesh) this.mesh.position.set(startPos.x, startPos.y, startPos.z)
    if(startAngle && this.mesh) this.mesh.rotation.set(startAngle.x, startAngle.y, startAngle.z)
  }
}