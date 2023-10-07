import { Controller, Get, Post, Delete, Param, Req, Res } from '@nestjs/common';
import { Response } from 'express';

import { TasksService } from './task.service';

@Controller()
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  // запросить таски
  @Get('tasks') // (auth_permission)
  async getAllTasks(@Req() req: any, @Res() res: Response): Promise<any> {
    // Response 200:
    // [ { "id": "objectid", "title": "Название", "description": "bla bla bla" }, ...]
    // Response 403: { "error_message": "Bad token" }

    try {
      // запрос на все таски пользователя
      const result = await this.taskService.findAllByUser(req.user.id);

      // проверка на нулёвость
      if (!result) {
        return res.status(200).json({ message: 'result is empty', result });
      }
      return res.status(200).json({ message: 'successfull request', result });
    } catch (error) {
      return res
        .status(500)
        .json({ error_message: 'something went wrong: ' + error });
    }
  }

  // создать таску
  @Post('task') // (auth_permission)
  async createTask(@Req() req: any, @Res() res: Response): Promise<any> {
    // Request: { "title": "Название", "description": "bla bla bla" }
    // Response 200: { "id": "Object id" }
    // Response 401: { "error_message": "Bad token" }

    try {
      const { title, description } = req.body;

      // создание таски
      const result = await this.taskService.create(
        title,
        description,
        req.user.id,
      );

      return res
        .status(200)
        .json({ message: 'successfully created task', id: result.id });
    } catch (error) {
      return res
        .status(500)
        .json({ error_message: 'something went wrong: ' + error });
    }
  }

  // удалить таску
  @Delete('task/:id') // (auth_permission)
  async deleteTask(
    @Param() params: any,
    @Req() req: any,
    @Res() res: Response,
  ): Promise<any> {
    // # Проверять если овнером этого документа является отправляющий запрос юзер
    // Response 200: [ "id": "objectid" ]
    // Response 403: { "error_message": "Is not an owner" }

    try {
      const id = params.id;

      // запросить таску
      const result = await this.taskService.findOneById(id);

      // проверить, существует ли
      if (!result) {
        return res.status(500).json({ error_message: "Task doesn't exist" });
      }

      // проверить является ли овнером
      if (result.owner === req.user.id) {
        return res.status(403).json({ error_message: 'Is not an owner' });
      }

      // удаление таски
      const deletingResult = await this.taskService.deleteOne(id);

      return res.status(200).json({ id: deletingResult._id });
    } catch (error) {
      return res
        .status(500)
        .json({ error_message: 'something went wrong: ' + error });
    }
  }
}
