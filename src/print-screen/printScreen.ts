import robot from 'robotjs'
import Jimp from 'jimp'

export const printScreen = async (size = 200) => {
  const mouse = robot.getMousePos()
  const robotScreenPic = robot.screen.capture(mouse.x, mouse.y, size, size)

  const image: Jimp = await getJimpImageFromBitmap(robotScreenPic)

  const buffer = await image.getBufferAsync(Jimp.MIME_PNG)
  return buffer.toString('base64')
}

function getJimpImageFromBitmap(robotScreenPic: robot.Bitmap): Promise<Jimp> {
  return new Promise((resolve, reject) => {
    try {
      const image = new Jimp(robotScreenPic.width, robotScreenPic.height)
      let pos = 0
      image.scan(
        0, 
        0, 
        image.bitmap.width, 
        image.bitmap.height, 
        (x, y, idx) => {
          image.bitmap.data[idx + 2] = robotScreenPic.image.readUInt8(pos++)
          image.bitmap.data[idx + 1] = robotScreenPic.image.readUInt8(pos++)
          image.bitmap.data[idx + 0] = robotScreenPic.image.readUInt8(pos++)
          image.bitmap.data[idx + 3] = robotScreenPic.image.readUInt8(pos++)
        }
      )
      resolve(image)
    } catch (e) {
      console.error(e)
      reject(e)
    }
  })
}
