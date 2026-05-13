"use server";

import nodemailer from "nodemailer";

export async function sendEmail(formData: {
  name: string;
  email: string;
  message: string;
}) {
  const { name, email, message } = formData;

  // ⚠️ Add these to your .env.local file (never commit them)
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,       // smtp.gmail.com
    port: Number(process.env.EMAIL_PORT) || 587,
    secure: false,                       // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,     // your full Gmail address
      pass: process.env.EMAIL_PASS,     // Gmail App Password (16 chars)
    },
  });

  try {
    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: process.env.EMAIL_TO,          // where you want to receive messages
      replyTo: email,
      subject: `Portfolio message from ${name}`,
      text: message,
      html: `<p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p>${message}</p>`,
    });

    return { success: true };
  } catch (error) {
    console.error("Email send error:", error);
    throw new Error("Failed to send message. Please try again later.");
  }
}