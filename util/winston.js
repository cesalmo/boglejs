const { createLogger, format, transports } = require('winston');
const fs = require('fs');
const path = require('path');

//  directorio donde guardar logs
const logDir = 'log';

// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}
const filename = path.join(logDir, 'results.log');


const logger = createLogger({
  level: 'debug',
  format: format.combine(
    // format.colorize(),
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`),
  ),
  // You can also comment out the line above and uncomment the line below for JSON format
  // format: format.json(),
  transports: [new transports.Console(),
    new transports.File({ filename })],
});

// logger.info('Hello world');
// logger.debug('Debugging info');
