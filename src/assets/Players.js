import { Group, BoxGeometry, Mesh, MeshBasicMaterial, Vector3 } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import Projectile from './Projectile.js';

export default class Players extends Group {
  constructor() {
    super();
    const geometry = new BoxGeometry( 0.1, 0.1, 0.1 );
    const material = new MeshBasicMaterial( {color: 'gray'} );

    const player1 = new Mesh( geometry, material );
    const player2 = new Mesh( geometry, material );
    player1.position.set(0,0.05,-1)
    player2.position.set(0,0.05,0)
    this.player1 = player1
    this.player2 = player2
    this.shotArray = []
    this.add(this.player1, this.player2)
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

  update(timeStamp, command, mousePos, mouseClick) {
    this.player1.lookAt(new Vector3(mousePos.x, 0, mousePos.y))
    if(mouseClick) {
      const shoot = new Projectile(timeStamp, this.player1, mousePos)
      this.shotArray.push({ projectile: shoot, time: timeStamp })
      this.add(shoot)

      console.log('click')
    }
    this.shotArray.forEach(s => {
      if((timeStamp-s.time) > 1000) {
        this.remove(s.projectile)
        console.log('remove')
        this.shotArray.shift()
      } else {
        s.projectile.update()
      }
    })

    // this.sword.position.set(new Vector3 (this.player1.position.x, 1, 0))

    // this.player2.lookAt(this.player1.position)

    if(command === 87) {
      this.player1.position.z += 0.05
    }
    if(command === 83) {
      this.player1.position.z -= 0.05
    }

    if(command === 65) {
      this.player1.position.x += 0.05
    }
    if(command === 68) {
      this.player1.position.x -= 0.05
    }
    // this.rotation.y = timeStamp / 10000;
  }
}