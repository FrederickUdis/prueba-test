import { Request, Response, NextFunction } from 'express';
import {inputSchema} from "../db/interface/inputInterface"
import dotenv from "dotenv";
dotenv.config();

export async function requestValidator(req: Request, res: Response, next: NextFunction){
    const validation = inputSchema.validate(req.body);

    if (validation.error) {
        res.status(400).send(validation.error.details);
    } else {
        next();
    }
}