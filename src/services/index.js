const BcryptPasswordService = require("./bcryptPasswordService");
const { User, Page, Content } = require("../models");
const AuthService = require("./authService");
const UsersService = require("./usersService");
const PagesService = require("./pagesService");
const ContentService = require("./contentService");
const MailerService = require("./mailerService");

const passwordService = new BcryptPasswordService();
const authService = new AuthService(User, passwordService);
const usersService = new UsersService(User, passwordService);
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
