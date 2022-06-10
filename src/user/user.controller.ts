import {Body, Controller, Get, Param, Patch, UseGuards} from '@nestjs/common';
import {UserService} from "./user.service";
import {UserDetails} from "./user.interface";
import {Roles} from "../auth/decorators/roles.decorator";
import {Role} from "./role.enum";
import {ServiceDocument} from "../service/service.schema";
import {UserDocument} from "./user.schema";
import {JwtGuard} from "../auth/guards/jwt.guards";
import {RolesGuard} from "../auth/guards/roles.guard";

@Controller('user')
export class UserController {
    constructor(private UserService : UserService) {
    }

    /**@Roles(Role.ADMIN,Role.USER)
     @UseGuards(JwtGuard,RolesGuard)*/
    @Get('findUsers')
    findAllUsers():Promise<UserDocument[]>{
        return this.UserService.findAllUsers();
    }




    @Patch('updateUser/:id')
    updateUser(
        @Param('id') id: string,
        @Body('name') name: string,
        @Body('phone') phone?: number,
        @Body('email') email?: string,
    ): Promise<UserDocument> {
        return this.UserService.updateUser(id, name, phone, email);
    }



    /**@Roles(Role.ADMIN)
    @UseGuards(JwtGuard,RolesGuard)*/
    @Get(':id')
    getUser(@Param('id') id : string):Promise<  UserDetails |null>{
        return this.UserService.findById(id);
    }
}


