import { Group, Vector3 } from 'three';
import {World, Vec3} from 'cannon-es'
import BasicLights from './Lights.js';
import LevelGenerator from './LevelGenerator.js';
import CannonDebugger from 'cannon-es-debugger'
import PlayerSphere from './PlayerSphere.js';

export default class SeedScene extends Group {
  constructor() {
    super();
    this.world = new World({ gravity: new Vec3(0, -9.82, 0) })
    this.cannonDebugger = new CannonDebugger(this, this.world, {})
    const lights = new BasicLights();

    this.level = new LevelGenerator(this.world)
    this.player = new PlayerSphere(this.world, new Vector3(0,1,0), 1)

    this.updateList = [this.level]
    this.add(this.level, lights, this.player);
  }
  resetGame() {
    this.player.removePlayer()
    this.level.removeAll()
    this.player = new PlayerSphere(this.world, new Vector3(0,1,0), 1)
    this.level = new LevelGenerator(this.world)
    this.updateList = [this.level]
    this.add(this.level, this.player)
  }

  update(command) {
    if(this.player.mesh.position.y < -5 || this.player.mesh.position.x < -10) {
      this.resetGame()
    }
    this.player.movePlayer(command)
    this.cannonDebugger.update()
    this.world.fixedStep()
    this.updateList.forEach(o => {
      o.update(this.world)
    })
    if(this.player.mesh) {
      this.player.update()
    }
  }
}