import { Injectable } from '@nestjs/common';
import { createRoomProps } from '../socket/socket.types';
import { SecurityService } from '../security/security.service';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class RoomService {
  constructor(
    private prisma: PrismaService,
    private securityService: SecurityService,
  ) {
    //
  }

  public async createRoom({
    user,
    adminPassword,
    room,
    roomPassword,
  }: createRoomProps): Promise<boolean> {
    try {
      const hashedAdminPassword = await this.securityService.hashPassword(
        adminPassword,
      );
      const hashedRoomPassword = await this.securityService.hashPassword(
        roomPassword,
      );

      const data = await this.prisma.room.create({
        data: {
          name: room,
          password: hashedRoomPassword,
          adminPassword: hashedAdminPassword,
        },
      });

      if (!data) return false;

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
