import twilio from 'twilio'
import wLogger from "../utils/winston.js";
import dotenv from 'dotenv';
dotenv.config();



const accountSid = process.env.ACCOUNT_SID
const authToken = process.env.AUTH_TOKEN

const client = twilio(accountSid, authToken)



const sendSMS = async (body, num) => {
    try {
        const message = await client.messages.create({
            body: `SMS de twilio: ${body} `,
            from: process.env.TWILIO_SMS_NUMBER,
            to: `+52${num}`,
        })
    } catch (error) {
        wLogger.log('error', ` ${e}`);
    }
}

const sendWhatsAppMsg = async (body) => {
    try {
        const message = await client.messages.create({
            body: `WhatsApp twilio: ${body} `,
            from: "whatsapp:+14155238886",
            to: 'whatsapp:+5215512308811'
        });
    } catch (error) {
        wLogger.log('error', ` ${e}`);
    }
};


export default {
    sendSMS,
    sendWhatsAppMsg

} 