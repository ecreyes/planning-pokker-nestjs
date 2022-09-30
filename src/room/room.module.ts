import { Module } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { SecurityModule } from '../security/security.module';
import { RoomService } from './room.service';

@Module({
  imports: [SecurityModule],
  providers: [PrismaService, RoomService],
  exports: [RoomService],
})
export class RoomModule {}
