const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  let transporter;

  if (process.env.NODE_ENV === "development") {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
    logger: process.env.SMTP_LOGGER === "true" || false,
    secure: process.env.SMTP_SECURE === "true" || true,
    tls: {
      rejectUnauthorized: process.env.SMTP_TLS === "true" || false,
    },
  });
  const message = {
    from: `${process.env.EMAIL_FROM_NAME} <${process.env.FROM_EMAIL}>`,
    to: options.email,
    subject: options.subject,
    html: options.message,
  };

  if (options.subject === "Inquiry on Ment0r.") {
    message.from = `${options.fullName} <${options.email}>`;
    message.to = process.env.TO_EMAIL;
  }

  await transporter.sendMail(message);
};

module.exports.sendEmail = sendEmail;
