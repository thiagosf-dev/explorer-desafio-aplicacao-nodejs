"use strict";

const { Router } = require("express");
const moviesNotesRoutes = Router();

const MovieNotesController = require("../controllers/MovieNotesController");

const moviesNotesController = new MovieNotesController();

moviesNotesRoutes.get("/:id", moviesNotesController.show);
moviesNotesRoutes.get("/", moviesNotesController.index);
moviesNotesRoutes.post("/:user_id", moviesNotesController.create);
moviesNotesRoutes.delete("/:id", moviesNotesController.delete);

module.exports = moviesNotesRoutes;
