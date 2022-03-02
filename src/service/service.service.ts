import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {ServiceDocument} from "./service.schema";

@Injectable()
export class ServiceService {
    constructor(@InjectModel('service') private readonly serviceModel: Model<ServiceDocument>) {

    }

   async createService(name : string, price:number,description : string):Promise<ServiceDocument>{
        const newService = new this.serviceModel({name,price,description});
        return newService.save();
    }

    async findAllServices():Promise<ServiceDocument[]>{
        return this.serviceModel.find().exec();
    }

    async findService(id : string) :Promise<ServiceDocument>{
        return this.serviceModel.findById(id).exec();
    }

    async updateService(
        id: string,
        newName: string,
        newPrice: number,
        newDescription: string,
    ): Promise<ServiceDocument> {
        let existingService = await this.findService(id);

        existingService.name = newName ?? existingService.name;
        existingService.price = newPrice ?? existingService.price;
        existingService.description = newDescription ?? existingService.description;

        return existingService.save();
    }

    async deleteService(id: string) {
        return this.serviceModel.deleteOne({ _id: id }).exec();
    }

}
