const ExpressServer = require('./server/expressServer');
const config = require('../config');
const mongooseLoad = require('./mongoose')
const logger = require('../loaders/logger')

module.exports = async () => {

    await mongooseLoad();
    logger.info('DB Connected')

    const server = new ExpressServer();
    logger.info('Express loaded.')

    server.start();

    logger.info(`$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$`)
    logger.info(`Server listening on port ${config.port}`)
    logger.info(`$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$`)
}   