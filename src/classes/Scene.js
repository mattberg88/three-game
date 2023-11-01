import { Group, Vector3 } from 'three';
import {World, Vec3} from 'cannon-es'

import LAND from '../assets/Land.glb';

import Projectile from './Projectile.js';
import BasicLights from './Lights.js';
import GameObject from './GameObject.js';
import Character from './Character.js'
import Land from './Land';
import { checkTouching } from '../utils/physics.js';

export default class SeedScene extends Group {
  constructor() {
    super();
    this.world = new World({ gravity: new Vec3(0, -9.82, 0) })

    // const landObj = new GameObject(LAND, this.world)
    const landObj = new Land(this.world)
    const lights = new BasicLights();

    this.collidableList = []
    this.player = this.createCharacter('blue', new Vector3(0,0.05,-1), false)
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

  update(timeStamp, command, mouse, camera) {

    this.world.fixedStep()
    this.collidableList.forEach(o => {
      o.mesh.position.copy(o.body.position)
      o.mesh.quaternion.copy(o.body.quaternion)
    })

    this.player.mesh.lookAt(new Vector3(mouse.mousePos.x, 0, mouse.mousePos.y))
    camera.position.set(this.player.mesh.position.x, this.player.mesh.position.y+3, this.player.mesh.position.z-4)
    if(mouse.mouseClick) {
      const shoot = new Projectile(timeStamp, this.player.mesh, mouse)
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
          collided.forEach(c => {
            c.body.velocity.set(0, 3, 0)
            c.body.damping = 0.5

          })
        }
      }
    })

    if(command === 'w') {
      this.player.mesh.position.z += 0.01
    }
    if(command === 's') {
      this.player.mesh.position.z -= 0.01
    }
    if(command === 'a') {
      this.player.mesh.position.x += 0.01
    }
    if(command === 'd') {
      this.player.mesh.position.x -= 0.01
    }
  }
}