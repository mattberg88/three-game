import { Group, Vector3 } from 'three';
import {World, Body} from 'cannon-es'

import LAND from '../assets/Land.glb';

import Projectile from './Projectile.js';
import BasicLights from './Lights.js';
import GameObject from './GameObject.js';
import Character from './Character.js'
import { checkTouching, initCannon } from '../utils/physics.js';

export default class SeedScene extends Group {
  constructor() {
    super();
    const landObj = new GameObject(LAND)
    const lights = new BasicLights();
    this.collidableList = []
    this.player = this.createCharacter('blue', new Vector3(0,0.05,-1), false)
    this.enemy1 = this.createCharacter('red', new Vector3(-0.4,0.05,0), true)
    this.enemy2 = this.createCharacter('red', new Vector3(0,0.05,0), true)
    this.enemy3 = this.createCharacter('red', new Vector3(0.4,0.05,0), true)
    this.shotArray = []
    this.add(landObj, lights);
    this.world = new World()

    this.body = new Body({
      mass: 1,
    })
    this.body.angularVelocity.set(0, 10, 0)
    this.body.angularDamping = 0.5
    this.world.addBody(this.body)
  }

  createCharacter(color, startPos, collidable) {
    const c = new Character(color)
    c.setPosition(startPos)
    if(collidable) {
      this.collidableList.push(c.character)
    }
    this.add(c.character)
    return c
  }

  update(timeStamp, command, mouse, camera) {

    this.world.fixedStep()

    // // Copy coordinates from cannon.js to three.js
    this.enemy2.character.position.copy(this.body.position)
    this.enemy2.character.quaternion.copy(this.body.quaternion)

    this.player.character.lookAt(new Vector3(mouse.mousePos.x, 0, mouse.mousePos.y))
    camera.position.set(this.player.character.position.x, this.player.character.position.y+3, this.player.character.position.z-4)
    if(mouse.mouseClick) {
      const shoot = new Projectile(timeStamp, this.player.character, mouse)
      this.shotArray.push({ projectile: shoot, time: timeStamp })
      this.add(shoot)
    }
    this.shotArray.forEach(s => {
      if((timeStamp-s.time) > 1000) {
        this.remove(s.projectile)
        this.shotArray.shift()
      } else {
        s.projectile.update()
        const collided = checkTouching(s.projectile.mesh, this.collidableList)
        if(collided.length > 0) {
          console.log('hit')
          collided.forEach(c => this.remove(c))
        }
      }
    })
    if(command === 'w') {
      this.player.character.position.z += 0.01
    }
    if(command === 's') {
      this.player.character.position.z -= 0.01
    }
    if(command === 'a') {
      this.player.character.position.x += 0.01
    }
    if(command === 'd') {
      this.player.character.position.x -= 0.01
    }
  }
}