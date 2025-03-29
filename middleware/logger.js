const requestLogger = (request, response, next) => {
    console.info(`[${new Date().toISOString()}] ${request.method} ${request.originalUrl}`);
    next();
};

module.exports = requestLogger;