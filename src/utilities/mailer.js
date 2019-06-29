import nodemailer from 'nodemailer';
import keys from './config';

/**
 *@description - A function for sending mail
 *
 * @param {Object} message Mail Details
 *
 * @returns {void} void
 */

const config = {
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: keys.email,
    pass: keys.password,
  },
  tls: {
    rejectUnauthorized: false,
  },
  logger: false,
  debug: false, // include SMTP traffic in the logs
};
const mailer = async (message) => {
  const {
    to, subject, text, html, attachments,
  } = message;

  const mailOptions = {
    to,
    from: '"NEMSA Web " <markokaba99@gmail.com>',
    subject,
    text,
    html,
    attachments,
  };

  try {
    const transporter = await nodemailer.createTransport(config);
    return transporter.sendMail(mailOptions);
  } catch (err) {
    throw err;
  }
};

export default mailer;
