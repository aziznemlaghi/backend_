import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {ServiceSchema} from "../service/service.schema";
import {Reservation, ReservationSchema} from "./rservation.schema";
import {UserSchema} from "../user/user.schema";

@Module({
  imports:[MongooseModule.forFeature([{name:'reservation',schema : ReservationSchema},
    {name:'service',schema : ServiceSchema},{name : 'User',schema:UserSchema}])],

  controllers: [ReservationController],
  providers: [ReservationService]
})
export class ReservationModule {}
