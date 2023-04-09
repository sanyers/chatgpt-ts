# chatgpt-ts
基于ChatGPT3.5 API实现的私有化 Node.js + TypeScript 后台服务，包含 Express + Vue3 前端页面

## 1、安装

```
pnpm i
```

## 2、配置 .env 文件

复制根目录下 `example.env` 文件到 `.env`（没有该文件可以创建一个）文件

## 2.1 配置 openai 的 key

修改 `.env` 文件的配置项 `OPENAI_API_KEY` 和 `OPENAI_API_ORG` 变量为你自己的信息

## 2.2 配置代理

修改 `.env` 文件的代理信息

```conf
PROXY_OPEN=1 # 1启用代理 0不启用
PROXY_HOST=127.0.0.1
PROXY_PORT=1081
```

## 3、运行

```
pnpm run dev
```

打开地址：`http://localhost:18001/` 就可以访问本地 chatgpt 了