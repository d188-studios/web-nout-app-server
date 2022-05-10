class UsersService {
  constructor(userModel, passwordService) {
    this.usersModel = userModel;
    this.passwordService = passwordService;
  }

  async getUserByUuid(uuid) {
    const user = await this.usersModel.findOne({
      where: {
        uuid,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return user.dataValues;
  }

  async auhorizeUser(uuid) {
    const user = await this.usersModel.findOne({
      where: {
        uuid,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    if (user.authorized) {
      throw new Error("User already authorized");
    }

    await user.update({
      authorized: true,
    });
  }

  async updatePassword(uuid, password) {
    const user = await this.usersModel.findOne({
      where: {
        uuid,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const hash = await this.passwordService.hashPassword(password);
    await user.update({
      password: hash,
    });
  }
}

module.exports = UsersService;
