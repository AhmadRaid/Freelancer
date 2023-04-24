import officeController from "./officeController";
const {
  Success,
  Created,
} = require("../../../utils/response/success/successes");
const {
  InternalServerError,
  BadRequest,
  NotFound,
} = require("../../../utils/response/error/errors");

import { Request, Response, NextFunction } from "express";


export interface userRequest extends Request {
  user: {
    _id: string,
    phone: string

  };
}


export const getAllOffice = async (req: userRequest, res: Response, next: NextFunction) => {
  try {

    const { message, data, code } = await officeController.getAllOffice();

    if (code === 0) {
      return next(new Success(message, data));
    }

    return next(new BadRequest(message));
  } catch (err) {
    console.log(err);
    return next(new InternalServerError(req));
  }
};

export const addOffice = async (req: userRequest, res: Response, next: NextFunction) => {
  try {

    const { message, data, code } = await officeController.addOffice({
      ...req.body,
    });

    if (code === 0) {
      return next(new Success(message, data));
    }

    return next(new BadRequest(message));
  } catch (err) {
    console.log(err);
    return next(new InternalServerError(req));
  }
};

