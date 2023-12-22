"use strict";

const knex = require("../database/knex");

class MovieTagsController {
  async index(request, response) {
    const { user_id } = request.params;

    const tags = await knex("movie_tags").where({ user_id }).orderBy("name");

    return response.status(200).json(tags);
  }
}

module.exports = MovieTagsController;
