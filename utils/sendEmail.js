import nodemailer from 'nodemailer';
 const sendMail = async (email, subject, message) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USER_MAIL,
      pass: process.env.USER_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: process.env.USER_MAIL,
    to: email,
    subject,
    text: message,
  });
};

export default sendMail;