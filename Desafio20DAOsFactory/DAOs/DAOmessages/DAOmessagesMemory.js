import logger from '../../utils/winston.js';

export let messages = []

export class DAOmessagesMemory {

    getMessageData = async () => {
        try {
            return messages
        } catch (e) {
            logger.log('error', `❌ Error cant get messages data: ${e}`);
        }
    };

    postMessageData = async (data) => {
        try {
            logger.log('info', `✅ Success post messages data: ${e}`);
            return messages.push(data)
        } catch (e) {
            logger.log('error', `❌ Error cant post messages data: ${e}`);
        }
    };
}










