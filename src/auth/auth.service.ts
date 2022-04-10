import { Injectable } from '@nestjs/common';
import {UserService} from "../user/user.service";
import * as bcrypt from 'bcrypt';
import {NewUserDto} from "../user/dtos/new-user.dto";
import {UserDetails} from "../user/user.interface";
import {ExistingUserDto} from "../user/dtos/existing-user.dto";
import  {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(private userService : UserService,private jwtService:JwtService) {

    }

    async hashPassword(password:string):Promise<string>{
        return bcrypt.hash(password,12);
    }

    async register(user: Readonly<NewUserDto>) : Promise<UserDetails |any>{
        const {name,phone,email,password} = user;
        const existingUser = await this.userService.findByEmail(email);
        if(existingUser) return 'email taken !';
        const hashedPassword = await this.hashPassword(password);
        const newUser = await this.userService.create(name,phone ,email,hashedPassword);
        return newUser;
    }

    async doesPasswordMatch(password : string,hashedPassword : string):
    Promise<boolean>{
        return bcrypt.compare(password,hashedPassword);
    }

    async validateUser(email:string,password:string):Promise<UserDetails>{
        const user = await this.userService.findByEmail(email);
        const doesUserExist = !!user;

        if(!doesUserExist) return null;
        const doesPasswordMatch = await this.doesPasswordMatch(password,user.password);

        if(!doesPasswordMatch) return  null;
        return  this.userService._getUserDetails(user);

    }

    async login(existingUser:ExistingUserDto):Promise<{token : string}|null>{
        const {email,password} =existingUser;
        const user= await this.validateUser(email,password);

        if(!user) return null;

        const  jwt = await this.jwtService.signAsync({user});
        return {token : jwt};
    }
}
