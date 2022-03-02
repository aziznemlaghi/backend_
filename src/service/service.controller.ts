 import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
 import {ServiceService} from "./service.service";
 import {ServiceDocument} from "./service.schema";

@Controller('service')
export class ServiceController {

    constructor(private serviceService : ServiceService) {}

    @Post()
    createService(
        @Body('name') name : string,
        @Body('price') price :number,
        @Body('description') description? : string,
    ):Promise<ServiceDocument>{
        return this.serviceService.createService(name, price, description);
    }

    @Get()
    findAllServices():Promise<ServiceDocument[]>{
        return this.serviceService.findAllServices();
    }

    @Get(':id')
    findService(@Param('id')id:string):Promise<ServiceDocument>{
        return this.serviceService.findService(id);
    }

    @Patch(':id')
    updateService(
        @Param('id') id: string,
        @Body('name') name: string,
        @Body('price') price: number,
        @Body('description') description?: string,
    ): Promise<ServiceDocument> {
        return this.serviceService.updateService(id, name, price, description);
    }

    @Delete(':id')
    deleteService(@Param('id') id: string) {
        return this.serviceService.deleteService(id);
    }
}
