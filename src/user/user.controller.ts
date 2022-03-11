import {Controller, Get, Param, UseGuards} from '@nestjs/common';
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
    @Roles(Role.ADMIN)
    @UseGuards(JwtGuard,RolesGuard)
    @Get(':id')
    getUser(@Param('id') id : string):Promise<  UserDetails |null>{
        return this.UserService.findById(id);
    }

    @Roles(Role.ADMIN)
    @UseGuards(JwtGuard,RolesGuard)
    @Get('AllUsers')
    findAllUsers():Promise<UserDocument[]>{
        return this.UserService.findAllUsers();
    }
}


