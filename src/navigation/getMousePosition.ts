import robot from 'robotjs'

export const getMousePosition = () => {
  const mouse = robot.getMousePos()

  return `mouse_position ${mouse.x}px,${mouse.y}px`
}