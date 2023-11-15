import { Group, Mesh, AnimationMixer, AnimationClip, MeshPhongMaterial, Raycaster } from 'three';
import {Sphere, Material, Body, Vec3} from 'cannon-es'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import CAT from '../assets/Cat.glb'

export default class Cat extends Group {
  constructor(world, startPos, mass, deltaTime) {
    const loader = new GLTFLoader()
    super();
    this.paused = false
    this.grounded = false
    loader.load(CAT, (gltf) => {
        this.mesh = gltf.scene
        var newMaterial = new MeshPhongMaterial({color: 0x444444});
        this.mesh.traverse((o) => {
          if (o.isMesh) o.material = newMaterial;
        });
        this.mesh.scale.set(0.01,0.01,0.01)

        this.mixer = new AnimationMixer( gltf.scene )
        const clips = gltf.animations
        const clip = AnimationClip.findByName( clips, 'run' );
        this.action = this.mixer.clipAction( clip );
        this.action.play()

        const ballMaterial = new Material('ground')
        ballMaterial.friction = 1
        this.body = new Body({ mass, material: ballMaterial, position: startPos})
        const shape = new Sphere(0.15)
        this.body.quaternion.copy(this.mesh.quaternion)
        this.body.addShape(shape, new Vec3(0.1, 0.15, 0))
        this.body.addShape(shape, new Vec3(-0.15, 0.15, 0))
        this.body.angularFactor = new Vec3(0, 0, 0)

        this.rayCaster = new Raycaster(this.mesh.position, new Vec3(0, -1, 0), 0, 0.25)

        this.add(this.mesh);
        this.world = world
        this.world.addBody(this.body)
        this.setPosition(startPos)
      },
    );
  }

  setPosition(pos) {
    this.body.position.set(pos.x, pos.y, pos.z)
    this.mesh.position.set(pos.x, pos.y, pos.z)
  }

  movePlayer(keys, deltaTime) {
    if(!this.body) return
    // if(keys.right || keys.pointerRight) {
    //   this.action.timeScale = 7
    //   this.setPosition(new Vec3(this.mesh.position.x + 1 * deltaTime, this.mesh.position.y, this.position.z))
    // }
    // if(keys.left || keys.pointerLeft) {
    //   this.action.timeScale = 2
    //   this.setPosition(new Vec3(this.mesh.position.x - 1 * deltaTime, this.mesh.position.y, this.position.z))
    // }
    if((keys.up || keys.pointerClick) && this.grounded) {
      this.action.timeScale = this.body.position.y * 10 * deltaTime
        this.body.applyImpulse(new Vec3(0,1,0))
    }
    if(!keys.up && !keys.left && !keys.right && !keys.pointerClick && !keys.pointerLeft && !keys.pointerRight) {
      this.action.timeScale = 6
    }
  }

  removePlayer() {
    this.remove(this.mesh)
    this.world.removeBody(this.body)
  }

  update(deltaTime, scene) {
    // if(this.body.position.x < -1) {
    //   this.body.applyImpulse(new Vec3(0.06, 0, 0), this.body.position)
    //   this.action.timeScale += 0.1
    // }
    // if(this.body.position.x > 1) {
    //   this.body.applyImpulse(new Vec3(0.06, 0, 0), this.body.position)
    //   this.action.timeScale -= 0.1
    // }

    if(!this.body) return
    this.rayCaster.set(new Vec3(this.mesh.position.x,this.mesh.position.y + 0.1,this.mesh.position.z), new Vec3(0, -1, 0))
    this.grounded = this.rayCaster.intersectObjects(scene.level.children, true).length > 0

    this.mixer.update(deltaTime);
    this.mesh.position.copy(this.body.position)
    this.mesh.quaternion.copy(this.body.quaternion)
  }
}