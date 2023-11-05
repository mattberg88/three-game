import { Vec3, Body } from 'cannon-es'
export const movePlayer = (command, player) => {
  switch(command) {
    case('w'): return player.translateZ(-0.1)
    case('s'): return player.translateZ(0.1)
    case('a'): return player.mesh.rotation.y += 0.1
    case('d'): return player.mesh.rotation.y -= 0.1
  }
}

// export const movePlayer = (command, body) => {
//   switch(command) {
//     case('w'): return body.applyLocalForce(new Vec3(0, 1, 15), body.position);
//     case('s'): return body.applyLocalForce(new Vec3(0, 1, -10), body.position);
//     case('a'): return body.angularVelocity.set(0, 20, 0)
//     case('d'): return body.angularVelocity.set(0, -20, 0)
//   }
// }