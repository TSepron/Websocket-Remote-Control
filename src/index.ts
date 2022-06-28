import robot from 'robotjs'
import { 
  WebSocketServer, 
  createWebSocketStream
} from 'ws'
import { drawCircle } from './drawing/drawCircle'
import { drawRectangle } from './drawing/drawRectangle'
import { drawSquare } from './drawing/drawSquare'
import { getMousePosition } from './navigation/getMousePosition'
import { moveMouseHorizontally } from './navigation/moveMouseHorizontally'
import { moveMouseVertically } from './navigation/moveMouseVertically'
import { printScreen } from './print-screen/printScreen'

const PORT = 8080

const wss = new WebSocketServer({ port: PORT })
console.log(`WebSocket Server on port ${PORT}`)

wss.on('connection', function connection(ws) {
  const duplex = createWebSocketStream(ws, {
    decodeStrings: false,
  })

  duplex.on('data', (chunk: Buffer) => {

    const data = chunk.toString()
    console.log(data)

    const [command, ...args] = data.split(' ')

    let yOffset: number, 
      xOffset: number, 
      radius: number, 
      width: number, 
      length: number

    // navigation
    switch (command) {
      case 'mouse_up':
        yOffset = Number(args[0])
        moveMouseVertically(-yOffset)
        break
      case 'mouse_down':
        yOffset = Number(args[0])
        moveMouseVertically(yOffset)
        break
      case 'mouse_left':
        xOffset = Number(args[0])
        moveMouseHorizontally(-xOffset)
        break
      case 'mouse_right':
        xOffset = Number(args[0])
        moveMouseHorizontally(xOffset)
        break
      case 'mouse_position':
        return duplex.write(getMousePosition())
    }

    // drawing
    switch (command) {
      case 'draw_circle':
        radius = Number(args[0])
        drawCircle(radius)
        break
      case 'draw_rectangle':
        width = Number(args[0])
        length = Number(args[1])
        drawRectangle(width, length)
        break
      case 'draw_square':
        width = Number(args[0])
        drawSquare(width)
        break
    }

    // print screen
    if (command === 'prnt_scrn') {
      printScreen()
        .then(base64Str => duplex.write(`${command} ${base64Str}`))
        .catch(err => console.log(err))

      return 
    }

    // send received command back
    duplex.write(data)
  })
})


