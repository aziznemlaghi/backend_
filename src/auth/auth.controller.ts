import {Body, Controller, HttpCode, HttpStatus, Post, UseGuards} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {register} from "tsconfig-paths";
import {NewUserDto} from "../user/dtos/new-user.dto";
import {UserDetails} from "../user/user.interface";
import {ExistingUserDto} from "../user/dtos/existing-user.dto";
import {use} from "passport";
import {Roles} from "./decorators/roles.decorator";
import {Role} from "../user/role.enum";
import {JwtGuard} from "./guards/jwt.guards";
import {RolesGuard} from "./guards/roles.guard";

@Controller('auth')
export class AuthController {
    constructor(private authService : AuthService) {}

    @Post('register')
    @HttpCode(HttpStatus.OK)
    register(@Body() user : NewUserDto):Promise<UserDetails | null>{
            return this.authService.register(user);
        }


    @Post('login')
    @HttpCode(HttpStatus.OK)
    login(@Body() user : ExistingUserDto):Promise<{token : string} |null>{
        return this.authService.login(user);

    }


    @Post('adminLog')
    @HttpCode(HttpStatus.OK)
    AdminLogin(@Body() user : ExistingUserDto):Promise<{token : string} |null>{
        return this.authService.login(user);

    }
}
