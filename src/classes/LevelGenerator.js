import { Group, Vector3, Quaternion,TextureLoader, Euler, MeshPhongMaterial, TubeGeometry, CylinderGeometry } from 'three';
import { Body, Box, Vec3} from 'cannon-es'
import LevelObject from './LevelObject.js';
import STREET from '../assets/street.glb'
import STREETTEX from '../assets/BrickNorms.jpeg'
import {generateString} from '../utils/level.js'
import Wheel from './Wheel.js';

export default class LevelGenerator extends Group {
  constructor(world) {
    super();
    const streetObj = new LevelObject('street', STREET, STREETTEX, new Vector3(0.5, 0.5, 0.5))
    this.levelLoaders = [streetObj.load]
    let levelString = generateString(9, '')
    levelString += ''
    this.levelCode = levelString.split('')
    this.levelConfigs = this.levelCode.map((code , index)=> this.getObjects(code, index))
    this.wheel = new Wheel(world)
    this.levelArray = [this.wheel]

    this.characterIndex = 0
    this.world = world
    this.body = new Body({ mass: 0})
    this.speed = 0.8
    this.world.addBody(this.body)
    this.world.addBody(this.wheel.body)
    this.rad = 0
    this.radIncrement = 2
    this.paused = false
    this.add(this.wheel)
  }

  loadLevel() {
    Promise.all(this.levelLoaders).then(loaded => {
      this.levelConfigs.forEach((conf, index) => {
        if(!conf) return
        const match = loaded.find(ob => ob.name = conf.name)
        const meshClone = match.mesh.clone()
        meshClone.position.copy(conf.position)
        meshClone.quaternion.copy(conf.shapeQuaternion)
        // meshClone.quaternion.copy(new Quaternion().setFromEuler(conf.rotation.x, conf.rotation.y, conf.rotation.z))

        const temp =  new Group()
        temp.position.copy(conf.shapePosition)
        temp.quaternion.copy(conf.shapeQuaternion)

        let pivot = new Group()
        pivot.rotateZ(2 * Math.PI * index/this.levelConfigs.length)
        pivot.add( meshClone, temp )
        temp.getWorldPosition(conf.shapePosition)
        temp.getWorldQuaternion(conf.shapeQuaternion)
        this.wheel.body.addShape(conf.shape, conf.shapePosition, conf.shapeQuaternion)
        this.wheel.add(pivot)
        this.levelArray.push(meshClone)
      })
    })
  }

  getStreetConf(index, height, rotation) {
    return {
      name: 'street',
      scale: new Vector3(0.5,0.5,0.5),
      position: new Vector3(0,height,0),
      quaternion: new Quaternion().setFromEuler(new Euler(Math.PI/2,0,Math.PI/2)),
      shape: new Box(new Vector3(0.5,0.5,0.2)),
      shapePosition: new Vector3(0, height + 0.3, 0),
      shapeQuaternion: new Quaternion().setFromEuler(new Euler(Math.PI/2,0,Math.PI/2)),
    }
  }
  getObjects(code, index) {
    switch(code) {
      case '-': return this.getStreetConf(index, 1.3, 0)
      case '|': return this.getStreetConf(index, 1.7, 0)
      case '_': return this.getStreetConf(index, -0.4, 0)
      case 'F': return this.getStreetConf(index, 1, 0)
      // case '<': return this.getStreetBlock(index, 0)
      // case '>': return this.getStreetBlock(index, 0)
    }
  }

  removeAll() {
    this.levelArray.forEach(levelObject => {
      this.remove(levelObject)
    })
    this.world.removeBody(this.body)
    this.world.removeBody(this.wheel.body)
  }


  update(deltaTime) {
    if(this.paused) return
    this.wheel.rotateZ(this.speed * deltaTime)
    this.wheel.body.quaternion.copy(this.wheel.quaternion)

    // this.position.setX(this.position.x - this.speed * deltaTime * 100)
    this.speed += 0.0001
    // this.body.position.copy(this.position)
  }
}