import {Body, Controller, HttpCode, HttpStatus, Post} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {register} from "tsconfig-paths";
import {NewUserDto} from "../user/dtos/new-user.dto";
import {UserDetails} from "../user/user.interface";
import {ExistingUserDto} from "../user/dtos/existing-user.dto";

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

}
