import { Group, Vector3 } from 'three';
import { Body } from 'cannon-es'
import BoxObject from './BoxObject.js';
import LevelObject from './LevelObject.js';
import STREET from '../assets/streetBlock7.obj'
import STREETTEX from '../assets/streetnorms3.jpeg'

import {generateString} from '../utils/level.js'

export default class LevelGenerator extends Group {
  constructor(world) {
    super();
    const levelString = generateString(100, '--------')
    this.levelCode = levelString.split('')
    this.levelArray = []
    this.characterIndex = 0
    this.world = world
    this.body = new Body({ mass: 0})
    this.speed = 0.05
    this.world.addBody(this.body)
  }

  async loadLevel() {
    const loaderArray = []
    this.levelCode.map((code , index)=> {
      const levelObjects = this.getObjects(code, index)
      if(!levelObjects) return
      levelObjects.map(obj => {
        loaderArray.push(obj.loadObject)
      })
    })
    await Promise.all(loaderArray).then((loadedModels) => {
      loadedModels.forEach(obj => {
        this.body.addShape(obj.shape, obj.mesh.position, obj.mesh.quaternion)
        this.add(obj.mesh)
        this.levelArray.push(obj.mesh)
      })
    })
  }

  getObjects(code, index) {
    switch(code) {
      case '-': return [new LevelObject(STREET, STREETTEX, new Vector3(index,0,0), new Vector3(0, Math.PI + Math.PI/2, 0))]
      case '=': return [
        new LevelObject(STREET, STREETTEX, new Vector3(index,0,0), new Vector3(0, Math.PI + Math.PI/2, 0)),
        new LevelObject(STREET, STREETTEX, new Vector3(index,2,0), new Vector3(0, Math.PI + Math.PI/2, 0))
      ]
      case '|': return [new LevelObject(STREET, STREETTEX, new Vector3(index,0.3,0), new Vector3(0, Math.PI + Math.PI/2, 0))]
      case '_': return [new LevelObject(STREET, STREETTEX, new Vector3(index,-0.3,0), new Vector3(0, Math.PI + Math.PI/2, 0))]
      // case '<': return [new LevelObject(STREET, STREETTEX, new Vector3(index,0.3,0), new Vector3( 0,  0, Math.PI/5))]
      // case '>': return [new LevelObject(STREET, STREETTEX, new Vector3(index,0.3,0), new Vector3( 0,  Math.PI, Math.PI/5))]

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

  update() {
    this.position.setX(this.position.x - this.speed)
    this.speed += 0.00001
    this.body.position.copy(this.position)
  }
}