const bcrypt = require("bcrypt");

class BcryptPasswordService {
  constructor() {
    this.saltRounds = 10;
  }

  async hashPassword(password) {
    return await bcrypt.hash(password, this.saltRounds);
  }

  async comparePassword(password, hash) {
    return await bcrypt.compare(password, hash);
  }
}

module.exports = BcryptPasswordService;
