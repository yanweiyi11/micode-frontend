import AccessEnum from "@/enums/AccessEnum";
import { UserVO } from "../../openapi";

const checkAccess = (user: UserVO, needAccess = AccessEnum.NOT_LOGIN) => {
  const userAccess = user?.userRole ?? AccessEnum.NOT_LOGIN;
  switch (needAccess) {
    case AccessEnum.NOT_LOGIN:
      return true;
    case AccessEnum.USER:
      return userAccess !== AccessEnum.NOT_LOGIN;
    case AccessEnum.ADMIN:
      return userAccess === AccessEnum.ADMIN;
    default:
      return false;
  }
};

export default checkAccess;
