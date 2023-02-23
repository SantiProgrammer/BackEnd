import twilio from 'twilio'
import wLogger from "../utils/winston.js";

const accountSid = 'AC7443f3a4f66f3f96ec48059226707608'
const authToken = '0f96bb5deb0b1cf2d748ca13ea11c104'

const client = twilio(accountSid, authToken)



const sendSMS = async (body, num) => {
    try {
        const message = await client.messages.create({
            body: `SMS de twilio: ${body} `,
            from: '+18034714674',
            to: `+52${num}`,
        })
        /* console.log(message) */
    } catch (error) {
        /* console.log(error) */
    }
}

const sendWhatsAppMsg = async (body) => {
    try {
        const message = await client.messages.create({
            body: `WhatsApp twilio: ${body} `,
            from: "whatsapp:+14155238886",
            to: 'whatsapp:+5215512308811'
        });
        /* console.log(message); */
    } catch (error) {
        /* console.log(error); */
    }
};


export default sendSMS