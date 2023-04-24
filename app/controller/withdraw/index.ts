import withdrawController from "./withdrawController";
import { Request, Response, NextFunction } from "express";

const {
  Success,
  Created,
} = require("../../../utils/response/success/successes");
const {
  InternalServerError,
  BadRequest,
  NotFound,
} = require("../../../utils/response/error/errors");


export interface userRequest extends Request {
  user: {
    _id: string,
    phone: string

  };
}


module.exports.getAllWithdraw = async (req: userRequest, res: Response, next: NextFunction) => {
  try {
    let userId = req.user._id;
    const { message, data, code } = await withdrawController.getAllWithdraw({
      ...req.query
    }, userId);

    if (code === 0) {
      return next(new Success(message, data));
    }

    return next(new BadRequest(message));
  } catch (err) {
    console.log(err);
    return next(new InternalServerError(req));
  }
};

module.exports.addWithdraw = async (req: userRequest, res: Response, next: NextFunction) => {
  try {
    let userId = req.user._id
    const { message, data, code } = await withdrawController.addWithdraw({
      ...req.body,
      userId
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


module.exports.getWithdrawDetails = async (req: userRequest, res: Response, next: NextFunction) => {
  try {
    let WithdrawId = req.params.withdrawId;
    let userId = req.user._id;
    const { message, data, code } = await withdrawController.getWithdrawDetails(
      WithdrawId,
      userId
    );

    if (code === 0) {
      return next(new Success(message, data));
    }

    return next(new BadRequest(message));
  } catch (err) {
    console.log(err);
    return next(new InternalServerError(req));
  }
};

// module.exports.changeWithdrawStatus = async (req: userRequest, res: Response, next: NextFunction) => {
//   try {
//     let WithdrawId = req.params.withdrawId;
//     let userId = req.user._id;
//     const { message, data, code } = await withdrawController.changeWithdrawStatus(
//       WithdrawId,
//       userId,
//       req.body.status
//     );

//     if (code === 0) {
//       return next(new Success(message, data));
//     }

//     return next(new BadRequest(message));
//   } catch (err) {
//     console.log(err);
//     return next(new InternalServerError(req));
//   }
// };

// module.exports.changeWithdrawStatus = async (req: userRequest, res: Response, next: NextFunction) => {
//   try {
//     let WithdrawId = req.params.withdrawId;
//     let userId = req.user._id;
//     const { message, data, code } = await withdrawController.changeWithdrawStatus(
//       WithdrawId,
//       userId,
//       req.body.status
//     );

//     if (code === 0) {
//       return next(new Success(message, data));
//     }

//     return next(new BadRequest(message));
//   } catch (err) {
//     console.log(err);
//     return next(new InternalServerError(req));
//   }
// };



