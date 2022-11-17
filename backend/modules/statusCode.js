const { mainModule } = require("process");

const code = {
    SUCCESS: 200,
    FAIL: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    BAD_REQUEST : 404,
    DUPLICATE : 409,
    INVALID_VALUE : 412,
    SERVER_ERROR : 500
}

module.exports = code;
