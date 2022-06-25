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
    // wss.send('mouse_position 125px,125px')
    ws.send(data)
  })

  


})


