require("dotenv").config();
const nodemailer = require("nodemailer");

class MailerService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "Outlook365",
      host: "smtp.office365.com",
      port: "587",
      tls: {
        ciphers: "SSLv3",
        rejectUnauthorized: false,
      },
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }
  async sendVerificationEmail(email, token) {
    try {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Verify your email",
        text: `
        Please verify your email by clicking on the following link:
        ${process.env.CLIENT_URL}/verify-account/${token}
        `,
      };
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async sendPasswordResetEmail(email, token) {
    try {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Reset your password",
        text: `
        Please reset your password by clicking on the following link:
        ${process.env.CLIENT_URL}/reset-password/${token}
        `,
      };
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
}

module.exports = MailerService;
