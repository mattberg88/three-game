import { Group, AnimationMixer, AnimationClip, MeshPhongMaterial, Raycaster, Vector3, Quaternion } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import CAT from '../assets/Cat.glb'

export default class Cat extends Group {
  constructor(startPos, deltaTime) {
    const loader = new GLTFLoader()
    super();
    this.paused = false
    this.grounded = false
    this.obstructed = false
    this.material = new MeshPhongMaterial({color: 0x444444})
    this.greenMaterial = new MeshPhongMaterial({color: 0x446644})
    this.redMaterial = new MeshPhongMaterial({color: 0x664444})

    loader.load(CAT, (gltf) => {
        this.mesh = gltf.scene

        this.setMaterial(this.material);
        this.mesh.scale.set(0.005,0.005,0.005)
        this.mesh.rotation.set(0,0,Math.PI/4)

        this.mixer = new AnimationMixer( gltf.scene )
        const clips = gltf.animations
        const clip = AnimationClip.findByName( clips, 'run' );
        this.action = this.mixer.clipAction( clip );
        this.action.play()

        this.downRay = new Raycaster(this.mesh.position, new Vector3(0, -1, 0), 0, 0.25)
        this.frontRay = new Raycaster(this.mesh.position, new Vector3(0, 0, 1), 0, 0.25)
        this.add(this.mesh);
        this.mesh.position.set(startPos.x, startPos.y, startPos.z)
      },
    );
  }
  setMaterial(material) {
    this.mesh.traverse((o) => {
      if (o.isMesh) o.material = material;
    });
  }

  controlPlayer(keys, deltaTime) {
    // if(keys.right || keys.pointerRight) {
    //   this.action.timeScale = 8
    // }
    // if(keys.left || keys.pointerLeft) {
    //   this.action.timeScale = 4
    // }
    if((keys.up || keys.pointerClick) && this.grounded) {
    }
    if(!keys.up && !keys.left && !keys.rdight && !keys.pointerClick && !keys.pointerLeft && !keys.pointerRight) {
      this.action.timeScale = 6
    }
  }

  removePlayer() {
    this.remove(this.mesh)
  }

  update(keys, deltaTime, scene) {
    this.controlPlayer(keys, deltaTime)
    this.downRay.set(this.mesh.position, new Vector3(0, -1, 0))
    this.frontRay.set(this.mesh.position, new Vector3(1, 0, 0))
    this.grounded = this.downRay.intersectObjects(scene.level.children, true).length > 0
    this.obstructed = this.frontRay.intersectObjects(scene.level.children, true).length > 0
    // if(this.obstructed) {
    //   this.setMaterial(this.redMaterial)
    // }else if(this.grounded) {
    //   this.setMaterial(this.greenMaterial)
    // }else {
    //   this.action.timeScale = 5
    //   this.setMaterial(this.material)
    // }
    this.mixer.update(deltaTime);
    // const temp = new Group()
    // temp.lookAt(new Vector3(0,0,0))
    // if(temp.rotation.z > 0 && temp.position.y > 0) {
    //   temp.rotateZ(Math.PI)
    // }
    // temp.rotateY(-Math.PI/2)
    // // temp.rotateX(-Math.PI/2)
    // temp.rotateZ(Math.PI/2)
  }
}