import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {UserDocument} from "./user.schema";
import {Model} from 'mongoose';
import {UserDetails} from "./user.interface";
import {ServiceDocument} from "../service/service.schema";
import {use} from "passport";
@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<UserDocument>) {

    }

    _getUserDetails(user: UserDocument): UserDetails {
        return {
            phone: user.phone,
            name: user.name,
            email: user.email,
            role: user.role,
        }
    }

    async findByEmail(email: string): Promise<UserDocument | null> {
        return this.userModel.findOne({email}).exec();
    }

    async findById(id: string): Promise<UserDetails | null> {
        const user = await this.userModel.findById(id).exec();
        if (!user) return null;
        return this._getUserDetails(user);
    }

    async create(name: string, phone: number, email: string, hashedPassword: string): Promise<UserDocument> {
        const newUser = new this.userModel({
            name,
            email,
            phone,
            password: hashedPassword,
        });
        return newUser.save()
    }



    findByUsername(name: string) {
        return this.userModel.findOne({name}).exec();
    }


    async findUser(id: string): Promise<UserDocument> {
        return this.userModel.findById(id).exec();
    }


    async updateUser(
        id: string,
        newName: string,
        newphone: number,
        newemail: string,
    ): Promise<UserDocument> {
        let existingUser = await this.findUser(id);

        existingUser.name = newName ?? existingUser.name;
        existingUser.phone = newphone ?? existingUser.phone;
        existingUser.email = newemail ?? existingUser.email;

        return existingUser.save();
    }

    async findAllUsers(): Promise<UserDocument[]> {
        return this.userModel.find().exec();
    }

}
