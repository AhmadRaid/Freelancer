const { Withdraw, User, Request } = require("../../Model");

import {IWithdraw} from "../../Model/interfaces/withdraw"

export const getAllWithdraw = async (data:any , userId: string) => {
  try {
    const { userId, offset, search, filter, sort, limit } = data; // extract query parameters from request URL

    let query: Record<string , any> = {};

    console.log(offset, search, filter, sort, limit )

    if (filter) {
      query.status = { $in: Array.isArray(filter) ? filter : [filter] };
    }

    const regex = new RegExp(search, "i");

    let withdraw = await Withdraw.aggregate([
      {
        $lookup: {
          from: "banks",
          localField: "bankId",
          foreignField: "_id",
          as: "bank",
        },
      },

      // {
      //   $unwind: {
      //     path: "$bank",
      //     preserveNullAndEmptyArrays: true,
      //   },
      // },

      {
        $lookup: {
          from: "offices",
          localField: "officeId",
          foreignField: "_id",
          as: "office",
        },
      },

      // {
      //   $unwind: {
      //     path: "$office",
      //     preserveNullAndEmptyArrays: true,
      //   },
      // },

      {
        $lookup: {
          from: "recipients",
          localField: "RecipientId",
          foreignField: "_id",
          as: "recipient",
        },
      },



      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },

      // {
      //   $unwind: {
      //     path: "$user",
      //     preserveNullAndEmptyArrays: true,
      //   },
      // },

      {
        $match: {
        //  status:{ $in: Array.isArray(filter) ? filter : [filter] },
          $or: [
            { "bank.accountName": regex },
            { "bank.accountNumber": regex },
            { "office.name": regex },
            { "recipient.name": regex },
            { "recipient.mobile": regex },
            { amount: regex },
            { status: regex },
          ],
        },
      },
      {
        $project:{
          amount:1,
          method:1,
          status:1,
          recipientId:1,
          historyStatus:1,
          user: {
            _id:1,
            firstName:1,
            lastName:1,
            role:1
          },
          office:{
            name:1,
            address:1
          },
          bank:{
            nameAccount:1,
            branch:1
          },
          recipient:{
            _id:1,
            fullName:1,
            phoneNumber:1
          },
        }
      },
      // {
      //   $sort: {sort},
      // },
      // {
      //   $skip: offset,
      // },
      // {
      //   $limit: limit,
      // }
    ]);

    if (!withdraw) {
      return { code: 1, message: "We dont have Withdraw", data: null };
    }
    return {
      code: 0,
      message: "commonSuccess.message",
      data: { withdraw },
    };
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};

export const addWithdraw = async (data:IWithdraw) => {
  const { userId, method, RecipientId, officeId, status, bankId, amount } =
    data;
  try {
    const user = await User.findOne({
      _id: userId,
    });

    if (!user) {
      return {
        code: 1,
        message: "this is not user",
        data: null,
      };
    }

    if (!user.address) {
      return {
        code: 1,
        message: "you must verify your Address",
        data: null,
      };
    }

    if (method == "Bank" && user.useCash == false) {
      return {
        code: 1,
        message:
          "you cant use bank method with first withdraw , you must first time use Cash or send request to Admin to give you permission",
        data: null,
      };
    }

    if (user.balance < amount) {
      return {
        code: 1,
        message: "this amount is over than your balance check your balance",
        data: null,
      };
    }

    let withDraw = await Withdraw.create({
      userId,
      method,
      officeId,
      RecipientId,
      bankId,
      amount,
      historyStatus: [
        {
          status,
          Date: new Date(),
        },
      ],
    });

    await Request.create({
      withdrawId: withDraw._id,
      userId,
      requestType: "Add Withdraw Request",
    });

    user.balance = user.balance - amount;

    user.useCash = "True";

    await user.save();

    return { code: 0, message: "commonSuccess.message", data: { withDraw } };
  } catch (error : any) {
    console.log(error);
    throw new Error(error);
  }
};

export const getWithdrawDetails = async (withdrawId:string, userId:string) => {
  try {
    let withdraw = await Withdraw.find({ _id: withdrawId, userId: userId });
    if (!withdraw) {
      return {
        code: 1,
        message: "We dont have Withdraw Or this withdraw not for you",
        data: null,
      };
    }
    return { code: 0, message: "commonSuccess.message", data: { withdraw } };
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};

export const changeWithdrawStatus = async (withdrawId:IWithdraw, userId:string, status:string) => {
  try {
    let withdraw = await Withdraw.find({ _id: withdrawId, userId: userId });
    if (!withdraw) {
      return {
        code: 1,
        message: "We dont have Withdraw Or this withdraw not for you",
        data: null,
      };
    }

    withdraw.status = status;
    withdraw.historyStatus = withdraw.historyStatus.push({
      status,
      Date: new Date(),
    });

    await withdraw.save();

    await Request.create({
      withdrawId: withdraw._id,
      userId,
      requestType: "Change Status Withdraw",
    });

    return { code: 0, message: "commonSuccess.message", data: { withdraw } };
  } catch (error : any) {
    console.log(error);
    throw new Error(error);
  }
};

const withdrawController = {
  getAllWithdraw,
  addWithdraw,
  getWithdrawDetails,
  changeWithdrawStatus
}

export default withdrawController
