import { Request, Response, RequestHandler,NextFunction } from "express";

const handleError = (func:any) => (req:Request, res:Response, next:NextFunction) =>

  Promise.resolve(func(req, res, next)).catch(next);

  export default handleError