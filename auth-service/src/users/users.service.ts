import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<any>) {}

  async create(password: string): Promise<any> {
    const user = new this.userModel({ password });
    return await user.save();
  }

  async findOneById(id: string): Promise<any> {
    return this.userModel.findById(id).exec();
  }

  async findAll(): Promise<any> {
    return this.userModel.find().exec();
  }
}
