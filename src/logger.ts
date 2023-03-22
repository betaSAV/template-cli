import * as winston from 'winston';

export const logger = winston.createLogger({
    format: winston.format.colorize(),

    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                      winston.format.colorize({ all: true }),
                      winston.format.simple()
                    )
          }),
    ],
});

export const log = (message: string) => {
    logger.info(message);
}