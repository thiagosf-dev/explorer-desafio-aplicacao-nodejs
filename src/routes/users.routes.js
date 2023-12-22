"use strict";

const { Router } = require("express");
const usersRoutes = Router();

const UserController = require("../controllers/UsersController");

function infoMiddleware(request, response, next) {
  console.info(`👉 [${request.method}]: ${request.originalUrl}`);
  next();
}

usersRoutes.post("/", UserController.create);
usersRoutes.put("/:id", UserController.update);

module.exports = usersRoutes;
