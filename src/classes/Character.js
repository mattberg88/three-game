import { Group, BoxGeometry, Mesh, MeshBasicMaterial } from 'three';
import {Box, Vec3, Body} from 'cannon-es'

export default class Character extends Group {
  constructor(color) {
    super();
    const geometry = new BoxGeometry( 0.1, 0.1, 0.1 );
    const material = new MeshBasicMaterial( {color} );
    const mesh = new Mesh( geometry, material );
    this.mesh = mesh
    this.body = new Body({ mass: 1 })
    this.add(this.mesh)
  }

  startPhysics(world) {
    const shape = new Box(new Vec3(0.1, 0.1, 0.1))
    this.body.addShape(shape)
    world.addBody(this.body)

  }
  setPosition(pos) {
    this.body.position.set(pos.x, pos.y, pos.z)
    this.mesh.position.set(pos.x, pos.y, pos.z)
  }
}