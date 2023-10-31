import { Group, BoxGeometry, Mesh, MeshBasicMaterial } from 'three';

export default class Character extends Group {
  constructor(color) {
    super();
    const geometry = new BoxGeometry( 0.1, 0.1, 0.1 );
    const material = new MeshBasicMaterial( {color} );
    const character = new Mesh( geometry, material );
    this.character = character
    this.add(this.character)
  }
  setPosition(pos) {
    this.character.position.set(pos.x, pos.y, pos.z)
  }
  update() {
  }
}