const env = require("dotenv").config();

exports.constants = {
    VALIDATION_ERROR : 400,
    UN_AUTHORISED : 401,
    FORBIDDEN : 403,
    NOT_FOUND : 404,
    SERVER_ERROR : 500
};

 exports.secretKey =  process.env.ACCESS_TOKEN_SECRET