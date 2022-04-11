import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Document} from 'mongoose';
import {Role} from "./role.enum";
export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop()
    id : string;
    @Prop({required:true})
    name : string;
    @Prop({required:true})
    phone : number;
    @Prop({required:true,unique:true})
    email : string;
    @Prop({required:true})
    password : string;


    @Prop({default : (Role.USER)})
    role : Role;



}

export const UserSchema = SchemaFactory.createForClass(User);
