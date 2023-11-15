import { Group, Vector3, TextureLoader, Euler, MeshPhongMaterial } from 'three';
import { Body, Box, Quaternion, Vec3} from 'cannon-es'
import LevelObject from './LevelObject.js';
import STREET from '../assets/street.glb'
import STREETTEX from '../assets/BrickNorms.jpeg'
import {generateString} from '../utils/level.js'

export default class LevelGenerator extends Group {
  constructor(world) {
    super();
    const streetObj = new LevelObject('street', STREET, STREETTEX, new Vector3(0.5, 0.5, 0.5))
    this.levelLoaders = [streetObj.load]
    let levelString = generateString(100, '-------|')
    levelString += 'F'
    this.levelCode = levelString.split('')
    this.levelConfigs = this.levelCode.map((code , index)=> this.getObjects(code, index))
    this.levelArray = []
    this.characterIndex = 0
    this.world = world
    this.body = new Body({ mass: 0})
    this.speed = 0.05
    this.world.addBody(this.body)
    this.paused = false
  }

  loadLevel() {
    Promise.all(this.levelLoaders).then(loaded => {
      this.levelConfigs.forEach(conf => {
        if(!conf) return
        const match = loaded.find(ob => ob.name = conf.name)
        const meshClone = match.mesh.clone()
        meshClone.position.copy(conf.position)
        meshClone.quaternion.copy(new Quaternion().setFromEuler(conf.rotation.x, conf.rotation.y, conf.rotation.z, 'XYZ'))
        this.body.addShape(conf.shape, conf.shapePosition)
        this.add(meshClone)
        this.levelArray.push(meshClone)
      })
    })
  }

  getStreetConf(index, height, rotation) {
    return {
      name: 'street',
      scale: new Vector3(0.5,0.5,0.5),
      position: new Vector3(index,height,0),
      rotation: new Vector3(Math.PI/2,rotation,Math.PI/2),
      shape: new Box(new Vector3(0.5,0.2,0.5)),
      shapePosition: new Vector3(index,height + 0.3,0),
      shapeRotation: new Vector3(Math.PI/2,rotation,Math.PI/2),
    }
  }
  getObjects(code, index) {
    switch(code) {
      case '-': return this.getStreetConf(index, 0, 0)
      case '|': return this.getStreetConf(index, 0.4, 0)
      case '_': return this.getStreetConf(index, -0.4, 0)
      case 'F': return this.getStreetConf(index, 1, 0)
      // case '<': return this.getStreetBlock(index, 0)
      // case '>': return this.getStreetBlock(index, 0)
    }
  }

  removeAll() {
    this.levelArray.forEach(levelObject => {
      if(levelObject) {
        this.remove(levelObject)
      }
    })
    this.world.removeBody(this.body)
  }


  update(deltaTime) {
    if(this.paused) return
    this.position.setX(this.position.x - this.speed * deltaTime * 100)
    this.speed += 0.00001
    this.body.position.copy(this.position)
  }
}