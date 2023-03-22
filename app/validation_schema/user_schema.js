const ajvInstance = require("../../utils/AJV/ajv_instance");

const schema = {
  type: "object",
  properties: {
    firstName: { type: "string" },
    lastName: { type: "string" },
    email: { type: "string", format: "email" },
    password: { type: "string" },
    role: {
      type: "string",
      enum: ["Admin_Team", "Client"],
    },
    phone: {
      type: "string"
    },
  },
  required: ["firstName", "lastName", "email","phone", "password"],
  additionalProperties: false,
};

module.exports = ajvInstance.compile(schema);
//const valid = validate(req.body)
//if (!valid) console.log(validate.errors)
