/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApiResponse_boolean_ } from '../models/ApiResponse_boolean_';
import type { ApiResponse_List_TagsVO_ } from '../models/ApiResponse_List_TagsVO_';
import type { ApiResponse_long_ } from '../models/ApiResponse_long_';
import type { ApiResponse_Page_QuestionDetailVO_ } from '../models/ApiResponse_Page_QuestionDetailVO_';
import type { ApiResponse_Page_QuestionVO_ } from '../models/ApiResponse_Page_QuestionVO_';
import type { ApiResponse_QuestionDetailVO_ } from '../models/ApiResponse_QuestionDetailVO_';
import type { ApiResponse_QuestionVO_ } from '../models/ApiResponse_QuestionVO_';
import type { DeleteRequest } from '../models/DeleteRequest';
import type { QuestionAddRequest } from '../models/QuestionAddRequest';
import type { QuestionDetailQueryRequest } from '../models/QuestionDetailQueryRequest';
import type { QuestionQueryRequest } from '../models/QuestionQueryRequest';
import type { QuestionUpdateRequest } from '../models/QuestionUpdateRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class QuestionControllerService {
    /**
     * addQuestion
     * @param addRequest addRequest
     * @returns ApiResponse_long_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static addQuestionUsingPost(
        addRequest: QuestionAddRequest,
    ): CancelablePromise<ApiResponse_long_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/question/add',
            body: addRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * deleteQuestion
     * @param deleteRequest deleteRequest
     * @returns ApiResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static deleteQuestionUsingPost(
        deleteRequest: DeleteRequest,
    ): CancelablePromise<ApiResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/question/delete',
            body: deleteRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * getQuestionDetailVOById
     * @param id id
     * @returns ApiResponse_QuestionDetailVO_ OK
     * @throws ApiError
     */
    public static getQuestionDetailVoByIdUsingGet(
        id: number,
    ): CancelablePromise<ApiResponse_QuestionDetailVO_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/question/get-detail',
            query: {
                'id': id,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * getTags
     * @returns ApiResponse_List_TagsVO_ OK
     * @throws ApiError
     */
    public static getTagsUsingGet(): CancelablePromise<ApiResponse_List_TagsVO_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/question/get-tags',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * getQuestionVOById
     * @param id id
     * @returns ApiResponse_QuestionVO_ OK
     * @throws ApiError
     */
    public static getQuestionVoByIdUsingGet(
        id: number,
    ): CancelablePromise<ApiResponse_QuestionVO_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/question/get-vo',
            query: {
                'id': id,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * listQuestionDetailVOByPage
     * @param queryRequest queryRequest
     * @returns ApiResponse_Page_QuestionDetailVO_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listQuestionDetailVoByPageUsingPost(
        queryRequest: QuestionDetailQueryRequest,
    ): CancelablePromise<ApiResponse_Page_QuestionDetailVO_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/question/list-detail-page',
            body: queryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * listQuestionByPage
     * @param queryRequest queryRequest
     * @returns ApiResponse_Page_QuestionVO_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listQuestionByPageUsingPost(
        queryRequest: QuestionQueryRequest,
    ): CancelablePromise<ApiResponse_Page_QuestionVO_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/question/list-vo-page',
            body: queryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * updateQuestion
     * @param updateRequest updateRequest
     * @returns ApiResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static updateQuestionUsingPost(
        updateRequest: QuestionUpdateRequest,
    ): CancelablePromise<ApiResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/question/update',
            body: updateRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
}
