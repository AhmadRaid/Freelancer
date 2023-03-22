const AJV = require("ajv")

const addFormats = require("ajv-formats");

const ajvInstance = new AJV({ allErrors: true });
addFormats(ajvInstance); // I use formate inside ajv to use formate like time , date , email , url and lot of formate method

module.exports = ajvInstance;
