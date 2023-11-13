import { Group, AnimationMixer, AnimationClip, Clock, MeshPhongMaterial, AudioListener, AudioLoader, Audio } from 'three';
import {Sphere, Material, Body, Vec3} from 'cannon-es'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import CAT from '../assets/Cat.glb'

export default class Cat extends Group {
  constructor(world, camera, startPos, mass) {
    const loader = new GLTFLoader()
    // this.clock = new Clock()
    super();
    loader.load(CAT, (gltf) => {
        this.clock = new Clock()
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
        this.jumping = false
        this.body = new Body({ mass, material: ballMaterial, position: startPos})
        const shape = new Sphere(0.15)
        this.body.quaternion.copy(this.mesh.quaternion)
        this.body.addShape(shape, new Vec3(0.1, 0.15, 0))
        this.body.addShape(shape, new Vec3(-0.15, 0.15, 0))

        this.body.angularFactor = new Vec3(0, 0, 0)

        this.add(this.mesh);
        this.world = world
        this.world.addBody(this.body)
        this.setPosition(startPos)
        this.body.addEventListener('collide', (e) => {
          const contactVector = e.contact.rj
          if(contactVector.y > 0) {
            this.jumping = false
          }
        })
      },
    );
  }

  setPosition(pos) {
    this.body.position.set(pos.x, pos.y, pos.z)
    this.mesh.position.set(pos.x, pos.y, pos.z)
  }

  movePlayer(keys) {
    if(!this.body) return
    // if(keys.right || keys.pointerRight) {
    //   this.action.timeScale = 5
    //   this.setPosition(new Vec3(this.mesh.position.x + 0.04, this.mesh.position.y, this.position.z))
    // }
    // if(keys.left || keys.pointerLeft) {
    //   this.action.timeScale = 0.8
    //   this.setPosition(new Vec3(this.mesh.position.x - 0.04, this.mesh.position.y, this.position.z))
    // }
    if((keys.up || keys.pointerClick) && !this.jumping) {
      this.action.timeScale = this.body.position.y * 10
      if(this.body.velocity.y < 4 &&  !this.jumping) {
        this.body.applyImpulse(new Vec3(0,0.6,0))
      } else {
        this.jumping = true

      }
    }
    if(!keys.up && !keys.left && !keys.right && !keys.pointerClick && !keys.pointerLeft && !keys.pointerRight) {
      this.action.timeScale = 6
    }
  }

  removePlayer() {
    this.remove(this.mesh)
    this.world.removeBody(this.body)
  }

  update() {
    if(this.body.position.x < -1) {
      this.body.applyImpulse(new Vec3(0.06, 0, 0))
      this.action.timeScale += 0.1
    }
    if(this.body.position.x > 1) {
      this.body.applyImpulse(new Vec3(-0.06, 0, 0))
      this.action.timeScale -= 0.1
    }
    if(!this.body) return
    this.mixer.update(this.clock.getDelta());
    this.mesh.position.copy(this.body.position)
    this.mesh.quaternion.copy(this.body.quaternion)
  }
}