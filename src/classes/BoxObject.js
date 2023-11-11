import { Group, BoxGeometry, Mesh, MeshLambertMaterial } from 'three';
import {Box, Vec3, Body, Material} from 'cannon-es'

export default class BoxObject extends Group {
  constructor(world, startPos) {
    super();
    const geometry = new BoxGeometry(1, 1, 1);
    const material = new MeshLambertMaterial( { color: 'gray' } );
    const boxMat = new Material('box')
    boxMat.friction = 1
    this.mesh = new Mesh( geometry, material );
    this.body = new Body({ mass: 0, material: boxMat, position: startPos})
    const shape = new Box(new Vec3(0.5,0.5,0.5))
    this.body.addShape(shape)
    this.add(this.mesh)
    world.addBody(this.body)
    this.setPosition(startPos)
  }

  setPosition(pos) {
    this.body.position.set(pos.x, pos.y, pos.z)
    this.mesh.position.set(pos.x, pos.y, pos.z)
  }
  copyMeshToBody() {
    this.body.position.copy(this.mesh.position)
    this.body.quaternion.copy(this.mesh.quaternion)
  }

  update() {
    this.mesh.translateX(-0.05)
    this.copyMeshToBody()
  }
}