import { Injectable } from '@nestjs/common';
import { createRoomProps } from '../socket/socket.types';
import { SecurityService } from '../security/security.service';

@Injectable()
export class RoomService {
  constructor(private securityService: SecurityService) {
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

      console.log({
        user,
        hashedAdminPassword,
        room,
        hashedRoomPassword,
      });

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
