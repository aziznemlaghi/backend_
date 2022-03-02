import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import {MongooseModule} from "@nestjs/mongoose";
import { ServiceModule } from './service/service.module';

@Module({
  imports: [UserModule, AuthModule,MongooseModule.forRoot('mongodb+srv://root:root@cluster0.ircee.mongodb.net/users?retryWrites=true&w=majority'), ServiceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
