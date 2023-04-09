import axios from "./axios";

// 所有模型列表
export const models = (params: any) => {
  return axios.request({
    method: "get",
    url: "/v1/models",
    params,
  });
};

// 聊天
export const chat = (data: any) => {
  return axios.request({
    method: "post",
    url: "/v1/chat/completions",
    data,
  });
};
