import { createTransport } from 'nodemailer';

const TEST_MAIL = 'tamiisoledad4@gmail.com'

const transporter = createTransport({
    // host: 'smtp.ethereal.email',
    service: 'gmail',
    port: 587,
    auth: {
        user: 'santi.iztli@gmail.com',
        pass: 'vqixonlmtjkiytku'
    }
});

const mailOptions = {
    from: 'Servidor Node.js',
    to: TEST_MAIL,
    subject: 'Mail de prueba desde Node.js',
    html: '<h1 style="color: blue;">Contenido de prueba desde <span style="color: green;">Node.js con Nodemailer</span></h1> <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/1200px-Node.js_logo.svg.png" >',
    // attachments: [{ path: './Cuanto-pesa-un-gato-2.jpeg' }]
}

try {
    const info = await transporter.sendMail(mailOptions)
    console.log(info)
} catch (err) {
    console.log(err)
}
