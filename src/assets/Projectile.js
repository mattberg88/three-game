import { Group, BoxGeometry, Mesh, MeshBasicMaterial, Vector3 } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export default class Projectile extends Group {
  constructor(timeStamp, player, mousePos) {
    super();
    const geometry = new BoxGeometry( 0.02, 0.02, 0.02 );
    const material = new MeshBasicMaterial( {color: 'red'} );
    const projectile = new Mesh( geometry, material );
    this.projectile = projectile
    this.projectile.lookAt(new Vector3(mousePos.x, 0, mousePos.y))
    this.player = player
    this.time = timeStamp
    this.projectile.position.set(player.position.x, player.position.y, player.position.z)
    this.add(this.projectile)
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

  update() {
    // this.projectile.position.set(this.player.position.x,this.player.position.y,this.player.position.z)
    this.projectile.translateZ(0.1)
  }
}