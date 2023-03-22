class GeneralSuccess {
	constructor(message, statusCode, data ) {
	   this.statusCode = statusCode;
	   this.data = data;
	   this.message = message;
	}
  }
  
  /**
   *
   * @type {{GeneralSuccess: GeneralSuccess}}
   */
  module.exports = {
	GeneralSuccess,
  };
  