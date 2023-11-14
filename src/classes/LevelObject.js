import { Group, TextureLoader, Mesh, Vector2, MeshPhongMaterial } from 'three';
import {Box, Vec3, Body, Quaternion} from 'cannon-es'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';

export default class LevelObject extends Group {
  constructor(name, obj, tex, scale) {
    super();
    this.loader = new GLTFLoader()
    this.name = name
    this.obj = obj
    this.tex = tex
    this.scl = scale
    this.load = this.loader.loadAsync(this.obj).then(loaded => this.configure(loaded))
  }
  configure(loadedObj) {
      const texLoader = new TextureLoader()
      const texture = texLoader.load(this.tex)
      this.mesh = loadedObj.scene.children[0]
      this.mesh.material = new MeshPhongMaterial({normalMap: texture, color: 'gray'})
      this.mesh.scale.copy(this.scl)
      this.add(this.mesh);
      return this
  }
}