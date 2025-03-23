import axios, { AxiosResponse } from "axios";
import { ElMessage } from "element-plus";
import router from "@/router";
import useUserStore from "@/stores/user";

// 添加请求拦截器
axios.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    return config;
  },
  (error) => {
    ElMessage.error("请求失败，请联系管理员");
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return processResponse(response);
  },
  (error) => {
    ElMessage.error("请求失败，请联系管理员");
    return Promise.reject(error);
  }
);

const processResponse = (response: AxiosResponse<any, any>) => {
  const { code, message } = response.data;

  if (code === 40100) {
    ElMessage.warning(message);
    useUserStore().deleteUser();
    router.push({ path: "/user/login" });
    return Promise.reject(new Error(message));
  }

  if (code !== 0) {
    ElMessage.error(message);
    return Promise.reject(new Error(message));
  }

  return response;
};
