
import { postMessageService } from "../services/messageServices.js";

import logger from '../utils/winston.js'

export const getChat = async (req, res) => {
    try {
        res.render('chat', { layout: 'logged' })
    } catch (e) {
        logger.log('error', `❌ Error cant render chat ${e}`);
    }
};

export const postMessageController = async (req, res) => {
    try {
        const data = req.body
        await postMessageService(data)
    } catch (e) {
        logger.log('error', `❌ Error cant post message controller: ${e}`);
    }
}