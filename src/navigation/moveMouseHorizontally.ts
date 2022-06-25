import robot from 'robotjs'

export const moveMouseHorizontally = (xOffset: number) => {
  const mouse = robot.getMousePos()
  
  robot.moveMouse(mouse.x + xOffset, mouse.y)
}