import { createTransport } from 'nodemailer';
import wLogger from "../utils/winston.js";
import dotenv from 'dotenv';
dotenv.config();

const sendEmail = async (mail, body) => {

    const TEST_MAIL = mail

    const transporter = createTransport({
        // host: 'smtp.ethereal.email',
        service: 'gmail',
        port: 587,
        auth: {
            user: process.env.NODEMAILER_USER,
            pass: process.env.NODEMAILER_PASS
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    const mailOptions = {
        from: 'santi.iztli@gmail.com',
        to: TEST_MAIL,
        subject: 'Backend e-commerce registro exitoso',
        html: `<h3 style="color:green;">Registro exitoso!</h3>
        <p><strong>username:</strong>${TEST_MAIL}</p>
        <p>pedido: ${body}</p>`,
        // attachments: [{ path: './Cuanto-pesa-un-gato-2.jpeg' }]
    }

    try {
        const info = await transporter.sendMail(mailOptions)
    } catch (err) {
        wLogger.log('error', ` ${e}`);
    }

}

export default sendEmail;

