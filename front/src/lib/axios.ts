import axios from "axios";

const instance = axios.create({
  baseURL:
    "http://ec2-43-203-251-58.ap-northeast-2.compute.amazonaws.com:3080/api",
  // withCredentials: true,
});

export default instance;
