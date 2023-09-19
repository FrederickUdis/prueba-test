import Joi from "joi";

const docInfoSchema = Joi.object({
    subtype: Joi.string().optional(),
    fParam: Joi.string().optional(),
    sParam: Joi.string().optional(),
    resolution: Joi.number().optional(),
    orfeo: Joi.number().optional(),
    registraduria: Joi.string().valid('0-Vigente').optional(),
    dian: Joi.string().optional(),
    beneficiary: Joi.string().optional(),
    vur: Joi.string().optional(),
    police: Joi.string().optional(),
    status: Joi.string().optional(),
    title: Joi.string().optional()
});

const orfeoInfoSchema = Joi.object({
    record: Joi.string().optional(),
    codM: Joi.number().required(),
    codD: Joi.number().required()
});

const userSchema = Joi.object({
    name: Joi.string().required(),
    sname: Joi.string().allow('', null).optional(),
    particle: Joi.string().allow('', null).optional(),
    last: Joi.string().required(),
    slast: Joi.string().allow('', null).optional(),
    document: Joi.number().required(),
    phone: Joi.number().required(),
});

export const inputSchema = Joi.object({
    id: Joi.number().required(),
    type: Joi.string().required(),
    docInfo: docInfoSchema.required(),
    orfeoInfo: orfeoInfoSchema.required(),
    user: userSchema.required()
});