import { Group, BoxGeometry, Mesh, MeshLambertMaterial } from 'three';
import {Box, Vec3, Body, Material} from 'cannon-es'

export default class BoxObject extends Group {
  constructor(world, startPos, startAngle) {
    super();
    const geometry = new BoxGeometry(1, 1, 1);
    const material = new MeshLambertMaterial( { color: 'gray' } );
    const boxMat = new Material('box')
    boxMat.friction = 1
    this.mesh = new Mesh( geometry, material );
    this.shape = new Box(new Vec3(0.5,0.5,0.5))
    this.add(this.mesh)
    this.loadObject = this
    if(startPos) this.mesh.position.set(startPos.x, startPos.y, startPos.z)
    if(startAngle) this.mesh.rotation.set(startAngle.x, startAngle.y, startAngle.z)
  }

}