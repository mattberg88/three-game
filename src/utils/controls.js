export const movePlayer = (command, position) => {
  if(command === 'w') {
    position.z += 0.01
  }
  if(command === 's') {
    position.z -= 0.01
  }
  if(command === 'a') {
    position.x += 0.01
  }
  if(command === 'd') {
    position.x -= 0.01
  }
}