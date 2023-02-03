const winston = require('winston')

const wLogger = () => {
    const wLogger = winston.createLogger({
        level: 'warn',
        transports: [
            // se imprimen por consola: solo niveles Verbose, Info, Warn, Error.
            new winston.transports.Console({ level: 'verbose' }),
            // se guardan en archivo.log
            new winston.transports.File({ filename: 'src/logs/warn.log', level: 'warn' }),
            new winston.transports.File({ filename: 'src/logs/error.log', level: 'error' }),
        ]
    })

    return wLogger
};

module.exports = wLogger();

// wLogger.log('info', "mensaje info")
// wLogger.log('warn', "mensaje warn")
// wLogger.log('error', "mensaje error")




// Ejemplos:
// logger.log('silly', "127.0.0.1 - log silly")
// logger.log('debug', "127.0.0.1 - log debug")
// wLogger.log('verbose', "127.0.0.1 - log verbose")
// logger.log('info', "127.0.0.1 - log info")
// logger.log('warn', "127.0.0.1 - log warn")
// logger.log('error', "127.0.0.1 - log error")
