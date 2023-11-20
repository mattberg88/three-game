import { Group, TextureLoader, MeshPhongMaterial } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import WHEEL from '../assets/wheel.glb'

export default class WheelObj extends Group {
  constructor() {
    const loader = new GLTFLoader()
    super();
    this.material = new MeshPhongMaterial({color: 0x444444})

    loader.load(WHEEL, (gltf) => {
        this.mesh = gltf.scene

        this.setMaterial(this.material);
        this.mesh.scale.set(1,1,1)
        this.mesh.rotation.set(Math.PI/2,0,0)

        this.add(this.mesh);
      },
    );
  }
  setMaterial(material) {
    this.mesh.traverse((o) => {
      if (o.isMesh) o.material = material;
    });
  }
  scroll(ydiff) {
    console.log('wheel', ydiff)
    this.mesh.rotation.set(Math.PI/2, -ydiff/100, 0)
  }
}