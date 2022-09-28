const ExpressServer = require('./server/expressServer');
const config = require('../config');
const logger = require('../loaders/logger')

module.exports = async () => {


    const server = new ExpressServer();
    logger.info('Express loaded.')

    server.start();

    logger.info(`$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$`)
    logger.info(`Server listening on port ${config.port}`)
    logger.info(`$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$`)
}   