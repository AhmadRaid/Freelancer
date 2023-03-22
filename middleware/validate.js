function validateSchema(ajvValidateSchema){
    return (req,res,next) => {
        const valid = ajvValidateSchema(req.body);
        if(!valid){
            const errors = ajvValidateSchema.errors;
            res.status(400).json(errors);
        }
        next()
    };
}
module.exports  = validateSchema;