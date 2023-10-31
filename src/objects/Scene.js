import { Group, BoxGeometry, Mesh, MeshBasicMaterial, Vector3, Ray } from 'three';
import BasicLights from './Lights.js';
import Players from './Players.js';
import Enemy from './Enemy.js';
import GameObject from './GameObject.js';
import LAND from './3DModels/Land.glb';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export default class SeedScene extends Group {
  constructor() {
    super();
    const loader = new GLTFLoader();

    const landObj = new GameObject(LAND)
    const lights = new BasicLights();
    const players = new Players()
    this.players = players
    this.loader = loader
    this.add(landObj, lights, this.players);
    this.collidableMeshList = [players[1]]
  }

  update(timeStamp, command, mousePos, mouseClick) {
    this.players.update(timeStamp, command, mousePos, mouseClick)
  }
}