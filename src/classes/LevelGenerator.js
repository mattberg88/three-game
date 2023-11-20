import { Group } from 'three';
import Wheel from './Wheel.js';

export default class LevelGenerator extends Group {
  constructor() {
    super();
    this.wheel = new Wheel()
    this.wheel.rotateX(Math.PI/2)
    this.levelArray = [this.wheel]
    this.add(this.wheel)
  }
}