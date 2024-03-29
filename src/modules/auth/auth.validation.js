import joi from 'joi';
export const signUpSchema={
    body:joi.object({
        userName:joi.string().alphanum().min(3).max(20).required().messages({
            "string.empty":"User name is required",
            "any.required":"User name is required"
        }),
        email:joi.string().email().required(),
        password:joi.string().min(8).max(20).required(),
        cPassword:joi.valid(joi.ref('password')).required(),
        age:joi.number().min(20).positive().integer(),
        gender:joi.string().alphanum().valid('male', 'female').required()
    
    }),
    query:joi.object({
        test:joi.boolean().required()
    
    })
}


export const signInSchema=
{body:joi.object({
    email:joi.string().email().required(),
    password:joi.string().min(8).max(20).required(),
})}