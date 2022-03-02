import { Module } from '@nestjs/common';
import { ServiceController } from './service.controller';
import { ServiceService } from './service.service';
import {MongooseModule} from "@nestjs/mongoose";
import {ServiceSchema} from "./service.schema";

@Module({
  imports:[MongooseModule.forFeature([{name:'service',schema : ServiceSchema}])],
  controllers: [ServiceController],
  providers: [ServiceService]
})
export class ServiceModule {}
