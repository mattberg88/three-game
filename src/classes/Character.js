import { Group, BoxGeometry, Mesh, MeshBasicMaterial, Vector3 } from 'three';
import {Box, Vec3, Body} from 'cannon-es'

export default class Character extends Group {
  constructor(world, color, startPos, collisionFilterMask, mass) {
    super();
    const geometry = new BoxGeometry( 0.2, 0.2, 0.2 );
    const material = new MeshBasicMaterial( {color} );
    const mesh = new Mesh( geometry, material );
    this.mesh = mesh
    this.body = new Body({ mass, collisionFilterGroup: 2, collisionFilterMask})
    const shape = new Box(new Vec3(0.15, 0.15, 0.15))
    this.body.addShape(shape)
    this.add(this.mesh)
    world.addBody(this.body)
    this.setPosition(startPos)
  }

  setPosition(pos) {
    this.body.position.set(pos.x, pos.y, pos.z)
    this.mesh.position.set(pos.x, pos.y, pos.z)
  }

  update(world) {
    this.mesh.position.copy(this.body.position)
    this.mesh.quaternion.copy(this.body.quaternion)
  }

  updatePlayer(mouse) {
    // this.mesh.position.copy(this.body.position)
    // this.mesh.quaternion.copy(this.body.quaternion)
    // this.mesh.lookAt(new Vector3(mouse.mousePos.x, 0, -mouse.mousePos.y))

  }
}