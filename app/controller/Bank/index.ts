const bankController = require("./bankController");
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

export const getAllBank = async (req: userRequest, res: Response, next: NextFunction) => {
  try {
    let userId = req.params.userId

    const { message, data, code } = await bankController.getAllBank({
      userId,
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

export const addBank = async (req: userRequest, res: Response, next: NextFunction) => {
  try {
    let userId = req.user._id;

    const { message, data, code } = await bankController.addBank({
      ...req.body,
      userId,
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

// module.exports.showBank = async (req: userRequest, res: Response, next: NextFunction) => {
//   try {
//     const { message, data, code } = await bankController.showBank({
//       ...req.params,
//     });

//     if (code === 0) {
//       return next(new Success(message, data));
//     }

//     return next(new BadRequest(message));
//   } catch (err) {
//     console.log(err);
//     return next(new InternalServerError(req));
//   }
// };

// module.exports.editBank = async (req: userRequest, res: Response, next: NextFunction) => {
//   try {
//     let userId = req.user._id;

//     const { message, data, code } = await bankController.editBank({
//       ...req.params,
//       userId,
//     });

//     if (code === 0) {
//       return next(new Success(message, data));
//     }

//     return next(new BadRequest(message));
//   } catch (err) {
//     console.log(err);
//     return next(new InternalServerError(req));
//   }
// };

// module.exports.deleteBank = async (req: userRequest, res: Response, next: NextFunction) => {
//   try {
//     let userId = req.user._id;

//     const { message, data, code } = await bankController.deleteBank({
//       ...req.params,
//       userId,
//     });

//     if (code === 0) {
//       return next(new Success(message, data));
//     }

//     return next(new BadRequest(message));
//   } catch (err) {
//     console.log(err);
//     return next(new InternalServerError(req));
//   }
// };
// module.exports.sendCode = async (req: userRequest, res: Response, next: NextFunction) => {
//   try {
//     let userId = req.user._id;
//     let phone = req.user.phone;
//     const { message, data, code } = await bankController.sendCode({
//       ...req.body,
//       userId,
//       phone,
//     });

//     if (code === 0) {
//       return next(new Success(message, data));
//     }
//     return next(new BadRequest(message));
//   } catch (err) {
//     console.log(err);
//     return next(new InternalServerError(req));
//   }
// };
