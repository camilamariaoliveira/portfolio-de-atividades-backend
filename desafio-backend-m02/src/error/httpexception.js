class HttpException extends Error {

    status;

    constructor(message, status) {
        super(message);
        this.status = status;
    }
}
module.exports = HttpException;