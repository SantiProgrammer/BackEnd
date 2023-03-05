import { DAO } from "../DAOs/DAOsFactory.js";

import logger from '../utils/winston.js'

export const getMessagesService = async () => {
    try {
        return await DAO.getMessagesData()
    } catch (e) {
        logger.log('error', `❌ Error cant get stock service : ${e}`);
    }
};

export const postMessageService = async (data) => {
    try {
        return await DAO.postMessageData(data)
    } catch (e) {
        logger.log('error', `❌ Error cant post message data : ${e}`);
    }
};
