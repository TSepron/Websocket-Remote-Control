import robot from 'robotjs'

const drawRectangle = async (width: number, length: number) => {
  // to avoid multiple calls
  if (drawRectangle.isStarted)
    return

  drawRectangle.isStarted = true

  // finish if something went wrong
  let isNeedToFinish = false
  const timerId = setTimeout(() => isNeedToFinish = true, 10000)

  const {x: startX, y: startY} = robot.getMousePos()

  // line from left top corner to right top corner
  // ------------->
  for (let i = startX; i !== startX + width; i += 1) {
    const x = i
    const y = startY

    if (isNeedToFinish) {
      break
    }

    await new Promise(resolve => {
      setImmediate(() => {
        robot.dragMouse(x, y)
        resolve(i)
      })
    })
  }

  // line from right top corner to right bottom corner
  // |
  // |
  // V
  for (let j = startY; j !== startY + length; j += 1) {
    const x = startX + width
    const y = j

    if (isNeedToFinish) {
      break
    }

    await new Promise(resolve => {
      setImmediate(() => {
        robot.dragMouse(x, y)
        resolve(j)
      })
    })
  }

  // line from right bottom corner to left bottom corner
  // <-----------------
  for (let i = startX + width; i !== startX; i -= 1) {
    const x = i
    const y = startY + length

    if (isNeedToFinish) {
      break
    }

    await new Promise(resolve => {
      setImmediate(() => {
        robot.dragMouse(x, y)
        resolve(i)
      })
    })
  }

  // line from left bottom corner to left top corner
  // ∧
  // |
  // |
  for (let j = startY + length; j !== startY; j -= 1) {
    const x = startX
    const y = j

    if (isNeedToFinish) {
      break
    }

    await new Promise(resolve => {
      setImmediate(() => {
        robot.dragMouse(x, y)
        resolve(j)
      })
    })
  }

  // after all
  clearTimeout(timerId)
  drawRectangle.isStarted = false
}

drawRectangle.isStarted = false

export { drawRectangle }
