import { Group, Vector3 } from 'three';
import { Body, Quaternion } from 'cannon-es'
import LevelObject from './LevelObject.js';
import BoxShape from './BoxShape.js';
import STREET from '../assets/StreetBlock.glb'
import STREETTEX from '../assets/BrickNorms.jpeg'
import {generateString} from '../utils/level.js'

export default class LevelGenerator extends Group {
  constructor(world) {
    super();
    let levelString = generateString(100, '--------')
    levelString += 'F'
    this.levelCode = levelString.split('')
    this.levelArray = []
    this.characterIndex = 0
    this.world = world
    this.body = new Body({ mass: 0})
    this.speed = 0.03
    this.world.addBody(this.body)
  }

  async loadLevel() {
    this.levelCode.map(async (code , index)=> {
      const levelObjects = this.getObjects(code, index)
      if(!levelObjects) return
      await Promise.all(levelObjects.meshes.map((mesh) => mesh.loadObject)).then((models => {
        models.forEach(model => {
          this.add(model)
          this.levelArray.push(model)
        })
      }))
      levelObjects.shapes.map((shape) => {
        this.body.addShape(shape.shape, shape.pos, new Quaternion().setFromEuler(shape.rot.x, shape.rot.y, shape.rot.z, 'XYZ'))
      })
    })
  }

  getStreetBlock = (index, height, angle) => {
    return {
      meshes: [new LevelObject(STREET, STREETTEX, new Vector3(index,height,0), new Vector3(Math.PI/2, angle, Math.PI/2))],
      shapes: [new BoxShape(new Vector3(0.5,0.5,0.2), new Vector3(index,height + 0.3,0), new Vector3(Math.PI/2, angle, Math.PI/2))]
    }
  }

  getObjects(code, index) {
    switch(code) {
      case '-': return this.getStreetBlock(index, 0, 0)
      case '|': return this.getStreetBlock(index, 0.4, 0)
      case '_': return this.getStreetBlock(index, -0.4, 0)
      case 'F': return this.getStreetBlock(index, 1, 0)

      // case '<': return this.getStreetBlock(index, 0, Math.PI/4)
      // case '>': return this.getStreetBlock(index, 0, - Math.PI/4)
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