import {Body, Controller, Delete, Get, Param, Patch, Post, UseGuards} from '@nestjs/common';

import {JwtGuard} from "../auth/guards/jwt.guards";
import {Roles} from "../auth/decorators/roles.decorator";
import {Role} from "../user/role.enum";
import {RolesGuard} from "../auth/guards/roles.guard";
import {ReservationService} from "./reservation.service";
import {ReservationDocument} from "./rservation.schema";

@Controller('reservation')
export class ReservationController {

  constructor(private reservationService : ReservationService) {}

  @Roles(Role.ADMIN)
  @UseGuards(JwtGuard,RolesGuard)
  @Post('add')
  createReservation(
      @Body('user') user : string,
      @Body('service') service :string,
      @Body('date') date : Date,
      @Body('status') status : string
  ):Promise<ReservationDocument>{
    return this.reservationService.createReservation(user, service, date,status);
  }


/** 
  @Roles(Role.ADMIN,Role.USER)
  @UseGuards(JwtGuard,RolesGuard)*/
  @Get('findReservations')
  findAllReservations():Promise<ReservationDocument[]>{
    return this.reservationService.findAllReservations();
  }


  @Roles(Role.ADMIN,Role.USER)
  @UseGuards(JwtGuard,RolesGuard)
  @Get('findReservation/:id')
  findReservationById(@Param('id')id:string):Promise<ReservationDocument>{
    return this.reservationService.findReservation(id);
  }

//test
/** 
  @Roles(Role.ADMIN,Role.USER)
  @UseGuards(JwtGuard,RolesGuard)*/
  @Get('findReservationByUser/:id')
  findReservationByUser(@Param('user')user:string):Promise<ReservationDocument[]>{
    return this.reservationService.findReservationForUser(user);
  }

  /**@Roles(Role.ADMIN)
  @UseGuards(JwtGuard,RolesGuard)
  @Patch('updateReservation/:id')
  updateService(
      @Param('id') id: string,
      @Body('user') user: string,
      @Body('service') service: string,
      @Body('date') date?: Date,
  ): Promise<ReservationDocument> {
    return this.reservationService.updateReservation(id, user, service, date);
  }*/


 @Roles(Role.ADMIN)
  @UseGuards(JwtGuard,RolesGuard)
  @Delete('delete/:id')
  deleteReservation(@Param('id') id: string) {
    return this.reservationService.deleteReservation(id);
  }

}
