import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import mongoose from 'mongoose';
import {Model} from "mongoose";
import {ReservationDocument} from "./rservation.schema";
import {UserDocument} from "../user/user.schema";
import {Service} from "../service/service.schema";

@Injectable()
export class ReservationService {
  constructor(@InjectModel('reservation') private readonly reservationModel: Model<ReservationDocument>,
              @InjectModel('user') private  readonly userModel : Model<UserDocument>
              ) {

  }

  async createReservation(user : string, service:string,date : Date,status: string):Promise<ReservationDocument>{
      status="pending"
    const newReservation = new this.reservationModel({user,service,date,status});
    return newReservation.save();
  }

  async findAllReservations():Promise<ReservationDocument[]>{
    return this.reservationModel.find().sort({ _id: -1 }).populate('service').populate('user');
  }

  async findReservation(id : string) :Promise<ReservationDocument>{
    return this.reservationModel.findById(id).sort({ _id: -1 }).populate('service');
  }

//test
 async findReservationForUser(userId: string):Promise<ReservationDocument[]> {
  /** const user = await this.userModel.findById('622b417d8ebdce6f0644db4f');
   console.log(user);*/
    return this.reservationModel.find({user : userId}).sort({ _id: -1 }).populate('service');
  }

  async acceptReservation(
      id: string,
      newUser: string,
      newService: string,
      newDate: Date,
      newStatus : string
  ): Promise<ReservationDocument> {
    let existingReservation = await this.findReservation(id);

    existingReservation.user = newUser ?? existingReservation.user;
    existingReservation.service = newService ?? existingReservation.service;
    existingReservation.date = newDate ?? existingReservation.date;
    existingReservation.status = 'Accepted';

    return existingReservation.save();
  }


    async refuseReservation(
        id: string,
        newUser: string,
        newService: string,
        newDate: Date,
        newStatus : string
    ): Promise<ReservationDocument> {
        let existingReservation = await this.findReservation(id);

        existingReservation.user = newUser ?? existingReservation.user;
        existingReservation.service = newService ?? existingReservation.service;
        existingReservation.date = newDate ?? existingReservation.date;
        existingReservation.status = 'Refused';

        return existingReservation.save();
    }

    async cancelReservation(
        id: string,
        newUser: string,
        newService: string,
        newDate: Date,
        newStatus : string
    ): Promise<ReservationDocument> {
        let existingReservation = await this.findReservation(id);

        existingReservation.user = newUser ?? existingReservation.user;
        existingReservation.service = newService ?? existingReservation.service;
        existingReservation.date = newDate ?? existingReservation.date;
        existingReservation.status = 'Canceled';

        return existingReservation.save();
    }








  async deleteReservation(id: string) {
    return this.reservationModel.deleteOne({ _id: id }).exec();
  }



}
