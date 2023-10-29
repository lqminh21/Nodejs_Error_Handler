const ErrorHandler = {
    handleError(err) {
        console.log("ErrorHandler: ", err);
    },

    isTrustedError(err) {
        if(err instanceof BaseError) {
            return err.isOperational;
        }

        return false;
    }
}

module.exports = ErrorHandler;