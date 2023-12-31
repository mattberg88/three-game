import { Group, TextureLoader, MeshPhongMaterial } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import WHEEL from '../assets/wheel.glb'
import Particles from './Particles.js'

export default class WheelObj extends Group {
  constructor() {
    const loader = new GLTFLoader()
    super();
    this.particles = new Particles()

    loader.load(WHEEL, (gltf) => {
        this.mesh = gltf.scene
        this.setMaterial(new MeshPhongMaterial({color: 0x444444}));
        this.mesh.scale.set(1,1,1)
        this.mesh.rotation.set(Math.PI/2,0,0)
        this.add(this.mesh, this.particles);
      },
    );
  }
  setMaterial(material) {
    this.mesh.traverse((o) => {
      if (o.isMesh) o.material = material;
    });
  }

  scroll(ydiff) {
    this.particles.rotation.set(Math.PI/2, 0, this.particles.rotation.z+ydiff)
    this.mesh.rotation.set(Math.PI/2, 0, this.mesh.rotation.z+ydiff)

  }
}