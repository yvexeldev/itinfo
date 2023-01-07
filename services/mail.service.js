const nodemailer = require("nodemailer");
const config = require("config");
class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: "gmail",
            host: config.get("smtp_host"),
            port: config.get("smtp_port"),
            secure: false,
            auth: {
                user: config.get("smtp_user"),
                pass: config.get("smtp_password"),
            },
        });
    }
    async sendActivationMail(toEmail, link) {
        await this.transporter.sendMail(
            {
                from: config.get("smtp_user"),
                to: toEmail,
                subject: "ITinfo.uz akkauntingizni faollashtirish",
                text: "",
                html: `
            <div>
                <h1> Salom, Akkauntingizni faollashtirish uchun quyidagi tugmani bosing ) </h1>
                <button color="blue"> 
                    <a href="${link}">Akkauntni Faollashtirish</a>
                </button>
            </div>
        `,
            },
            (error, info) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log("Email sent: " + info.response);
                }
            }
        );
    }
    async sendForgetPassword(toEmail, generatedPassword) {
        await this.transporter.sendMail(
            {
                from: config.get("smtp_user"),
                to: toEmail,
                subject: "ITinfo.uz akkauntingiz parolini tiklash!",
                text: "",
                html: `
                <div>
                    <h1>Sizning yangi parolingiz: </h1>
                    <code>${generatedPassword}</code>
                </div>
                `,
            },
            (error, info) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log("Forget password Email sent: " + info.response);
                }
            }
        );
    }
}

module.exports = new MailService();
