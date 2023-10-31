import { Group, BoxGeometry, Mesh, MeshBasicMaterial, Vector3, Ray } from 'three';
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
    this
    this.add(this.player1, this.player2)
  }
  checkCollision(collidableMeshList, mesh) {
    for (var vertexIndex = 0; vertexIndex < mesh.geometry.vertices.length; vertexIndex++) {
      var localVertex = mesh.geometry.vertices[vertexIndex].clone();
      var globalVertex = mesh.matrix.multiplyVector3(localVertex);
      var directionVector = globalVertex.subSelf( mesh.position );

      var ray = new Ray( mesh.position, directionVector.clone().normalize() );
      var collisionResults = ray.intersectObjects( collidableMeshList );
      if ( collisionResults.length > 0 && collisionResults[0].distance < directionVector.length() )
      {
        console.log('hit')
      }
    }
  }
  update(timeStamp, command, mousePos, mouseClick) {
    this.player1.lookAt(new Vector3(mousePos.x, 0, mousePos.y))

    if(mouseClick) {
      const shoot = new Projectile(timeStamp, this.player1, mousePos)
      this.shotArray.push({ projectile: shoot, time: timeStamp })
      // this.checkCollision([
      //   this.player2
      // ], shoot)
      this.add(shoot)
    }

    this.shotArray.forEach(s => {
      if((timeStamp-s.time) > 1000) {
        this.remove(s.projectile)
        this.shotArray.shift()
      } else {
        s.projectile.update()
      }
    })

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
  }
}