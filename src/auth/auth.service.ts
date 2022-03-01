import { Injectable } from '@nestjs/common';
import {UserService} from "../user/user.service";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private userService : UserService) {

    }

    async hashPassword(password:string):Promise<string>{
        return bcrypt.hash(password,12);
    }

    async register(user: )
}
