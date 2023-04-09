import { Response } from "express";
export const success = (res: Response, data: any) => {
  res.json({
    code: 200,
    msg: "请求成功",
    data,
  });
};

export const error = (res: Response, msg: any) => {
  res.json({
    code: -1,
    msg: msg || "请求失败",
  });
};
