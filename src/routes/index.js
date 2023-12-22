"use strict";

const { Router } = require("express");

const userRoutes = require("./users.routes");
const movieNotes = require("./movieNotes.routes");
const movieTagsRoutes = require("./movieTags.routes");

const routes = Router();

routes.use("/users", userRoutes);
routes.use("/movie_notes", movieNotes);
routes.use("/movie_tags", movieTagsRoutes);

module.exports = routes;
