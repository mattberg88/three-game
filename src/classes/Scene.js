import { Group, Vector3 } from 'three';
import BasicLights from './Lights.js';
import Cat from './Cat.js';
import Wheel from './Wheel.js'
export default class SeedScene extends Group {
  constructor(camera) {
    super();
    this.camera = camera
    const lights = new BasicLights();
    this.wheel = new Wheel()
    this.wheel.rotateX(Math.PI/2)
    this.cat = new Cat(new Vector3(-0.7,0.7,0))
    this.add(this.wheel)
    this.add(this.level, lights, this.cat);
  }
}