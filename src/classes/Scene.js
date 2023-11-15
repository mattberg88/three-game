import { Group, Vector3, Raycaster, AudioListener, AudioLoader } from 'three';
import {World, Vec3} from 'cannon-es'
import BasicLights from './Lights.js';
import LevelGenerator from './LevelGenerator.js';
import CannonDebugger from 'cannon-es-debugger'
import Cat from './Cat.js';

export default class SeedScene extends Group {
  constructor(camera) {
    super();
    this.camera = camera
    this.world = new World({ gravity: new Vec3(0, -9.82, 0) })
    this.cannonDebugger = new CannonDebugger(this, this.world, {})
    const lights = new BasicLights();
    this.level = new LevelGenerator(this.world)
    this.level.loadLevel()
    this.player = new Cat(this.world, new Vector3(0,3,0), 1)
    this.updateList = [this.level]
    this.add(this.level, lights, this.player);
    this.speedFactor = 0
  }

  resetGame() {
    this.player.removePlayer()
    this.level.removeAll()
    this.player = new Cat(this.world, new Vector3(0,3,0), 1)
    this.level = new LevelGenerator(this.world)
    this.level.loadLevel()

    this.updateList = [this.level]
    this.add(this.level, this.player)
  }

  update(keys, deltaTime) {
    this.paused = keys.pause
    if(this.paused === true) return
    if(this.player.mesh && (this.player.mesh.position.y < -10 || this.player.mesh.position.x < -10)) {
      this.resetGame()
    }
    this.player.movePlayer(keys, deltaTime)
    this.level.update(deltaTime)
    // this.cannonDebugger.update()
    this.world.fixedStep(deltaTime)
    if(this.player.mesh) {
      this.player.update(deltaTime, this)
    }
  }
}