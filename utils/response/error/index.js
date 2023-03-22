/**
 *
 * @param err type of GeneralError
 * @param req
 * @param res
 * @returns {*}
 */
module.exports.handleError = (err, req, res) => {
    const { statusCode, message, data = null } = err;
  
    if (typeof message === 'string') {
      return res.status(statusCode || 500).json({
        status: 'failed',
        statusCode,
        message: message,
        data,
      });
    }
    if (typeof message === 'object') {
      let parsedMessage;
      let resMessage;
      let key;
      try {
        key = message.key;
        parsedMessage = JSON.parse(message.message);
      } catch (e) {
        // ignore
      }
      if (
        Object.prototype.hasOwnProperty.call(message, 'msgKey')
        || (Object.prototype.hasOwnProperty.call(message, 'message')
          && parsedMessage)
      ) {
        return res.status(statusCode).json({
          status: 'failed',
          statusCode,
          message: req.t(
            message.msgKey || JSON.parse(message.message).msgKey,
            message.replacementTags || JSON.parse(message.message).replacementTags,
          ),
          data,
        });
      }
  
      if (Array.isArray(message)) {
        resMessage = message[0].message;
        key = message[0].key;
      } else {
        resMessage = message.resMessage || message.message;
      }
      return res.status(statusCode).json({
        status: 'failed',
        statusCode,
        key,
        message: resMessage,
        data,
      });
    }
  
    return res.status(statusCode).json({
      status: 'failed',
      statusCode,
      message: message,
      data,
    });
  };
  