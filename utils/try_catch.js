const { InternalServerError } = require("./response/error/errors");

module.exports = fn => {
    return (req,res,next) => {
        try {
            fn(req,res,next)
          } catch (error) {
            console.log(err);
            return next(new InternalServerError(req));
          }
    }
  
};
