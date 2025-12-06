import nodemailer from 'nodemailer';

const sendEmail = async function sendEmail(to, subject, text) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USER_MAIL,
      pass: process.env.USER_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: process.env.USER_MAIL,
    to,
    subject,
    text,
  });
};
 
export default sendEmail;