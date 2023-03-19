import logger from '../../utils/winston.js';
import fs from 'fs';

export class DAOmessagesFile {

    constructor() {
        this.filePath = '../../data/messagesHistory.json';
    }


    getMessageData = async () => {
        try {
            return await fs.promises.readFile(this.filePaths)
        } catch (e) {
            logger.log('error', `❌ Error cant get message data: ${e}`);
        }
    };


    postMessageData = async (data) => {
        try {
            return await fs.promises.writeFile(this.filePath, JSON.stringify(data, null, 3))
        } catch (e) {
            logger.log('error', `❌ Error adding message data: ${e}`);
        }
    };
}










