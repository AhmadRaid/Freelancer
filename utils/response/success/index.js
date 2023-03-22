/**
 *
 * @param success type of GeneralSuccess
 * @param req
 * @param res
 * @returns {*}
 */
module.exports.handleSuccess = (success, req, res) => {
  const { data, statusCode, message } = success;
console.log('handleSuccesssusssscessssssssssssssss')
  return res.status(statusCode).json({
    statusCode,
    status: 'success',
    message: message ? message : null,
    data: data,
  });
};
