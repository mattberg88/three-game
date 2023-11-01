import { Group, BoxGeometry, Mesh, MeshBasicMaterial, Vector3, Raycaster } from 'three';
import {Box, Vec3, Body} from 'cannon-es'

export default class Projectile extends Group {
  constructor(time, player, mouse) {
    super();
    const geometry = new BoxGeometry( 0.04, 0.04, 0.04 );
    const material = new MeshBasicMaterial( {color: 'red'} );
    const mesh = new Mesh( geometry, material );
    this.mesh = mesh
    this.mesh.lookAt(new Vector3(mouse.mousePos.x, 0, mouse.mousePos.y))
    this.player = player
    this.time = time
    this.body = new Body({ mass: 0})
    this.body.quaternion.copy(this.mesh.quaternion)
    this.body.position.set(player.position.x, player.position.y, player.position.z)

    this.add(this.mesh)
  }
  startPhysics(world) {
    const shape = new Box(new Vec3(0.02, 0.02, 0.02))
    this.body.addShape(shape)
    world.addBody(this.body)
  }
  update(time) {
    if((time - this.time) > 0.2) {
      this.removeFromParent()
    } else {
      this.mesh.position.copy(this.body.position)
      this.mesh.quaternion.copy(this.body.quaternion)
      this.mesh.translateZ(0.2)
      this.body.position.copy(this.mesh.position)
    }
  }
}