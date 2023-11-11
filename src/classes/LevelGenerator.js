import { Group, Vector3 } from 'three';
import BoxObject from './BoxObject.js';

export default class LevelGenerator extends Group {
  constructor(world) {
    super();
    const levelString = '---- |----- |--- ---| ----- ---||  ---|'
    this.levelCode = levelString.split('')
    this.levelArray = []
    this.characterIndex = 0
    this.world = world
    this.levelCode.forEach((code , index)=> {
      const levelObject = this.getObject(code, index)
      this.levelArray.push(levelObject)
      if(!levelObject) return
      this.add(levelObject)
    })
  }
  getObject(code, index) {
    switch(code) {
      case '-': return new BoxObject(this.world, new Vector3(index,0,0), code)
      case '|': return new BoxObject(this.world, new Vector3(index,0.4,0), code)
    }
  }
  removeAll() {
    this.levelArray.forEach(levelObject => {
      if(levelObject) {
        this.remove(levelObject)
        this.world.removeBody(levelObject.body)
      }
    })
  }
  update() {
    this.levelArray.forEach(levelObject => {
      if(levelObject) {
        levelObject.update()
      }
    })
  }
}