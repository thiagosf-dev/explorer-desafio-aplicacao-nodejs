"use strict";

const { compare, hash } = require("bcrypt");
const sqliteConnection = require("../database/sqlite");
const AppError = require("../utils/AppError");
const { use } = require("../routes");

class UsersController {
  static async create(request, response) {
    const { name, email, password } = request.body;

    const database = await sqliteConnection();

    const queryCheckUserExists = await database.get(
      "SELECT * FROM users WHERE email=(?)",
      [email]
    );

    const hashedPasword = await hash(password, 8);

    if (queryCheckUserExists) throw new AppError("Este e-mail já está em uso.");

    await database.run(
      "INSERT INTO users (name, email, password) VALUES (?,?,?)",
      [name, email, hashedPasword]
    );

    return response.status(201).json();
  }

  static async update(request, response) {
    const { name, email, password, oldPassword } = request.body;
    const { id } = request.params;

    if (!id) throw new AppError("O ID do usuário deve ser informado.");

    const database = await sqliteConnection();

    const user = await database.get("SELECT * FROM users WHERE id=(?)", [id]);

    if (!user) throw new AppError("Usuário não encontrado.");

    const userExists = await database.get(
      "SELECT * FROM users WHERE email=(?)",
      [email]
    );

    if (userExists) throw new AppError("Este e-mail já está em uso.");

    if (password && !oldPassword)
      throw new AppError("A senha atual deve ser informada.");

    if (password && oldPassword) {
      const checkOldPassword = await compare(oldPassword, user.password);

      if (!checkOldPassword) throw new AppError("A senha está incorreta.");
    }

    user.name = name ?? user.name;
    user.email = email ?? user.email;
    user.password = await hash(password, 8);

    await database.run(
      `UPDATE users SET name=?, email=?, password=?, updated_at=DATETIME('now') WHERE id=?`,
      [user.name, user.email, user.password, id]
    );

    return response.status(200).json();
  }
}

module.exports = UsersController;
