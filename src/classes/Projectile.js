import { Group, BoxGeometry, Mesh, MeshBasicMaterial, Vector3, Raycaster } from 'three';

export default class Projectile extends Group {
  constructor(timeStamp, player, mouse) {
    super();
    const geometry = new BoxGeometry( 0.02, 0.02, 0.02 );
    const material = new MeshBasicMaterial( {color: 'red'} );
    const mesh = new Mesh( geometry, material );
    this.mesh = mesh
    this.mesh.lookAt(new Vector3(mouse.mousePos.x, 0, mouse.mousePos.y))
    this.player = player
    this.time = timeStamp
    this.mesh.position.set(player.position.x, player.position.y, player.position.z)
    this.add(this.mesh)
  }

  update() {
    this.mesh.translateZ(0.05)
  }
}