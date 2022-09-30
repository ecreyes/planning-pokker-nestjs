import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  private server: Server;

  constructor() {
    //
  }

  public handleConnection(client: Socket, ...args: any[]) {
    console.log('client connected!', client.id);
  }

  public handleDisconnect(client: Socket) {
    console.log('client disconnected!', client.id);
  }
}
