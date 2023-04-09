import { OPENAI_API_BASEURL } from "../env";
import request from "./request";
const axios = request({ baseURL: OPENAI_API_BASEURL });
export default axios;
