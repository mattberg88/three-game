import { Group, SphereGeometry, MeshPhongMaterial, Mesh } from 'three';
import {Sphere, Material, Body, Vec3} from 'cannon-es'

export default class PlayerSphere extends Group {
  constructor(world, startPos, mass) {
    super();
    const geometry = new SphereGeometry( 0.15, 32, 16 );
    const material = new MeshPhongMaterial( { color: 'gray' } );
    const ballMaterial = new Material('ground')
    ballMaterial.friction = 1
    this.jumping = false
    this.mesh = new Mesh( geometry, material );
    this.body = new Body({ mass, material: ballMaterial, position: startPos})
    const shape = new Sphere(0.15)
    this.body.addShape(shape)
    this.add(this.mesh)
    this.world = world
    this.world.addBody(this.body)
    this.setPosition(startPos)
    this.body.addEventListener('collide', (e) => {
      const contactVector = e.contact.rj
      if(contactVector.y > 0) {
        this.jumping = false

      }
    })
  }

  setPosition(pos) {
    this.body.position.set(pos.x, pos.y, pos.z)
    this.mesh.position.set(pos.x, pos.y, pos.z)
  }
  movePlayer(command) {
    switch(command) {
      case(32):  {
        if(!this.jumping) this.body.applyImpulse(new Vec3(0,3,0))
        this.jumping = true
        return
      }
    }
  }
  removePlayer() {
    this.remove(this.mesh)
    this.world.removeBody(this.body)
  }
  update() {
    this.mesh.position.copy(this.body.position)
    this.mesh.quaternion.copy(this.body.quaternion)
  }

}