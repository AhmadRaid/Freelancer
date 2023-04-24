"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRefreshToken = exports.verifyAccessToken = exports.create_Tokens_with_cookie = exports.createRefreshToken = exports.createAccessToken = void 0;
const JWT = require("jsonwebtoken");
require("dotenv").config();
function createAccessToken(object) {
    const token = JWT.sign({
        data: object,
        exp: Math.floor(Date.now() / 1000) + 250 * 60 * 60 * 60 * 24,
    }, process.env.JWT_SECRET_ACCESS_Token_KEY);
    return token;
}
exports.createAccessToken = createAccessToken;
function createRefreshToken(object) {
    const token = JWT.sign({
        data: object,
        exp: Math.floor(Date.now() / 1000) + 280 * 60 * 60 * 60 * 60 * 24 * 30,
    }, process.env.JWT_SECRET_REFRESH_Token_KEY);
    return token;
}
exports.createRefreshToken = createRefreshToken;
function create_Tokens_with_cookie(object) {
    return {
        access_Token: createAccessToken(object),
        refresh_token: createRefreshToken(object),
    };
    //   res.cookie('token', accessToken, {
    //     expires: new Date(
    //       Date.now() + process.env.TOKEN_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    //     ),
    //     httpOnly: true,
    //  //   secure: req.secure || req.headers['x-forwarded-proto'] === 'https'
    //   });
    //   res.cookie('refresh_token', refreshToken, {
    //     expires: new Date(
    //       Date.now() + process.env.REFRESH_TOKEN_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    //     ),
    //     httpOnly: true,
    //  //    secure: req.secure || req.headers['x-forwarded-proto'] === 'https'
    //   });
}
exports.create_Tokens_with_cookie = create_Tokens_with_cookie;
function verifyAccessToken(token) {
    return JWT.verify(token, process.env.JWT_SECRET_ACCESS_Token_KEY);
}
exports.verifyAccessToken = verifyAccessToken;
function verifyRefreshToken(token) {
    return JWT.verify(token, process.env.JWT_SECRET_REFRESH_Token_KEY);
}
exports.verifyRefreshToken = verifyRefreshToken;
