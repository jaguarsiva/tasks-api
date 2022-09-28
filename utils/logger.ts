const winston = require('winston');
require('winston-papertrail').Papertrail;
const dotenv = require('dotenv');
dotenv.config();
import moment from 'moment-timezone';

const { createLogger, format, transports } = winston;
const { combine, printf, timestamp, colorize, prettyPrint } = format;

const host = process.env.LOGGER_HOST!;
const port = process.env.LOGGER_PORT!;

const paperLogger = new winston.transports.Papertrail({
  host,
  port,
  inlineMeta: true,
  logFormat: function (level, message) {
    if (level === 'error') {
      return `<<< ERROR >>> ${message}`;
    }
    return `${level} - ${message}`;
  }
});

const timezoned = () => {
  return moment().tz('Asia/Kolkata').format('DD/MM/YYYY hh:mm:ss A');
};

const logger = createLogger({
  format: winston.format.simple(),
  levels: winston.config.syslog.levels,
  transports: [
    paperLogger,
    new transports.Console({
      format: combine(
        timestamp({ format: timezoned }),
        colorize(),
        prettyPrint(),
        printf(info => `${info.timestamp} [${info.level}]: ${info.message}`)
      )
    })
  ]
});

export default logger;
