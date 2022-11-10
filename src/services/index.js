const BcryptPasswordService = require("./BcryptPasswordService");
const { User, Page, Content, Verificacion } = require("../models");
const AuthService = require("./AuthService");
const UsersService = require("./UsersService");
const PagesService = require("./PagesService");
const ContentService = require("./ContentService");
const MailerService = require("./MailerService");

const passwordService = new BcryptPasswordService();
const authService = new AuthService(User, passwordService);
const usersService = new UsersService(User, passwordService, Verificacion);
const pagesService = new PagesService(Page, Content);
const contentService = new ContentService(Content, Page);
const mailerService = new MailerService();

module.exports = {
  authService,
  passwordService,
  usersService,
  pagesService,
  contentService,
  mailerService,
};
