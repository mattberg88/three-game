import { Group, Vector3 } from 'three';
import { Body } from 'cannon-es'
import BoxObject from './BoxObject.js';

export default class LevelGenerator extends Group {
  constructor(world) {
    super();
    const levelString = this.generateString(500, '------------------')
    this.levelCode = levelString.split('')
    this.levelArray = []
    this.characterIndex = 0
    this.world = world
    this.body = new Body({ mass: 0})
    this.speed = 0.05

    this.levelCode.forEach((code , index)=> {
      const levelObjects = this.getObjects(code, index)
      if(!levelObjects) return
      levelObjects.forEach(obj => {
        this.levelArray.push(obj)
        this.body.addShape(obj.shape, obj.mesh.position, obj.mesh.quaternion)
        this.add(obj)
      })
    })
    this.world.addBody(this.body)
  }

  isCompatible(prev, next) {
    if (prev === '-') {
      if (next === '|' || next === '=') {
        return false
      }
      return true
    }
    if (prev === '=') {
      if (next === '/' || next === '|') {
        return false
      }
      return true
    }
    if (prev === '|') {
      if (next === '/' || next === '=') {
        return false
      }
      return true
    }
    if (prev === '/') {
      if (next === '=') {
        return false
      }
      return true
    }
    if (prev === ' ') {
      if (next === ' ' || next === '  ') {
        return false
      }
      return true
    }
    if (prev === '  ') {
      if (next === ' ' || next === '  ') {
        return false
      }
      return true
    }
    return true
  }

  getNextChar(lastChar) {
    const randFactor = Math.floor(Math.random()*8+1)
    const nextChar = () => {
        switch(randFactor) {
        case 1: return '-'
        case 2: return '='
        case 3: return '|'
        case 4: return '/'
        case 5: return '-'
        case 6: return ' '
        case 7: return '  '
        case 8: return '-'

        default: return '-'
      }
    }
    if(this.isCompatible(lastChar, nextChar())) {
      return nextChar()
    } else {
      return this.getNextChar(lastChar)
    }
  }
  generateString(len, startChar) {
    let lastChar = startChar
    let finalStr = startChar
    for(let i = 0; i <= len; i++) {
      lastChar = this.getNextChar(lastChar)
      finalStr += lastChar
    }
    return finalStr

  }


  getObjects(code, index) {
    switch(code) {
      case '-': return [new BoxObject(this.world, new Vector3(index,0,0))]
      case '=': return [
        new BoxObject(this.world, new Vector3(index,0,0)),
        new BoxObject(this.world, new Vector3(index,2,0))
      ]
      case '|': return [new BoxObject(this.world, new Vector3(index,0.4,0))]
      case '/': return [new BoxObject(this.world, new Vector3(index,0.5,0), new Vector3(0, 0, Math.PI/4))]
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