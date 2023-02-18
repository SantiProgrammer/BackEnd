import winston from "winston";

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

export default wLogger();

// wLogger.log('info', "mensaje info")
// wLogger.log('warn', "mensaje warn")
// wLogger.log('error', "mensaje error")
