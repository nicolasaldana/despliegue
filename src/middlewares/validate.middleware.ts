import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

//Middleware genérico para validar datos con Zod
export const validate =
  (schema: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      // Valida el body contra el schema
      schema.parse(req.body);
      next();
    } catch (error: any) {
      return res.status(400).json({
        message: error.errors,
      });
    }
  };
