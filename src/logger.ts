import * as winston from 'winston';

export const logger = winston.createLogger({
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

export const log = (message: string) => {
    logger.info(message);
}