const JWT = require("jsonwebtoken");
require("dotenv").config();

export function createAccessToken(object : object) {
  const token = JWT.sign(
    {
      data: object,
      exp: Math.floor(Date.now() / 1000) + 250 * 60 * 60 * 60 * 24,
    },
    process.env.JWT_SECRET_ACCESS_Token_KEY
  );
  return token;
}

export function createRefreshToken(object: object) {
  const token = JWT.sign(
    {
      data: object,
      exp: Math.floor(Date.now() / 1000) + 280 * 60 * 60 * 60 * 60 * 24 * 30,
    },
    process.env.JWT_SECRET_REFRESH_Token_KEY
  );
  return token;
}

export function create_Tokens_with_cookie(object: object) {
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

export function verifyAccessToken(token : string) {
  return JWT.verify(token, process.env.JWT_SECRET_ACCESS_Token_KEY);
}

export function verifyRefreshToken(token: string) {
  return JWT.verify(token, process.env.JWT_SECRET_REFRESH_Token_KEY);
}

