import { Injectable } from '@nestjs/common';
import { createRoomProps } from '../socket/socket.types';
import { SecurityService } from '../security/security.service';
import { PrismaService } from '../database/prisma.service';
import { Room } from '@prisma/client';

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
  }: createRoomProps): Promise<Room | null> {
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

      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  public async getListOfRooms(): Promise<Pick<Room, 'id' | 'name'>[]> {
    try {
      const rooms = await this.prisma.room.findMany({
        select: {
          id: true,
          name: true,
        },
      });
      return rooms;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
}
