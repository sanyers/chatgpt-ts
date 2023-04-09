import express, { NextFunction, Request, Response } from "express"; //web框架
import { SERVER_PORT } from "./env";
import { models, chat } from "./api";
import { success, error } from "./res-code";
const path = require("path");

const app = express();
const multipart = require("connect-multiparty");

//解析form-data参数
const multipartMiddleware = multipart({ uploadDir: "./temp" });
app.use(multipartMiddleware); // 解析form-data参数
app.use(express.json({ limit: "50mb" })); // 解析 application/json 参数
app.use(express.urlencoded({ limit: "50mb", extended: true })); // 解析 www-form-urlencoded 参数
// app.use("/", express.static("public")); // 开放public文件夹目录
app.use("/", express.static("web"));

app.post("/api/v1/models", multipartMiddleware, async (req, res) => {
  try {
    const response = await models({});
    success(res, response.data);
  } catch (e: any) {
    error(res, e.response.data);
  }
});

app.post("/api/v1/chat/completions", multipartMiddleware, async (req, res) => {
  const {
    messages,
    max_tokens,
    frequency_penalty,
    presence_penalty,
    temperature,
    top_p,
    model,
  } = req.body;
  try {
    const params = {
      model: model ?? "gpt-3.5-turbo",
      messages, // messages: [{ role: "user", content }],
      temperature: temperature ?? 0.8,
      max_tokens: max_tokens ?? 2048,
      top_p: top_p ?? 1,
      frequency_penalty: frequency_penalty ?? 0,
      presence_penalty: presence_penalty ?? 0,
    };
    const response = await chat(params);
    const msg = resolveData(response.data);
    if (msg) {
      success(res, msg);
    } else {
      error(res, "无数据");
    }
  } catch (e: any) {
    error(res, e.response.data);
  }
});

function resolveData(data: any) {
  let msg = null;
  if (data) {
    const { choices } = data;
    if (choices && choices.length) {
      msg = choices;
    }
  }
  return msg;
}

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send({
    code: -1,
    msg: "程序运行错误",
  });
});

//启动应用程序
app.listen(SERVER_PORT, function () {
  console.log("app listening on " + SERVER_PORT);
});

process.on("uncaughtException", function (err) {
  //打印出错误
  console.error("uncaughtException:" + err);
  //打印出错误的调用栈方便调试
  console.error(err.stack);
});

async function testModels() {
  try {
    const response = await models({});
    console.log(response.data);
  } catch (e: any) {
    console.log(e.response.data);
  }
}

async function testChat() {
  try {
    const params = {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: "你当前版本是GPT3.5吗" }],
    };
    const { data } = await chat(params);
    console.log(data);
  } catch (e: any) {
    console.log(e.response.data);
  }
}

// testChat()
