// // packages/auth/src/email.ts
// import { Resend } from 'resend'

// const resend = new Resend(process.env.RESEND_API_KEY!)

// export async function sendEmail({
//   to,
//   subject,
//   html,
// }: {
//   to: string
//   subject: string
//   html: string
// }) {
//   const { error } = await resend.emails.send({
//     from: 'LuxeStay <noreply@luxestay.com>',
//     to,
//     subject,
//     html,
//   })
//   if (error) throw new Error(`Email failed: ${error.message}`)
// }

// export function verifyEmailTemplate(name: string, url: string): string {
//   return `
//     <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
//       <h2>Welcome to LuxeStay, ${name}!</h2>
//       <p>Please verify your email to complete registration.</p>
//       <a href="${url}" style="
//         display:inline-block;background:#7c3aed;color:white;
//         padding:12px 24px;border-radius:8px;text-decoration:none;margin:16px 0
//       ">Verify Email</a>
//       <p style="color:#666;font-size:14px">
//         Link expires in 24 hours.
//       </p>
//     </div>
//   `
// }

// export function resetPasswordTemplate(name: string, url: string): string {
//   return `
//     <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
//       <h2>Reset your password, ${name}</h2>
//       <a href="${url}" style="
//         display:inline-block;background:#7c3aed;color:white;
//         padding:12px 24px;border-radius:8px;text-decoration:none;margin:16px 0
//       ">Reset Password</a>
//       <p style="color:#666;font-size:14px">
//         Expires in 1 hour. Ignore if you didn't request this.
//       </p>
//     </div>
//   `
// }
