import {Body, Controller, Delete, Get, Param, Patch, Post, UseGuards} from '@nestjs/common';
import {ServiceService} from "./service.service";
import {ServiceDocument} from "./service.schema";
import {JwtGuard} from "../auth/guards/jwt.guards";
import {Roles} from "../auth/decorators/roles.decorator";
import {Role} from "../user/role.enum";
import {RolesGuard} from "../auth/guards/roles.guard";

@Controller('service')
export class ServiceController {

    constructor(private serviceService : ServiceService) {}

    /**@Roles(Role.ADMIN)
    @UseGuards(JwtGuard,RolesGuard)*/
    @Post('addService')
    createService(
        @Body('name') name : string,
        @Body('price') price :number,
        @Body('description') description : string,
    ):Promise<ServiceDocument>{
        return this.serviceService.createService(name, price, description);
    }

    /**@Roles(Role.ADMIN,Role.USER)
    @UseGuards(JwtGuard,RolesGuard)
    @UseGuards(JwtGuard,RolesGuard)*/
    @Get('findServices')
    findAllServices():Promise<ServiceDocument[]>{
        return this.serviceService.findAllServices();
    }


    /**@Roles(Role.ADMIN,Role.USER)
    @UseGuards(JwtGuard,RolesGuard)*/
    @Get('findService/:id')
    findService(@Param('id')id:string):Promise<ServiceDocument>{
        return this.serviceService.findService(id);
    }

    /**@Roles(Role.ADMIN)
    @UseGuards(JwtGuard,RolesGuard)*/
    @Patch('updateService/:id')
    updateService(
        @Param('id') id: string,
        @Body('name') name: string,
        @Body('price') price: number,
        @Body('description') description?: string,
    ): Promise<ServiceDocument> {
        return this.serviceService.updateService(id, name, price, description);
    }


    /**@Roles(Role.ADMIN)
    @UseGuards(JwtGuard,RolesGuard)*/
    @Delete('delete/:id')
    deleteService(@Param('id') id: string) {
        return this.serviceService.deleteService(id);
    }

}
