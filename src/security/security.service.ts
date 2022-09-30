import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SecurityService {
  constructor() {
    //
  }

  public async hashPassword(password: string): Promise<string | null> {
    try {
      const saltOrRounds = 10;
      const hash = await bcrypt.hash(password, saltOrRounds);
      return hash;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  public async comparePassword(password: string): Promise<boolean | null> {
    try {
      const hash = await this.hashPassword(password);
      const isMatch = await bcrypt.compare(password, hash);
      return isMatch;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
