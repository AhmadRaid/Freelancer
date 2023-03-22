class GeneralError extends Error {
	constructor(message , statusCode , data = undefined){
		super();
		this.message = message;
		this.statusCode = statusCode;
		this.data = data;
	}
	
}
/**
 *
 * @type {{GeneralError: GeneralError}}
 */

module.exports = {
            GeneralError,
};