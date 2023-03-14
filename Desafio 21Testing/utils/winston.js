import winston from "winston";

const logger = () => {
    const logger = winston.createLogger({
        level: 'warn',
        transports: [
            // se imprimen por consola: solo niveles Verbose, Info, Warn, Error.
            new winston.transports.Console({ level: 'verbose' }),
            // se guardan en archivo.log
            new winston.transports.File({ filename: './logs/warn.log', level: 'warn' }),
            new winston.transports.File({ filename: './logs/error.log', level: 'error' }),
        ]
    })
    return logger
};

export default logger();

// logger.log('info', "mensaje info")
// logger.log('warn', "mensaje warn")
// logger.log('error', "mensaje error")
