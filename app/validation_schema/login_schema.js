const ajvInstance = require("../../utils/AJV/ajv_instance");

const schema = {
  type: "object",
  properties: {
    email: { type: "string", format: "email" },
    password: { type: "string" },
  },
  required: ["email", "password"],
  additionalProperties: false,
};

module.exports = ajvInstance.compile(schema);
//const valid = validate(req.body)
//if (!valid) console.log(validate.errors)
