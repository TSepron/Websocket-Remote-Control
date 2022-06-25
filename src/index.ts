import robot from 'robotjs'

import { 
  WebSocketServer, 
  createWebSocketStream, 
  AddressInfo 
} from 'ws'

const wss = new WebSocketServer({ port: 8080 })


wss.on('connection', function connection(ws) {
  const duplex = createWebSocketStream(ws, {
    allowHalfOpen: false,
  })

  duplex.on('data', (chunk: Buffer) => {

    const data = chunk.toString()
    console.log(data)

    const [command, ...coordsOffsets] = data.split(' ')

    const mouse = robot.getMousePos();
    console.log("Mouse is at x:" + mouse.x + " y:" + mouse.y)
    
    let yOffset, xOffset

    switch (command) {
      case 'mouse_up':
        yOffset = Number(coordsOffsets[0])
        robot.moveMouse(mouse.x, mouse.y - yOffset)
        break
      case 'mouse_down':
        yOffset = Number(coordsOffsets[0])
        robot.moveMouse(mouse.x, mouse.y + yOffset)
        break
      case 'mouse_left':
        xOffset = Number(coordsOffsets[0])
        robot.moveMouse(mouse.x - xOffset, mouse.y)
        break
    }

    // wss.send('mouse_position 125px,125px')
    ws.send(data)
  })

  


})


