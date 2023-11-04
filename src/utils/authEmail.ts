import nodemailer from "nodemailer";

export interface SendMailOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachements?: Attachement[];
}

export interface Attachement {
  filename: string;
  path: string;
}

const transporter = nodemailer.createTransport({
  service: process.env.MAILER_SERVICE,
  auth: {
    user: process.env.MAILER_EMAIL,
    pass: process.env.MAILER_SECRET_KEY,
  },
});

const sendEmail = async (options: SendMailOptions): Promise<boolean> => {
  const { to, subject, htmlBody, attachements = [] } = options;

  try {
    const sentInformation = await transporter.sendMail({
      to,
      subject,
      html: htmlBody,
      attachments: attachements,
    });

    return true;
  } catch (error) {
    return false;
  }
};

const sendEmailValidationBusiness = async (
  email: string,
  token: string,
  businessName: string
) => {
  sendEmail({
    to: email,
    subject: "Validate your email!",
    htmlBody: `<p>Hi ${businessName}, check your account on Jouve Manager.</p>
            <p>Your account is ready, you just need to verify it on the following link
              <a href="${process.env.FRONTEND_URL}/auth/confirm/${token}" >Check Account</a>
            </p>
            <p>If you did not create this account, you can ignore this message</p>
    `,
  });
};

const resetPasswordValidationBusiness = async (
  email: string,
  token: string,
  businessName: string
) => {
  sendEmail({
    to: email, // list of receivers
    subject: "Reset your password", // Subject line
    htmlBody: `<p>Hi ${businessName}, You have requested to reset your password</p>
                <p>Follow the following link to generate a new password
                  <a href="${process.env.FRONTEND_URL}/auth/new-password/${token}" >Reset password</a>
                </p>
                <p>If you did not create this account, you can ignore this message</p>
        `,
  });
};

export { sendEmailValidationBusiness, resetPasswordValidationBusiness };
