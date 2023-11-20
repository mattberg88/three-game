import { Group, Vector3, LineBasicMaterial, BufferGeometry, Line } from 'three';
import BasicLights from './Lights.js';
import LevelGenerator from './LevelGenerator.js';
import CannonDebugger from 'cannon-es-debugger'
import Cat from './Cat.js';

export default class SeedScene extends Group {
  constructor(camera) {
    super();
    // let physicsWorld
    // let m_collisionConfiguration = new ammo.btDefaultCollisionConfiguration();
    // let m_dispatcher = new ammo.btCollisionDispatcher(m_collisionConfiguration);
    // let m_broadphase = new ammo.btDbvtBroadphase();
    // let m_constraintSolver = new ammo.btSequentialImpulseConstraintSolver();

    // physicsWorld = new ammo.btDiscreteDynamicsWorld(m_dispatcher, m_broadphase, m_constraintSolver, m_collisionConfiguration);
    // physicsWorld.setGravity(new ammo.btVector3(0, -9.810, 0));

    this.camera = camera
    const lights = new BasicLights();
    this.level = new LevelGenerator()
    this.level.loadLevel()
    this.player = new Cat(new Vector3(-0.7,0.7,0))
    this.updateList = [this.level]
    this.add(this.level, lights, this.player);
    this.speedFactor = 0
    this.makeDebugLine()
    const obj = new Group()
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
    this.player = new Cat(new Vector3(0,3,0))
    this.level = new LevelGenerator()
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
    if(this.player.mesh) {
      this.player.update(keys, deltaTime, this)
    }
  }
}