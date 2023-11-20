import { Group, AnimationMixer, AnimationClip, MeshPhongMaterial, Raycaster, Vector3, Quaternion } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import CAT from '../assets/Cat.glb'

export default class Cat extends Group {
  constructor(startPos) {
    const loader = new GLTFLoader()
    super();
    this.material = new MeshPhongMaterial({color: 0x444444})

    loader.load(CAT, (gltf) => {
        this.mesh = gltf.scene
        this.mesh.traverse((o) => {
          if (o.isMesh) o.material = this.material;
        });
        this.mesh.scale.set(0.005,0.005,0.005)
        this.mesh.rotation.set(0,0,Math.PI/4)
        this.mixer = new AnimationMixer( gltf.scene )
        const clips = gltf.animations
        const clip = AnimationClip.findByName( clips, 'run' );
        this.action = this.mixer.clipAction( clip );
        this.action.play()
        this.action.timeScale = 3
        this.add(this.mesh);
        this.mesh.position.set(startPos.x, startPos.y, startPos.z)
      },
    );
  }

  drag(ydiff) {
    this.mixer.setTime(-ydiff/100);
  }

  scroll(yDiff) {
    this.mixer.setTime(this.mixer.time += yDiff/1000);
  }

}