import { Group, BoxGeometry, Mesh, MeshBasicMaterial, Vector3 } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export default class Enemy extends Group {
  constructor() {
    super();
    const geometry = new BoxGeometry( 0.1, 0.1, 0.1 );
    const material = new MeshBasicMaterial( {color: 'gray'} );
    const enemy = new Mesh( geometry, material );
    enemy.position.set(0,0.05,0)
    this.enemy = enemy
    this.add(this.enemy)
  }

  // checkCollision() {
  //   for (var vertexIndex = 0; vertexIndex < this.geometry.attributes.position.array.length; vertexIndex++)
  //   {
  //       var localVertex = new Vector3().fromBufferAttribute(this.geometry.attributes.position, vertexIndex).clone();
  //       var globalVertex = localVertex.applyMatrix4(this.matrix);
  //       var directionVector = globalVertex.sub( this.position );

  //       var ray = new Raycaster( this.position, directionVector.clone().normalize() );
  //       var collisionResults = ray.intersectObjects( collidableMeshList );
  //       if ( collisionResults.length > 0 && collisionResults[0].distance < directionVector.length() )
  //       {
  //         console.log('hit')
  //           // a collision occurred... do something...
  //       }
  //   }
  // }

  update(timeStamp, command, mouse, player) {
    this.enemy.lookAt(player.position)
    console.log(player.position)
    // this.rotation.y = timeStamp / 10000;
  }
}