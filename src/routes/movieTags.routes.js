"use strict";

const { Router } = require("express");
const movieTags = Router();

const MovieTagsController = require("../controllers/MovieTagsController");

const movieTagsController = new MovieTagsController();

movieTags.get("/:user_id", movieTagsController.index);

module.exports = movieTags;
