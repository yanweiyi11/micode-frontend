/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { JudgeConfig } from "./JudgeConfig";
import type { JudgeInfo } from "./JudgeInfo";

export type QuestionDetailVO = {
  acceptedNum?: number;
  answer?: string;
  content?: string;
  createTime?: string;
  difficulty?: string;
  id?: number;
  judgeConfig?: JudgeConfig;
  judgeInfo?: JudgeInfo;
  status?: number;
  submitNum?: number;
  tags?: Array<string>;
  title?: string;
  userId?: number;
};
