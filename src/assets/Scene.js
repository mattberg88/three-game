import { Group, BoxGeometry, Mesh, MeshBasicMaterial, Vector3 } from 'three';
import BasicLights from './Lights.js';
import Players from './Players.js';
import Enemy from './Enemy.js';
import GameObject from './GameObject.js';
import LAND from './3DModels/Land.glb';

export default class SeedScene extends Group {
  constructor() {
    super();
    const landObj = new GameObject(LAND)
    const lights = new BasicLights();
    const players = new Players()
    this.players = players
    this.add(landObj, lights, this.players);
  }

  update(timeStamp, command, mousePos, mouseClick) {
    this.players.update(timeStamp, command, mousePos, mouseClick)

  }
}