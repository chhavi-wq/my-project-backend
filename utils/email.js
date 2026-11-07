const { Resend } = require('resend');

const sendOtp = async (to, otp) => {
  const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy');
  await resend.emails.send({
    from: 'Sage <onboard@resend.dev>',
    to,
    subject: 'Your OTP Code',
    html: `<p>Your OTP is <strong>${otp}</strong></p>`,
  });
};

module.exports = { sendOtp };
