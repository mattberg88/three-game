import { Group, Vector3, Clock } from 'three';
import {World, Vec3} from 'cannon-es'

import LAND from '../assets/Land.glb';

import Projectile from './Projectile.js';
import BasicLights from './Lights.js';
import Character from './Character.js'
import Land from './Land';
import { movePlayer } from '../utils/controls.js';

export default class SeedScene extends Group {
  constructor() {
    super();
    this.clock = new Clock()
    this.world = new World({ gravity: new Vec3(0, -9.82, 0) })

    // const landObj = new GameObject(LAND, this.world)
    const landObj = new Land(this.world)
    const lights = new BasicLights();

    this.collidableList = []
    this.player = this.createCharacter('blue', new Vector3(0,1,-1), true)
    // this.enemy1 = this.createCharacter('red', new Vector3(-0.4,0.05,0), true)
    this.enemy2 = this.createCharacter('red', new Vector3(0,1,0), true)
    // this.enemy3 = this.createCharacter('red', new Vector3(0.4,0.05,0), true)
    this.shotArray = []
    this.add(landObj, lights);
  }

  createCharacter(color, startPos, collidable) {
    const c = new Character(color)
    c.startPhysics(this.world)
    c.setPosition(startPos)
    if(collidable) {
      this.collidableList.push(c)
    }
    this.add(c.mesh)
    return c
  }

  update(command, mouse, camera) {
    const time = this.clock.getElapsedTime()
    movePlayer(command, this.player.body.position)
    this.world.fixedStep()
    this.collidableList.forEach(o => {
      o.update(time)
    })

    this.player.mesh.lookAt(new Vector3(mouse.mousePos.x, 0, mouse.mousePos.y))
    camera.position.set(this.player.mesh.position.x, this.player.mesh.position.y+3, this.player.mesh.position.z-4)
    if(mouse.mouseClick) {
      const shoot = new Projectile(time, this.player.mesh, mouse)
      shoot.startPhysics(this.world)
      this.collidableList.push(shoot)
      this.add(shoot)
    }
  }
}