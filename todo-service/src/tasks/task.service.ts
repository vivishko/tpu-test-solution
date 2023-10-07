import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class TasksService {
  constructor(@InjectModel('Task') private taskModel: Model<any>) {}

  async create(title: string, description: string, id: string): Promise<any> {
    const task = new this.taskModel({ title, description, owner: id });
    return await task.save();
  }

  async findOneById(id: string): Promise<any> {
    return this.taskModel.findById(id).exec();
  }
  async findAll(): Promise<any> {
    return this.taskModel.find().exec();
  }

  async findAllByUser(id: string): Promise<any> {
    return this.taskModel.find({ owner: id }).exec();
  }

  async deleteOne(id: string): Promise<any> {
    return await this.taskModel.findByIdAndDelete(id).exec();
  }
}
