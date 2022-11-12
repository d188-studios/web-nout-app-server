class UsersService {
  constructor(userModel, passwordService, verificationModel, encuestaModel) {
    this.usersModel = userModel;
    this.verificationModel = verificationModel;
    this.passwordService = passwordService;
    this.encuestaModel = encuestaModel;
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

    await user.update({
      verificado: true,
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
      throw new Error("User not found in 'verificaciones' relation");
    }

    return user.dataValues;
  }

  async getEncuestaValue(uuid) {
    const encuesta = await this.encuestaModel.findOne({
      where: {
        encuestado: uuid,
      },
    });

    if (!encuesta) {
      throw new Error("User not found in 'encuestas' relation");
    }

    return encuesta.dataValues;
  }
}

module.exports = UsersService;
