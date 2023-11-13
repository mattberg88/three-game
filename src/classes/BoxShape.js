import { Group} from 'three';
import {Box} from 'cannon-es'

export default class BoxShape extends Group {
  constructor(scale, startPos, startAngle) {
    super();
    this.shape = new Box(scale)
    this.pos = startPos
    this.rot = startAngle
  }
}