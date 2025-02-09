import moment from "moment/moment";

export const diffList = ["简单", "中等", "困难"];

export const statusList = ["等待中", "判题中", "成功", "失败"];

export const judgeInfoMessageEnum = [
  { key: "ACCEPTED", text: "执行通过" },
  { key: "COMPILE_ERROR", text: "编译失败" },
  { key: "MEMORY_LIMIT_EXCEEDED", text: "内存溢出" },
  { key: "TIME_LIMIT_EXCEEDED", text: "执行超时" },
  { key: "RUNTIME_ERROR", text: "运行错误" },
  { key: "SYSTEM_ERROR", text: "系统错误" },
  { key: "WRONG_ANSWER", text: "答案错误" },
  { key: "DANGEROUS_OPERATION", text: "危险操作" },
  { key: "PRESENTATION_ERROR", text: "展示错误" },
  { key: "OUTPUT_LIMIT_EXCEEDED", text: "输出溢出" },
  { key: "WAITING", text: "等待中" },
];

export const languageList = [
  {
    value: "java",
    label: "java",
  },
  {
    value: "python",
    label: "python（开发中）",
    disabled: true,
  },
];

export const defaultLanguage = languageList[0].value;

export const userRoleList = ["admin", "user", "ban"];

export const genderList = ["男", "女"];

export const getSubmissionPercentage = (row: any) => {
  if (row.submitNum > 0 && row.acceptedNum > 0) {
    const ratio = (row.acceptedNum / row.submitNum) * 100;
    return `${ratio.toFixed(2)} %`;
  }
  return "0.00 %";
};

export const getSubmissionRatioText = (row: any) => {
  if (row.submitNum > 0 && row.acceptedNum > 0) {
    const ratio = (row.acceptedNum / row.submitNum) * 100;
    return `${row.acceptedNum}/${row.submitNum} （${ratio.toFixed(2)} %）`;
  }
  return "0/0 （0.00 %）";
};

export const formatDate = (date: any) =>
  moment(date).format("YYYY-MM-DD HH:mm:ss");
