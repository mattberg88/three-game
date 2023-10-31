import { Group, BoxGeometry, Mesh, MeshBasicMaterial, Vector3, Raycaster } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export default class Projectile extends Group {
  constructor(timeStamp, player, mousePos, collidableMeshList) {
    super();
    const geometry = new BoxGeometry( 0.02, 0.02, 0.02 );
    const material = new MeshBasicMaterial( {color: 'red'} );
    const mesh = new Mesh( geometry, material );
    this.mesh = mesh
    this.mesh.lookAt(new Vector3(mousePos.x, 0, mousePos.y))
    this.player = player
    this.time = timeStamp
    this.mesh.position.set(player.position.x, player.position.y, player.position.z)
    this.add(this.mesh)
    // this.collidableMeshList = collidableMeshList
  }
  checkCollision(collidableMeshList) {
    const getVerticesForObject = (obj) => {

      const bufferVertices = obj.geometry.attributes.position.array;
      const vertices = [];

      for (let i = 0; i < bufferVertices.length; i += 3) {
        vertices.push(
          new THREE.Vector3(
            bufferVertices[i] + obj.position.x,
            bufferVertices[i + 1] + obj.position.y,
            bufferVertices[i + 2] + obj.position.z
          )
        );
      }
      return vertices;
    };

  }
  update() {
    this.mesh.translateZ(0.05)
  }
}