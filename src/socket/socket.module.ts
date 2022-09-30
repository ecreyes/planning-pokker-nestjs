import { Module } from '@nestjs/common';
import { RoomModule } from '../room/room.module';
import { SocketGateway } from './socket.gateway';

@Module({
  imports: [RoomModule],
  providers: [SocketGateway],
  exports: [],
})
export class SocketModule {}
