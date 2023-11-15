import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const { MAIL_HOST, MAIL_PORT, MAIL_USER, MAIL_PWD, MAIL_DOMAIN } = process.env;

console.log(MAIL_DOMAIN, MAIL_HOST, MAIL_PORT, MAIL_USER, MAIL_PWD);

const html = (name, link) => {
  return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Account Registration</title>
      <style>
        body {
          font-family: 'Arial', sans-serif;
          background-color: #f4f4f4;
          margin: 0;
          padding: 0;
        }
    
        .container {
          max-width: 600px;
          margin: 20px auto;
          background-color: #ffffff;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
    
        h2 {
          color: #333333;
        }
    
        p {
          color: #666666;
        }
    
        #cta-button {
          display: inline-block;
          padding: 10px 20px;
          background-color: #007bff;
          color: #ffffff;
          text-decoration: none;
          border-radius: 5px;
        }
    
        .footer {
          margin-top: 20px;
          color: #888888;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h2>Welcome, ${name}!</h2>
        <p>Thank you for registering with our app. We're excited to have you on board.</p>
        <p>To get started, please click the confirmation link below:</p>
        <a href="${link}" style="background-color: #007bff; color: #ffffff; text-decoration: none; padding: 10px 20px; border-radius: 5px; display: inline-block; font-weight: bold;">Confirm Your Email</a>
        <p class="footer">If you didn't register on our platform, please ignore this email.</p>
      </div>
    </body>
    </html>
    `;
};

const sendMail = async (to, subject, html) => {
  try {
    const transporter = nodemailer.createTransport({
      host: MAIL_HOST,
      port: MAIL_PORT,
      requireTLS: true,
      auth: {
        user: MAIL_USER,
        pass: MAIL_PWD,
      },
    });

    const info = await transporter.sendMail({
      from: `noreply@${MAIL_DOMAIN}`,
      to,
      subject,
      html,
    });

    return info;
  } catch (error) {
    console.log(error);
  }
};

export { sendMail, html };
