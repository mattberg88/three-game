import { Group, Vector3, LineBasicMaterial, BufferGeometry, Line } from 'three';
import {World, Vec3} from 'cannon-es'
import BasicLights from './Lights.js';
import LevelGenerator from './LevelGenerator.js';
import CannonDebugger from 'cannon-es-debugger'
import Cat from './Cat.js';
import { OrientationControls } from '../utils/orientationControls.js'

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
    this.makeDebugLine()
    const obj = new Group()
    // this.cont = new OrientationControls(this.camera)
  }

  makeDebugLine() {
    const lineMat = new LineBasicMaterial({ color: 0xff0000 })
    const points = new Array()
    points.push( new Vector3( 0, 0, 1 ) )
    points.push( new Vector3( 0, 0, 0 ) )
    const geometry = new BufferGeometry().setFromPoints( points )
    // geometry.rotateX(Math.PI/2)
    this.debugLine = new Line( geometry, lineMat )

    this.add( this.debugLine )
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
    this.level.update(deltaTime)
    // this.cannonDebugger.update()
    this.world.fixedStep(deltaTime)
    if(this.player.mesh) {
      this.player.update(keys, deltaTime, this)
    }
  }
}