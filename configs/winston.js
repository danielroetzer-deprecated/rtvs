/**
 * Created by Rötzer on 21.11.2016.
 */


//Load Winston logger and initialize it
//======================================================
const winston = require('winston');
winston.emitErrs = true;


const logger = new winston.Logger({
    transports: [
        new winston.transports.File({
            level: 'warn',
            filename: './logs/logs.log',
            json: true,
            timestamp: new Date(),
            maxsize: 5242880, //5MB
            maxFile: 5,
            colorize: false
        }),
        new winston.transports.Console({
            level: 'silly',
            handleExceptions: true,
            json: false,
            timestamp: new Date(),
            colorize: true
        })
    ],
    exceptionHandlers: [
        new winston.transports.File({
            filename: 'logs/exceptions.log',
            json: false
        })
    ]
});

//Exit after logging an uncaughtException (default=true)
logger.exitOnError = true;


module.exports = logger;