import { Group, TextureLoader, Mesh, Vector2, MeshPhongMaterial } from 'three';
import {Box, Vec3, Body, Material} from 'cannon-es'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';

export default class LevelObject extends Group {
  constructor(obj, tex, startPos, startAngle) {
    super();

    this.loader = new OBJLoader()
    this.loadObject = this.loadObject
    this.startPos = startPos
    this.startAngle = startAngle
    this.loadObject = this.loader.loadAsync(obj).then((gltf) => {
      const texLoader = new TextureLoader()
      const texture = texLoader.load(tex)
      gltf.children[0].material = new MeshPhongMaterial({normalMap: texture, color: 'gray'})


      this.mesh = gltf.children[0]
      // var newMaterial = new MeshPhongMaterial({color: 0x444444});
      //this.mesh.material = newMaterial
      this.mesh.scale.set(0.5,0.5,0.5)
      this.shape = new Box(new Vec3(0.5,0.5,0.5))
      this.add(this.mesh);
      if(this.startPos && this.mesh) this.mesh.position.set(this.startPos.x, this.startPos.y, this.startPos.z)
      if(this.startAngle && this.mesh) this.mesh.rotation.set(this.startAngle.x, this.startAngle.y, this.startAngle.z)
      return this
    })
  }
}