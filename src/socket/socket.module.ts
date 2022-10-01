import { Module } from '@nestjs/common';
import { RoomModule } from '../room/room.module';
import { SocketGateway } from './socket.gateway';
import { SocketService } from './socket.service';

@Module({
  imports: [RoomModule],
  providers: [SocketGateway, SocketService],
  exports: [],
})
export class SocketModule {}
