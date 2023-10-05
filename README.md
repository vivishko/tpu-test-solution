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

Бекенд должен содержать два микросервиса:

Первый - auth - содержит 3 апи-ручки:

1. POST - /signup
   Request: { "password": "blablabla" }
   Response: { "id": "созданный ObjectID", "token": "Сгенерированный bearer token" }
2. POST - /signin
   Request: { "id": "Object id", "password": "blablabla" }
   Response 200: { "token": "Сгенерированный bearer token" }
   Response 401: { "error_message": "Bad id or password" }
3. GET - /user
   Request: В хедере авторизация по bearer
   Response 200: { "id": "Object id" }
   Response 403: { "error_message": "Bad token" }

Второй - todo - содержит также 3 апи ручки:

1. POST - /create
   В header авторизация по bearer
   Request: В хедере авторизация по bearer { "title": "Название", "description": "bla bla bla" }
   Response 200: { "id": "Object id" }
   Response 401: { "error_message": "Bad token" }
2. GET - /get
   В header авторизация по bearer
   Response 200:
   [
   { "id": "objectid", "title": "Название", "description": "bla bla bla" },
   { "id": "objectid", "title": "Название", "description": "bla bla bla" }
   ]
   Response 403: { "error_message": "Bad token" }
3. DELETE - /delete
   В header авторизация по bearer
   Request: # Проверять если овнером этого документа является отправляющий запрос юзер
   { "id": "objectid" }
   Response 200: [ "id": "objectid" ]
   Response 403: { "error_message": "Is not an owner" }

Поднять Docker compose:

MongoDB -> auth-service -> todo-service

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

3. Обратиться к сервису auth через порт 8000 и к todo через порт 8001 через Postman или любым другим удобным способом

пример запроса на порт 8000: /auth/signup
пример запроса на порт 8001: /todo/create

Результат:

1. задание с cron - его реализация в логах

2. для запроса на наиболее изменившийся адрес необходимо с помощью Postman (или подобных тулзов) отправлять GET запрос на http://localhost:3000/address

## TODO
