import { defineStore } from "pinia";
import {
  User,
  UserControllerService,
  UserLoginRequest,
  UserVO,
} from "@/../openapi";
import router from "@/router";
import { ElMessage } from "element-plus";

const useUserStore = defineStore("user", {
  persist: {
    enabled: true,
    strategies: [
      {
        storage: localStorage, // or sessionStorage
      },
    ],
  },
  state: () => ({
    user: null as UserVO | null,
  }),
  getters: {
    getUser: (state) => state.user,
  },
  actions: {
    // 用户登录
    async login(user: UserLoginRequest) {
      const res = await UserControllerService.userLoginUsingPost(user);
      this.user = res.data;
      ElMessage.success("登录功");
      await router.push("/");
    },
    // 用户登出
    async logout() {
      await UserControllerService.userLogoutUsingPost();
      this.user = null;
      ElMessage.success("登出成功");
      await router.push("/");
    },
    // 删除用户信息
    deleteUser() {
      this.user = null;
    },
  },
});

export default useUserStore;
