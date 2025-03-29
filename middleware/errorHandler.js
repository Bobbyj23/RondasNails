const errorHandler = (error, request, response, next) => {
    const statusCode = error.status || 500;
    const responseMessage = error.message || "Internal Server Error";
    const errorDetails = process.env.NODE_ENV === "production" ? {} : error.stack;

    response.status(statusCode).json({
        message: responseMessage,
        error: errorDetails
    });
};

module.exports = errorHandler;