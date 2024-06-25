/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { OrderItem } from "./OrderItem";
import type { QuestionDetailVO } from "./QuestionDetailVO";

export type Page_QuestionDetailVO_ = {
  countId?: string;
  current?: number;
  maxLimit?: number;
  optimizeCountSql?: boolean;
  orders?: Array<OrderItem>;
  pages?: number;
  records?: Array<QuestionDetailVO>;
  searchCount?: boolean;
  size?: number;
  total?: number;
};
