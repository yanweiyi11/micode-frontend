import { defineStore } from "pinia";
import { User, UserControllerService, UserVO } from "@/../openapi";
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
    async login(user: User) {
      const res = await UserControllerService.userLoginUsingPost(user);
      if (res.code === 0) {
        this.user = res.data;
        ElMessage.success("登陆成功");
        await router.push("/");
      } else {
        ElMessage.error("登陆失败，" + res.message);
      }
    },
    // 用户登出
    async logout() {
      const res = await UserControllerService.userLogoutUsingPost();
      if (res.code === 0) {
        this.user = null;
        ElMessage.success("登出成功");
        await router.push("/");
      } else {
        ElMessage.success("登出失败，" + res.message);
      }
    },
  },
});

export default useUserStore;
