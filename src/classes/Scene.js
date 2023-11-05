import { Group, Vector3 } from 'three';
import {World, Vec3} from 'cannon-es'
import Projectile from './Projectile.js';
import BasicLights from './Lights.js';
import Character from './Character.js'
import Land from './Land';
import { movePlayer } from '../utils/controls.js';

export default class SeedScene extends Group {
  constructor() {
    super();
    this.world = new World({ gravity: new Vec3(0, -9.82, 0) })
    const landObj = new Land(this.world)
    const lights = new BasicLights();
    this.player = new Character(this.world, 'blue', new Vector3(0,0.1,0), 1|2, 0)
    // turn player 180
    // this.player.body.quaternion.setFromEuler(0, 3.14, 0)
    this.enemy1 = new Character(this.world, 'red', new Vector3(-0.4,0.05,0), 1|2|4, 1)
    this.enemy2 = new Character(this.world, 'red', new Vector3(0,1,0), 1|2|4, 1)
    this.enemy3 = new Character(this.world, 'red', new Vector3(0.4,0.05,0), 1|2|4, 1)
    this.updateList = [this.enemy1, this.enemy2, this.enemy3]
    this.shotArray = []
    this.add(landObj, lights, this.player, this.enemy1, this.enemy2, this.enemy3);

  }

  update(command, mouse, camera) {
    movePlayer(command, this.player)
      // case('a'): return this.body.quaternion.setFromEuler(0, angleY += 0.02, 0)
      // case('d'): return this.body.quaternion.setFromEuler(0, angleY -= 0.02, 0)

    this.world.fixedStep()
    this.updateList.forEach(o => {
      o.update(this.world)
    })

    // this.player.updatePlayer(mouse)
    camera.position.set(this.player.mesh.position.x, this.player.mesh.position.y+3, this.player.mesh.position.z+4)
    if(mouse.mouseClick) {
      const shoot = new Projectile(this.world, this.player.mesh, mouse)
      this.updateList.push(shoot)
      this.add(shoot)
    }
  }
}