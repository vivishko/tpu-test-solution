<p align="center">
  Тестовое в <<ТПУ>>
</p>

## Задание

Реализовать 2 микросервиса: авторизация(auth), тудулист(todo).

Сервис авторизации должен иметь свою коллекцию в монге и хранить \_id(ObjectID), пароль.
И следующие методы: /signup [POST], /signin [POST], /user [GET].

Сервис тудулист. Хранит в своей коллекции задачи следующего вида:

```
{
"_id": "objectid",
"owner": "objectid of owner user",
"title": "some title",
"description": "some description"
}
```

/create [POST], /get [GET], /delete [DELETE]

Создать докерфайл и докер компоус с mongodb и сервисом.

Полное описание [в папке docs в файле Тестовое_бекенд.pdf](https://github.com/vivishko/tpu-test-solution/blob/main/docs/%D0%A2%D0%B5%D1%81%D1%82%D0%BE%D0%B2%D0%BE%D0%B5_%D0%B1%D1%8D%D0%BA%D0%B5%D0%BD%D0%B4.pdf).

## Tech stack

#### Backend: TypeScript + Nest.js + @nestjs/passport passport passport-local

#### Batabases and other tools: MongoDB + Mongoose + Docker

## Решение

Немного преобразуем задание - не нравятся названия ручек, не по restу

Бекенд должен содержать два микросервиса:

Первый - auth - содержит 3 апи-ручки:

1. POST - /signup </br>
   Request: { "password": "blablabla" } </br>
   Response: { "id": "созданный ObjectID", "token": "Сгенерированный bearer token" }

2. POST - /signin </br>
   Request: { "id": "Object id", "password": "blablabla" } </br>
   Response 200: { "token": "Сгенерированный bearer token" } </br>
   Response 401: { "error_message": "Bad id or password" }

3. GET - ~~/user~~ /me (auth bearer) </br>
   Request: В хедере авторизация по bearer </br>
   Response 200: { "id": "Object id" } </br>
   Response 403: { "error_message": "Bad token" }

Второй - todo - содержит также 3 апи ручки:

1. GET - ~~/get~~ /tasks (auth bearer) </br>
   Response 200: </br>
   [ </br>
   { "id": "objectid", "title": "Название", "description": "bla bla bla" }, </br>
   { "id": "objectid", "title": "Название", "description": "bla bla bla" } </br>
   ] </br>
   Response 403: { "error_message": "Bad token" }
2. POST - ~~/create~~ /task (auth bearer) </br>
   Request: В хедере авторизация по bearer { "title": "Название", "description": "bla bla bla" } </br>
   Response 200: { "id": "Object id" } </br>
   Response 401: { "error_message": "Bad token" }
3. DELETE - ~~/delete~~ /task/:id (auth bearer) </br>
   Request: # Проверять если овнером этого документа является отправляющий запрос юзер </br>
   { "id": "objectid" } </br>
   Response 200: [ "id": "objectid" ] </br>
   Response 403: { "error_message": "Is not an owner" }

Необходимо также использовать какой-либо gateway для проксирования запросов к микросервисам. Будем исползовать nginx.

Поднять Docker compose:

MongoDB -> nginx -> auth-service -> todo-service

## Инструкция по использованию

1. Склонировать репо

По ssh

```bash
$ git clone git@github.com:vivishko/tpu-test-solution.git
```

По https

```bash
$ git clone https://github.com/vivishko/tpu-test-solution.git
```

2. Запустить докер контейнеры

```bash
$ docker-compose up -d
```

```bash
$ docker-compose down
```

3. Обратиться к сервису через порт 80 через Postman или любым другим удобным способом с урлом начинающимся на /api/ (ВАЖНО: прочитать [секцию с решением](https://github.com/vivishko/tpu-test-solution#%D1%80%D0%B5%D1%88%D0%B5%D0%BD%D0%B8%D0%B5), т.к. названия ручек были изменены)

пример запроса: /auth/signup

Результат:

1. задание с cron - его реализация в логах

2. для запроса на наиболее изменившийся адрес необходимо с помощью Postman (или подобных тулзов) отправлять GET запрос на http://localhost:3000/address

## TODO
