import Twilio from "twilio";
const client = Twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

export async function sendSignupSms(to: string, vars: { name?: string }) {
  const body = `Welcome ${vars.name ?? ""} to VoidFrame!`;
  await client.messages.create({ body, from: process.env.TWILIO_FROM, to });
}

export async function sendLoginSms(to: string, { ip, device }: any) {
  const body = `New login from ${device ?? "a device"} (${ip ?? "unknown ip"}). If not you, change password.`;
  await client.messages.create({ body, from: process.env.TWILIO_FROM, to });
}
