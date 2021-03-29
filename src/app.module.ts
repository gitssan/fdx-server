/* istanbul ignore file */

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';

import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { UserService } from './user/user.service';
import { UserSchema } from './user/schemas/todo.schema';
import { UserController } from './user/user.controller';
import { getDatabaseconnectionString } from './helpers';
import { AppService } from './app.service';
import { ValidationService } from './validation/validation.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    MongooseModule.forRoot(getDatabaseconnectionString(process.env.PASS)), UserModule,
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])
  ],
  controllers: [AppController, UserController],
  providers: [UserService, AppService, ValidationService],
})
export class AppModule { }
