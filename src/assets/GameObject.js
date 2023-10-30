import { Group, Vector3, Raycaster } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export default class GameObject extends Group {
  constructor(obj) {
    const loader = new GLTFLoader();
    super();
    loader.load(obj, (gltf)=>{
      this.add(gltf.scene);
    });
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

  update(timeStamp, command, camera) {
    // this.checkCollision()
    // console.log(command)
    // this.rotation.y = timeStamp / 10000;
  }
}