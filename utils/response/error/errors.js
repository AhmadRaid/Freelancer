const { GeneralError} = require('./generalError.js')
const {  INTERNAL_SERVER_ERROR,
  BAD_REQUEST,
  UNAUTHORIZED,
  UNPROCESSABLE_ENTITY,
  NOT_FOUND,
  ACCESS_DENIED,} = require('../../httpCode')

class BadRequest extends GeneralError {
  constructor(message, data = undefined) {
    super(message, BAD_REQUEST, data);
  }
}

class InternalServerError extends GeneralError {
  constructor(req, data = undefined) {
    super('CommonError.InternalServerError', INTERNAL_SERVER_ERROR, data);
  }
}

class Unauthorized extends GeneralError {
  constructor(message, data = undefined) {
    super(message, UNAUTHORIZED, data);
  }
}

class AccessDenied extends GeneralError {
  constructor(message, data = undefined) {
    super(message, ACCESS_DENIED, data);
  }
}

class UnprocessableEntity extends GeneralError {
  constructor(message, data = undefined) {
    super(message, UNPROCESSABLE_ENTITY, data);
  }
}

class NotFound extends GeneralError {
  constructor(message, data = undefined) {
    super(message, NOT_FOUND, data);
  }
}

/**
 *
 * @type {{
 * BadRequest: BadRequest,
 * Unauthorized: Unauthorized,
 * AccessDenied: AccessDenied,
 * GeneralError: GeneralError,
 * InternalServerError: InternalServerError,
 * UnprocessableEntity: UnprocessableEntity,
 * NotFound:NotFound,
 * }}
 */
module.exports = {
  Unauthorized,
  AccessDenied,
  InternalServerError,
  BadRequest,
  GeneralError,
  UnprocessableEntity,
  NotFound,
};