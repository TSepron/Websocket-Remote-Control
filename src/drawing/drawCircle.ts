import robot from 'robotjs'

const drawCircle = async (radius: number) => {
  if (drawCircle.isStarted)
    return 

  drawCircle.isStarted = true

  const mousePos = robot.getMousePos()
  let isNeedToFinish = false

  // finish if something went wrong
  setTimeout(() => isNeedToFinish = true, 10000)

  for (let i = 0; i <= Math.PI * 2.04; i += 0.01) {
    // Convert polar coordinates to cartesian
    const x = mousePos.x + (radius * Math.cos(i))
    const y = mousePos.y + (radius * Math.sin(i))

    if (isNeedToFinish) {
      break
    }

    await new Promise(resolve => {
        setImmediate(() => {
          robot.dragMouse(x - radius, y)
          resolve(i)
        })
    })
  }

  drawCircle.isStarted = false
}

drawCircle.isStarted = false

export { drawCircle }
