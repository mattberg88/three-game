import { Group, BoxGeometry, Mesh, MeshBasicMaterial, Vector3, Ray } from 'three';
import Projectile from './Projectile.js';
import { checkTouching } from '../utils/physics.js';

export default class Players extends Group {
  constructor() {
    super();
    const geometry = new BoxGeometry( 0.1, 0.1, 0.1 );
    const grayMaterial = new MeshBasicMaterial( {color: 'gray'} );
    const redMaterial = new MeshBasicMaterial( {color: 'red'} );
    const player1 = new Mesh( geometry, grayMaterial );
    const player2 = new Mesh( geometry, grayMaterial );
    player1.position.set(0,0.05,-1)
    player2.position.set(0,0.05,0)

    this.grayMaterial = grayMaterial
    this.redMaterial = redMaterial
    this.player1 = player1
    this.player2 = player2
    this.shotArray = []
    this
    this.add(this.player1, this.player2)
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
        if(checkTouching(s.projectile.mesh, this.player2)) {
          this.player2.material = this.redMaterial
          setTimeout(() => this.player2.material = this.grayMaterial, 100)


          console.log('hit')
        }
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