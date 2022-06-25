import robot from 'robotjs'
import { 
  WebSocketServer, 
  createWebSocketStream, 
  AddressInfo 
} from 'ws'
import { drawCircle } from './drawing/drawCircle'

const wss = new WebSocketServer({ port: 8080 })


wss.on('connection', function connection(ws) {
  const duplex = createWebSocketStream(ws, {
    allowHalfOpen: false,
  })

  duplex.on('data', (chunk: Buffer) => {

    const data = chunk.toString()
    console.log(data)

    const [command, ...args] = data.split(' ')

    const mouse = robot.getMousePos();
    console.log("Mouse is at x:" + mouse.x + " y:" + mouse.y)
    
    let yOffset, xOffset, radius

    switch (command) {
      case 'mouse_up':
        yOffset = Number(args[0])
        robot.moveMouse(mouse.x, mouse.y - yOffset)
        break
      case 'mouse_down':
        yOffset = Number(args[0])
        robot.moveMouse(mouse.x, mouse.y + yOffset)
        break
      case 'mouse_left':
        xOffset = Number(args[0])
        robot.moveMouse(mouse.x - xOffset, mouse.y)
        break
      case 'mouse_right':
        xOffset = Number(args[0])
        robot.moveMouse(mouse.x + xOffset, mouse.y)
        break
    }

    switch (command) {
      case 'draw_circle':
        radius = Number(args[0])
        drawCircle(radius)
        break
    }

    // wss.send('mouse_position 125px,125px')
    ws.send(data)
  })

  


})


