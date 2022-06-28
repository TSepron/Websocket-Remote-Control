import robot from 'robotjs'

export const moveMouseVertically = (yOffset: number) => {
  const mouse = robot.getMousePos()

  robot.moveMouse(mouse.x, mouse.y + yOffset)
}