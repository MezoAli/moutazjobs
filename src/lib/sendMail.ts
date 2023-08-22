import nodemailer from "nodemailer";
interface SendMailProps {
  to: string;
  subject: string;
  text: string;
  html: string;
}

export const sendMail = async ({ to, subject, text, html }: SendMailProps) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: "MoutazJobs",
      to,
      subject,
      text,
      html,
    });
  } catch (error: any) {
    console.log(error);
  }
};
