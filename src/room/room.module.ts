import { Module } from '@nestjs/common';
import { SecurityModule } from '../security/security.module';
import { RoomService } from './room.service';

@Module({
  imports: [SecurityModule],
  providers: [RoomService],
  exports: [RoomService],
})
export class RoomModule {}
