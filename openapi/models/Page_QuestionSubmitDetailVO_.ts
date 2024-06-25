/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { OrderItem } from "./OrderItem";
import type { QuestionSubmitDetailVO } from "./QuestionSubmitDetailVO";

export type Page_QuestionSubmitDetailVO_ = {
  countId?: string;
  current?: number;
  maxLimit?: number;
  optimizeCountSql?: boolean;
  orders?: Array<OrderItem>;
  pages?: number;
  records?: Array<QuestionSubmitDetailVO>;
  searchCount?: boolean;
  size?: number;
  total?: number;
};
