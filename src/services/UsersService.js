class UsersService {
  constructor(userModel, passwordService, verificationModel) {
    this.usersModel = userModel;
    this.verificationModel = verificationModel;
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
    const user = await this.verificationModel.findOne({
      where: {
        usuario: uuid,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    if (user.verificado) {
      throw new Error("User already authorized");
    }

    const now = new Date();

    await user.update({
      verificado: true,
    });
    await user.update({
      fecha_verificacion: now.toISOString().split("T")[0],
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

  async getVerifiedValue(uuid) {
    const user = await this.verificationModel.findOne({
      where: {
        usuario: uuid,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return user.dataValues;
  }
}

module.exports = UsersService;
