const { createLogger, format, transports } = require('winston');
const logToDatabase = require('./logToDatabase');

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.json()
  ),
  transports: [
    new transports.Console(),
  ],
});

// Info Logs
logger.stream = {
  write: async (message) => {
    const parts = message.trim().split(' ');
    const logObject = {
      level: 'info',
      method: parts[0],
      url: parts[1],
      status: parts[2],
      responseTime: `${parts[3]} ${parts[4]}`,
    };

    // Save info log to database
    await logToDatabase(logObject);
  },
};

// Error Logs
logger.errorLogger = async (err, req, res, next) => {
  const errorLog = {
    level: 'error',
    method: req.method,
    url: req.originalUrl,
    status: res.statusCode,
    message: err.message,
  };

  // Save error log to database
  await logToDatabase(errorLog);

  next(err);
};

module.exports = logger;
