import { DAOmessagesFile } from "./DAOmessages/DAOmessagesFile.js";
import { DAOmessagesMemory } from "./DAOmessages/DAOmessagesMemory.js";
import { DAOmessagesMongo } from "./DAOmessages/DAOmessagesMongo.js";

import { DAOproductsFile } from "./DAOproducts/DAOproductsFile.js";
import { DAOproductsMemory } from "./DAOproducts/DAOproductsMemory.js";
import { DAOproductsMongo } from "./DAOproducts/DAOproductsMongo.js";

import { MongoConnectSingleton } from "../utils/MongoConnectSingleton.js";

import logger from '../utils/winston.js';

let mode = process.argv[2];

export let DAO;

MongoConnectSingleton.getInstance();

if (mode == 'dev') {
    logger.log('info', `✅ DAOfactory Memory ON`);
    DAO = new DAOmessagesMemory && new DAOproductsMemory
} else if (mode == 'file') {
    logger.log('info', `✅ DAOfactory File ON`);
    DAO = new DAOmessagesFile && new DAOproductsFile;
} else if (mode == 'prod') {
    logger.log('info', `✅ DAOfactory Mongo ON`);
    DAO = new DAOmessagesMongo && new DAOproductsMongo;
} else {
    throw logger.log('warn', `⚠️ DAOfactory unsetted`);
};
