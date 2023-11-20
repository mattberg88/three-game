import { Group, SpotLight, PointLight, AmbientLight, HemisphereLight } from 'three';

export default class BasicLights extends Group {
  constructor() {
    super();
    const point = new PointLight(0xCCCCFF, 1, 10, 1);
    const spot = new SpotLight(0xFFFFDD, 2, 3, 0.5, 1, 0.3);
    const ambi = new AmbientLight( 0x404040 , 0.5);
    const hemi = new HemisphereLight( 0xffffbb, 0x080820, 0.5)
    spot.position.set(-1.5, 2, 0);
    spot.target.position.set(0, 0.5, 0);

    point.position.set(3, 3, 0);
    this.add(point, ambi, hemi, spot, spot.target);
  }
}
