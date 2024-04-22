import joi from 'joi';
import { generalFileds } from '../../middleware/validation.js';
export const signUpSchema={
    body:joi.object({
        userName:joi.string().alphanum().min(3).max(20).required().messages({
            "string.empty":"User name is required",
            "any.required":"User name is required"
        }),
        email:generalFileds.email,
        password:generalFileds.password,
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
    password:generalFileds.password,
})}