import logger from '../../utils/winston.js';

export class DAOmessagesFile {
    getMessageData = async () => {
        try {
            return undefined
        } catch (e) {
            logger.log('error', `❌ Error cant get message data: ${e}`);
        }
    };


    postMessageData = async (data) => {
        try {
            return undefined
        } catch (e) {
            logger.log('error', `❌ Error adding message data: ${e}`);
        }
    };
}










