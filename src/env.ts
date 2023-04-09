import dotenv from "dotenv";
dotenv.config();

export const OPENAI_API_BASEURL = process.env.OPENAI_API_BASEURL;
export const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
export const OPENAI_API_ORG = process.env.OPENAI_API_ORG;
export const PROXY_OPEN = process.env.PROXY_OPEN;
export const PROXY_HOST = process.env.PROXY_HOST;
export const PROXY_PORT = process.env.PROXY_PORT;
export const SERVER_PORT = process.env.SERVER_PORT;
