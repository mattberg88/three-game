import { Group, BoxGeometry, Mesh, MeshLambertMaterial, CylinderGeometry } from 'three';
import {Box, Vec3, Body, Material, Cylinder, Quaternion} from 'cannon-es'

export default class Wheel extends Group {
  constructor(startPos, startAngle) {
    super();
    const geometry = new CylinderGeometry(1.5, 1.5, 1, 48);
    geometry.rotateX(Math.PI/2)
    const material = new MeshLambertMaterial( { color: 'gray' } );
    this.mesh = new Mesh( geometry, material );
    this.add(this.mesh)

    this.loadObject = this
    if(startPos) this.mesh.position.set(startPos.x, startPos.y, startPos.z)
    if(startAngle) this.mesh.rotation.set(startAngle.x, startAngle.y, startAngle.z)
  }
  scroll(ydiff) {
    console.log('wheel', ydiff)
    this.mesh.rotation.set(0, 0, -ydiff/100)
  }
}