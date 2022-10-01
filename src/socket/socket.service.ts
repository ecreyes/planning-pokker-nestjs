import { Injectable } from '@nestjs/common';
import { uuid } from 'uuidv4';

@Injectable()
export class SocketService {
  public getSession(): string {
    return uuid();
  }
}
