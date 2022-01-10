const nodeMailer = require("nodemailer");

const sendEmail = async (options) => {

    const transporter = nodeMailer.createTransport({
        service: process.env.SMTP_SERVICE,
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_MAIL,
            pass: process.env.SMTP_PASSWORD
        }
    });

    const mailOptions = {
        from: process.env.SMTP_FROM,
        to: options.email,
        subject: options.subject,
        text: options.message
    }

    await transporter.sendMail(mailOptions);

}

module.exports = sendEmail;