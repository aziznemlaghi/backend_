import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {UserModule} from "../user/user.module";
import {JwtModule} from "@nestjs/jwt";
import {JwtGuard} from "./guards/jwt.guards";
import {JwtStrategy} from "./guards/jwt.strategy";
import {RolesGuard} from "./guards/roles.guard";

@Module({
  imports : [UserModule,JwtModule.registerAsync({useFactory: () =>({
  secret:'secret',
  signOptions:{expiresIn: '3600s'},
  })
  })],
  controllers: [AuthController],
  providers: [AuthService,JwtGuard,JwtStrategy,RolesGuard],
})
export class AuthModule {}
