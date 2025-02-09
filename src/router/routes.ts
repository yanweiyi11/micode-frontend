import { RouteRecordRaw } from "vue-router";
import NoAuthView from "@/views/NoAuthView.vue";
import AccessEnum from "@/enums/AccessEnum";
import UserLoginView from "@/views/user/UserLoginView.vue";
import UserRegisterView from "@/views/user/UserRegisterView.vue";
import IndexView from "@/views/IndexView.vue";
import QuestionView from "@/views/question/QuestionView.vue";
import QuestionSolveView from "@/views/question/QuestionSolveView.vue";
import JudgeRecordView from "@/views/judge/JudgeRecordView.vue";
import QuestionManageView from "@/views/admin/QuestionManageView.vue";
import UserManageView from "@/views/admin/UserManageView.vue";
import QuestionUpdateView from "@/views/admin/QuestionUpdateView.vue";
import QuestionAddView from "@/views/admin/QuestionAddView.vue";
import UserAddView from "@/views/admin/UserAddView.vue";
import UserUpdateView from "@/views/admin/UserUpdateView.vue";
import LeaderBoard from "@/components/LeaderBoard.vue";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "主页",
    component: IndexView,
    meta: {
      access: AccessEnum.NOT_LOGIN,
      isShow: true,
    },
  },
  {
    path: "/question",
    name: "题库",
    component: QuestionView,
    meta: {
      access: AccessEnum.NOT_LOGIN,
      isShow: true,
    },
  },
  {
    path: "/question/solve/:id",
    name: "题目",
    component: QuestionSolveView,
    meta: {
      access: AccessEnum.NOT_LOGIN,
      isShow: false,
    },
  },
  {
    path: "/judge/record",
    name: "判题记录",
    component: JudgeRecordView,
    meta: {
      access: AccessEnum.NOT_LOGIN,
      isShow: true,
    },
  },
  {
    path: "/no-auth",
    name: "无权限",
    component: NoAuthView,
    meta: {
      access: AccessEnum.NOT_LOGIN,
      isShow: false,
    },
  },
  {
    path: "/user",
    name: "用户",
    children: [
      {
        path: "login",
        name: "用户登录",
        component: UserLoginView,
      },
      {
        path: "register",
        name: "用户注册",
        component: UserRegisterView,
      },
    ],
    meta: {
      access: AccessEnum.NOT_LOGIN,
      isShow: false,
    },
  },
  {
    path: "/admin",
    name: "管理员",
    children: [
      {
        path: "question-manage",
        name: "题目管理",
        component: QuestionManageView,
      },
      {
        path: "user-manage",
        name: "用户管理",
        component: UserManageView,
      },
    ],
    meta: {
      access: AccessEnum.ADMIN,
      isShow: true,
    },
  },
  {
    path: "/question/update/:id",
    name: "更新题目",
    component: QuestionUpdateView,
    meta: {
      access: AccessEnum.ADMIN,
      isShow: false,
    },
  },
  {
    path: "/question/add",
    name: "添加题目",
    component: QuestionAddView,
    meta: {
      access: AccessEnum.ADMIN,
      isShow: false,
    },
  },
  {
    path: "/user/update/:id",
    name: "更新用户",
    component: UserUpdateView,
    meta: {
      access: AccessEnum.USER,
      isShow: false,
    },
  },
  {
    path: "/user/add",
    name: "添加用户",
    component: UserAddView,
    meta: {
      access: AccessEnum.ADMIN,
      isShow: false,
    },
  },
  {
    path: "/leader-board",
    name: "排行榜",
    component: LeaderBoard,
    meta: {
      access: AccessEnum.USER,
      isShow: false,
    },
  },
];
