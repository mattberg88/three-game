import { Group, BoxGeometry, Mesh, MeshBasicMaterial, Vector3, Raycaster } from 'three';
import {Box, Vec3, Body} from 'cannon-es'

export default class Projectile extends Group {
  constructor(world, player, mouse) {
    super();
    const geometry = new BoxGeometry( 0.04, 0.04, 0.04 );
    const material = new MeshBasicMaterial( {color: 'red'} );
    const mesh = new Mesh( geometry, material );
    this.mesh = mesh
    this.player = player
    this.time = world.time
    const shape = new Box(new Vec3(0.04, 0.04, 0.04))
    this.body = new Body({ mass: 0, collisionFilterGroup: 4, collisionFilterMask: 2})
    this.body.addShape(shape)
    this.mesh.position.copy(player.position)
    // this.mesh.quaternion.copy(player.quaternion)
    this.mesh.lookAt(mouse.mousePos)

    this.body.position.copy(player.position)
    this.body.quaternion.copy(this.player.quaternion)

    this.add(this.mesh)
    world.addBody(this.body)
  }

  update(world) {
    if((world.time - this.time) > 0.4) {
      this.removeFromParent()
    } else {
      this.mesh.position.copy(this.body.position)
      this.mesh.quaternion.copy(this.body.quaternion)
      this.mesh.translateZ(0.1)
      this.body.position.copy(this.mesh.position)
    }
  }
}