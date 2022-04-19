import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Document} from "mongoose";
import {User} from "../user/user.schema";
import * as mongoose from "mongoose";
import {Service} from "../service/service.schema";

export type ReservationDocument = Reservation & Document;

@Schema()
export class Reservation{
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'user' })
    userId: User;
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'service' })
    service: Service;
    @Prop({type: Date, required: true})
    date : Date;
    @Prop({required : true})
    status  : string;
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);
