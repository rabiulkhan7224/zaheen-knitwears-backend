import { ZodObject, ZodRawShape } from 'zod';
import { Request, Response, NextFunction } from 'express';
export const validateRequest =(schema:ZodObject<ZodRawShape>) => {
    return async(req:Request, _res:Response, next:NextFunction) => {
        try {
            await schema.parseAsync(req.body);
            next();
        } catch (error: any) {
           next(error); 
        }
    };
};
