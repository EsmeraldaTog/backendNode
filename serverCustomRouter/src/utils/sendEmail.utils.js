import { createTransport } from "nodemailer";
import __dirname from "../../utils.js";

export default async function sendEmail(data) {
  try {
    const transport = createTransport({
      service: "gmail",
      port: process.env.PORT,
      auth: { user: process.env.G_MAIL, pass: process.env.G_PASS },
    });
    await transport.sendMail({
      from: `CODER <${process.env.G_MAIL}>`,
      to: data.email,
      subject: `USER ${data.name.toUpperCase()} REGISTERED!`,
      html: "<h1>USER REGISTERED!<h1>",
    });
  } catch (error) {
    throw error;
  }
}
