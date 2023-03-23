import * as winston from 'winston';

export class Logger {
    private static logger = winston.createLogger({
        format: winston.format.cli(),

        transports: [
            new winston.transports.Console({
                format: winston.format.combine(
                          winston.format.cli({ all: true }),
                          winston.format.simple()
                        )
              }),
        ],
    });

    static info(message: string) {
        Logger.logger.info(message);
    }

    static warn(message: string) {
        Logger.logger.warn(message);
    }

    static error(message: string) {
        Logger.logger.error(message);
    }

    static debug(message: string) {
        Logger.logger.debug(message);
    }

    static trace(message: string) {
        Logger.logger.silly(message);
    }
}