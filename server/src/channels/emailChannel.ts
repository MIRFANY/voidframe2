import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT ?? 587),
  secure: Number(process.env.SMTP_PORT) === 465, // true for 465
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

export async function sendSignupEmail(to: string, vars: { name?: string }) {
  const subject = `Welcome to VoidFrame`;
  const html = `<p>Hi ${vars.name ?? ""},</p><p>Welcome to VoidFrame — glad to have you!</p>`;
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject,
    html
  });
}

export async function sendLoginEmail(to: string, { ip, device }: any) {
  const subject = `New login detected`;
  const html = `<p>We detected a login from ${device ?? "unknown device"} (${ip ?? "unknown IP"}). If this wasn't you, please secure your account.</p>`;
  await transporter.sendMail({ from: process.env.EMAIL_FROM, to, subject, html });
}
