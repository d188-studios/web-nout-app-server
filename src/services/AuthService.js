class AuthService {
  constructor(userModel, passwordService) {
    this.usersModel = userModel;
    this.passwordService = passwordService;
  }

  async signUp(username, email, nombre, apellido, password) {
    const hash = await this.passwordService.hashPassword(password);
    const newUser = await this.usersModel.create({
      username,
      email,
      nombre,
      apellido,
      password: hash,
    });
    return newUser.dataValues;
  }

  async signIn(username, password) {
    const user = await this.usersModel.findOne({
      where: {
        username,
      },
    });
    if (!user) {
      throw new Error("User not found");
    }
    const isPasswordValid = await this.passwordService.comparePassword(
      password,
      user.password
    );
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }
    return user.dataValues;
  }
  async getUserByEmail(email) {
    const user = await this.usersModel.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      throw new Error("User not found");
    }
    return user.dataValues;
  }
}

module.exports = AuthService;
