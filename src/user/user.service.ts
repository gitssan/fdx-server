/* istanbul ignore file */

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './interfaces/user.interface';
import { UserDTO } from './dto/user.dto';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private TodoModel: Model<User>) { }
    async create(createTodoDTO: UserDTO): Promise<any> {
        const createdCat = new this.TodoModel(createTodoDTO);
        return createdCat.save();
    }
    async update(id, todo: UserDTO): Promise<any> {
        return await this.TodoModel.findByIdAndUpdate(id, todo, { new: true });
    }
}