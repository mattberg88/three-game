import { Group} from 'three';
import {Box} from 'cannon-es'

export default class BoxShape extends Group {
  constructor(scale) {
    super();
    this.shape = new Box(scale)
  }
  setPosition(position) {
    this.shape.position.copy(position)
  }
  setRotation(rotation) {
    const quat = new Quaternion().setFromEuler(rotation.x, rotation.y, rotation.z, 'XYZ')
    this.shape.quaternion.copy(quat)

  }
}