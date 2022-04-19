import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import mongoose from 'mongoose';
import {Model} from "mongoose";
import {ReservationDocument} from "./rservation.schema";

@Injectable()
export class ReservationService {
  constructor(@InjectModel('reservation') private readonly reservationModel: Model<ReservationDocument>) {

  }

  async createReservation(user : string, service:string,date : Date,status: string):Promise<ReservationDocument>{
    const newReservation = new this.reservationModel({user,service,date,status});
    return newReservation.save();
  }

  async findAllReservations():Promise<ReservationDocument[]>{
    return this.reservationModel.find().exec();
  }

  async findReservation(id : string) :Promise<ReservationDocument>{
    return this.reservationModel.findById(id).exec();
  }

//test
  async findReservationForUser(user: string):Promise<ReservationDocument[]> {
    return this.reservationModel.find().where('userId').equals(user);}


  /**async updateReservation(
      id: string,
      newUser: string,
      newService: string,
      newDate: Date,
  ): Promise<ReservationDocument> {
    let existingReservation = await this.findReservation(id);

    existingReservation.user = newUser ?? existingReservation.user;
    existingReservation.service = newService ?? existingReservation.service;
    existingReservation.date = newDate ?? existingReservation.date;

    return existingReservation.save();
  }*/

  async deleteReservation(id: string) {
    return this.reservationModel.deleteOne({ _id: id }).exec();
  }



}
