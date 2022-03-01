import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {UserDocument} from "./user.schema";
import {Model} from 'mongoose';
import {UserDetails} from "./user.interface";
@Injectable()
export class UserService {
    constructor(@InjectModel('User') private  readonly  userModel:Model<UserDocument>) {

    }

    _getUserDetails(user:UserDocument):UserDetails{
        return {
            id: user.id,
            name : user.name,
            email : user.email,
        }
    }

    async create(name : string, email:string,hashedPassword:string):Promise<UserDocument>{
        const newUser = new this.userModel({
            name,
            email,
            password : hashedPassword,
        });
        return  newUser.save()
    }
}
