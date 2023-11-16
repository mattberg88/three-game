import { Group, BoxGeometry, Mesh, MeshLambertMaterial, CylinderGeometry } from 'three';
import {Box, Vec3, Body, Material, Cylinder, Quaternion} from 'cannon-es'

export default class Wheel extends Group {
  constructor(world, startPos, startAngle) {
    super();
    const geometry = new CylinderGeometry(1.5, 1.5, 1, 48);
    geometry.rotateX(Math.PI/2)
    const material = new MeshLambertMaterial( { color: 'gray' } );
    const boxMat = new Material('box')
    boxMat.friction = 1
    this.mesh = new Mesh( geometry, material );
    this.shape = new Cylinder(1.5, 1.5, 1, 24)
    this.add(this.mesh)
    this.body = new Body({ mass: 0})
    this.body.addShape(this.shape, new Vec3(0,0,0), new Quaternion().setFromEuler(Math.PI/2 , 0, 0,'XYZ'))

    this.loadObject = this
    if(startPos) this.mesh.position.set(startPos.x, startPos.y, startPos.z)
    if(startAngle) this.mesh.rotation.set(startAngle.x, startAngle.y, startAngle.z)
  }

}