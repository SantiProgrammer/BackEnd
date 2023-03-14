import dotenv from 'dotenv';
dotenv.config();
import twilio from 'twilio'
import logger from "./winston.js";

const accountSid = process.env.TWILIO_ACCOUNTSID
const authToken = process.env.TWILIO_AUTHTOKEN

const client = twilio(accountSid, authToken)



export const sendSMS = async (body, num) => {
    try {
        const message = await client.messages.create({
            body: `SMS de twilio: ${body} `,
            from: '+18034714674',
            to: `+52${num}`,
        })
        logger.log('info', `✅ SMS has been sent to ${num} `)
    } catch (error) {
        logger.log('error', `❌ cant send SMS to ${num}`)
    }
}

export const sendWhatsAppMsg = async (body) => {
    try {
        const message = await client.messages.create({
            body: `WhatsApp twilio: ${body} `,
            from: "whatsapp:+14155238886",
            to: 'whatsapp:+5215512308811'
        });
        logger.log('info', `✅ WhatsApp has been sent to: `)
    } catch (error) {
        logger.log('error', `❌ Cant send WhatsApp to: `)
    }
};


