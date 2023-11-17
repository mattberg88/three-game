import { Group, AnimationMixer, AnimationClip, MeshPhongMaterial, Raycaster, Vector3, Quaternion } from 'three';
import {Sphere, Material, Body, Vec3, Box} from 'cannon-es'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import CAT from '../assets/Cat.glb'

export default class Cat extends Group {
  constructor(world, startPos, mass, deltaTime) {
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
        this.mesh.scale.set(0.01,0.01,0.01)

        this.mixer = new AnimationMixer( gltf.scene )
        const clips = gltf.animations
        const clip = AnimationClip.findByName( clips, 'run' );
        this.action = this.mixer.clipAction( clip );
        this.action.play()

        const ballMaterial = new Material('ground')
        ballMaterial.friction = 1
        this.body = new Body({ mass, material: ballMaterial, position: startPos})
        const shape = new Box(new Vec3(0.2, 0.1, 0.1))
        this.body.addShape(shape, new Vec3(0, 0.1, 0))
        this.body.angularFactor = new Vec3(0, 0, 0)

        this.downRay = new Raycaster(this.mesh.position, new Vec3(0, -1, 0), 0, 0.25)
        this.frontRay = new Raycaster(this.mesh.position, new Vec3(0, 0, 1), 0, 0.25)
        this.add(this.mesh);
        this.world = world
        this.world.addBody(this.body)
        this.setPosition(startPos)
      },
    );
  }
  setMaterial(material) {
    this.mesh.traverse((o) => {
      if (o.isMesh) o.material = material;
    });
  }
  setPosition(pos) {
    this.body.position.set(pos.x, pos.y, pos.z)
    this.mesh.position.set(pos.x, pos.y, pos.z)
  }

  controlPlayer(keys, deltaTime) {
    if(!this.body) return
    if(keys.right || keys.pointerRight) {
      this.action.timeScale = 7
      this.body.position.x += 0.01
    }
    if(keys.left || keys.pointerLeft) {
      this.action.timeScale = 7
      this.body.position.x -= 0.01
    }
    if((keys.up || keys.pointerClick) && this.grounded) {
      this.body.applyImpulse(new Vec3(0,0.25,0))
    }
    if(!keys.up && !keys.left && !keys.right && !keys.pointerClick && !keys.pointerLeft && !keys.pointerRight) {
      this.action.timeScale = 6
    }
  }

  removePlayer() {
    this.remove(this.mesh)
    this.world.removeBody(this.body)
  }

  update(keys, deltaTime, scene) {
    // if(this.body.position.x < -0.1 && this.grounded) {
    //   this.action.timeScale = 7
    //   this.body.position.x += 0.01
    // }
    // if(this.body.position.x > 0.1 && this.grounded) {
    //   this.action.timeScale = 7
    //   this.body.position.x -= 0.01
    // }

    if(!this.body) return
    this.controlPlayer(keys, deltaTime)
    this.downRay.set(new Vec3(this.mesh.position.x,this.mesh.position.y + 0.1,this.mesh.position.z), new Vec3(0, -1, 0))
    this.frontRay.set(this.mesh.position, new Vec3(1, 0, 0))
    this.grounded = this.downRay.intersectObjects(scene.level.children, true).length > 0
    this.obstructed = this.frontRay.intersectObjects(scene.level.children, true).length > 0
    if(this.body.position.y > 5) this.body.velocity.set(0,-9,0)
    if(this.obstructed) {
      this.setMaterial(this.redMaterial)
    }else if(this.grounded) {
      this.setMaterial(this.greenMaterial)
    }else {
      this.action.timeScale = 5
      this.setMaterial(this.material)
    }
    this.mixer.update(deltaTime);
    const temp = new Group()
    temp.position.set(this.body.position.x, this.body.position.y, this.body.position.z)

    temp.lookAt(new Vector3(0,0,0))
    if(temp.rotation.z > 0 && temp.position.y > 0) {
      temp.rotateZ(Math.PI)
    }
    temp.rotateY(-Math.PI/2)
    // temp.rotateX(-Math.PI/2)
    temp.rotateZ(Math.PI/2)

    this.body.quaternion.copy(temp.quaternion)
    this.body.position.z = 0
    this.mesh.position.copy(this.body.position)
    this.mesh.quaternion.copy(this.body.quaternion)




  }
}