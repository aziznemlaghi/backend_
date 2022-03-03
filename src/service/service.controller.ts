 import {Body, Controller, Delete, Get, Param, Patch, Post, UseGuards} from '@nestjs/common';
 import {ServiceService} from "./service.service";
 import {ServiceDocument} from "./service.schema";
 import {ApiImplicitParam} from "@nestjs/swagger/dist/decorators/api-implicit-param.decorator";
 import {JwtGuard} from "../auth/guards/jwt.guards";

@Controller('service')
export class ServiceController {

    constructor(private serviceService : ServiceService) {}

    @UseGuards(JwtGuard)
    @Post('add-Service')
    createService(
        @Body('name') name : string,
        @Body('price') price :number,
        @Body('description') description : string,
    ):Promise<ServiceDocument>{
        return this.serviceService.createService(name, price, description);
    }


    @UseGuards(JwtGuard)
    @Get('findServices')
    findAllServices():Promise<ServiceDocument[]>{
        return this.serviceService.findAllServices();
    }

    @UseGuards(JwtGuard)
    @Get('findService/:id')
    findService(@Param('id')id:string):Promise<ServiceDocument>{
        return this.serviceService.findService(id);
    }

    @UseGuards(JwtGuard)
    @Patch('update/:id')
    updateService(
        @Param('id') id: string,
        @Body('name') name: string,
        @Body('price') price: number,
        @Body('description') description?: string,
    ): Promise<ServiceDocument> {
        return this.serviceService.updateService(id, name, price, description);
    }

    @UseGuards(JwtGuard)
    @Delete('delete/:id')
    deleteService(@Param('id') id: string) {
        return this.serviceService.deleteService(id);
    }

}
