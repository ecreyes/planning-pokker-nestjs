import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { RoomService } from '../room/room.service';
import { SocketService } from './socket.service';
import { createRoomProps } from './socket.types';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  private server: Server;

  constructor(
    private roomService: RoomService,
    private socketService: SocketService,
  ) {
    //
  }

  public handleConnection(client: Socket, ...args: any[]) {
    console.log('client connected!', client.id);
    this.server.to(client.id).emit('session', this.socketService.getSession());
  }

  public handleDisconnect(client: Socket) {
    console.log('client disconnected!', client.id);
  }

  @SubscribeMessage('getRooms')
  public async getRooms() {
    try {
      const allRooms = await this.roomService.getListOfRooms();
      return allRooms;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  @SubscribeMessage('createRoom')
  public async roomConnection(
    client: Socket,
    params: createRoomProps,
  ): Promise<boolean> {
    try {
      const room = await this.roomService.createRoom(params);
      if (room) {
        this.server.emit('roomAdded', { id: room.id, name: room.name });
        return true;
      }
      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
