import { sendSignupEmail } from "../channels/emailChannel";
import { sendLoginEmail } from "../channels/emailChannel";
import { sendSignupSms, sendLoginSms } from "../channels/smsChannel";

export class NotificationService {
  async onSignup(user: { userId: string; email?: string; phone?: string; name?: string }) {
    if (user.email) {
      await sendSignupEmail(user.email, { name: user.name });
    }
    if (user.phone) {
      await sendSignupSms(user.phone, { name: user.name });
    }
    // optionally persist event to DB here
  }

  async onLogin(payload: { userId: string; email?: string; phone?: string; ip?: string; device?: string }) {
    if (payload.email) {
      await sendLoginEmail(payload.email, payload);
    }
    if (payload.phone) {
      await sendLoginSms(payload.phone, payload);
    }
    // optionally persist/read receipts
  }
}
