import { createLogger, format, transports } from 'winston';

const { combine, metadata, printf, timestamp, colorize, prettyPrint } = format;

const fileFormat = combine(
  timestamp({ format: 'DD-MM-YYYY hh:mm:ss A' }),
  metadata({ fillExcept: ['message', 'level', 'timestamp'] }),
  printf(info => {
    let result = `${info.timestamp} [${info.level}]: ${info.message} `;
    if (Object.keys(info.metadata).length)
      result += JSON.stringify(info.metadata);

    return result;
  })
);

const logger = createLogger({
  transports: [
    new transports.Console({
      format: combine(
        timestamp({ format: 'DD-MM-YYYY hh:mm:ss A' }),
        colorize(),
        prettyPrint(),
        printf(info => `${info.timestamp} [${info.level}]: ${info.message}`)
      )
    }),
    new transports.File({
      filename: 'error.log',
      level: 'error',
      format: fileFormat
    }),
    new transports.File({
      filename: 'info.log',
      level: 'info',
      format: fileFormat
    })
  ]
});

export default logger;
