/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApiResponse_boolean_ } from '../models/ApiResponse_boolean_';
import type { ApiResponse_List_QuestionSubmitVO_ } from '../models/ApiResponse_List_QuestionSubmitVO_';
import type { ApiResponse_long_ } from '../models/ApiResponse_long_';
import type { ApiResponse_Page_QuestionSubmitDetailVO_ } from '../models/ApiResponse_Page_QuestionSubmitDetailVO_';
import type { ApiResponse_QuestionSubmitDetailVO_ } from '../models/ApiResponse_QuestionSubmitDetailVO_';
import type { DeleteRequest } from '../models/DeleteRequest';
import type { QuestionSubmitAddRequest } from '../models/QuestionSubmitAddRequest';
import type { QuestionSubmitDetailQueryRequest } from '../models/QuestionSubmitDetailQueryRequest';
import type { QuestionSubmitDoJudgeRequest } from '../models/QuestionSubmitDoJudgeRequest';
import type { QuestionSubmitUpdateRequest } from '../models/QuestionSubmitUpdateRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class QuestionSubmitControllerService {
    /**
     * addQuestionSubmit
     * @param addRequest addRequest
     * @returns ApiResponse_long_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static addQuestionSubmitUsingPost(
        addRequest: QuestionSubmitAddRequest,
    ): CancelablePromise<ApiResponse_long_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/question-submit/add',
            body: addRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * deleteQuestionSubmit
     * @param deleteRequest deleteRequest
     * @returns ApiResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static deleteQuestionSubmitUsingPost(
        deleteRequest: DeleteRequest,
    ): CancelablePromise<ApiResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/question-submit/delete',
            body: deleteRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * doJudge
     * @param doJudgeRequest doJudgeRequest
     * @returns ApiResponse_long_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static doJudgeUsingPost(
        doJudgeRequest: QuestionSubmitDoJudgeRequest,
    ): CancelablePromise<ApiResponse_long_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/question-submit/do-judge',
            body: doJudgeRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * getQuestionSubmitDetailVOById
     * @param id id
     * @returns ApiResponse_QuestionSubmitDetailVO_ OK
     * @throws ApiError
     */
    public static getQuestionSubmitDetailVoByIdUsingGet(
        id: number,
    ): CancelablePromise<ApiResponse_QuestionSubmitDetailVO_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/question-submit/get-detail-vo',
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
     * listQuestionSubmitDetailVOByPage
     * @param queryRequest queryRequest
     * @returns ApiResponse_Page_QuestionSubmitDetailVO_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listQuestionSubmitDetailVoByPageUsingPost(
        queryRequest: QuestionSubmitDetailQueryRequest,
    ): CancelablePromise<ApiResponse_Page_QuestionSubmitDetailVO_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/question-submit/list-detail-vo-page',
            body: queryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * listQuestionSubmitVOByQuestionId
     * @param questionId questionId
     * @returns ApiResponse_List_QuestionSubmitVO_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listQuestionSubmitVoByQuestionIdUsingPost(
        questionId: number,
    ): CancelablePromise<ApiResponse_List_QuestionSubmitVO_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/question-submit/list-vo-user',
            query: {
                'questionId': questionId,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * updateQuestionSubmit
     * @param updateRequest updateRequest
     * @returns ApiResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static updateQuestionSubmitUsingPost(
        updateRequest: QuestionSubmitUpdateRequest,
    ): CancelablePromise<ApiResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/question-submit/update',
            body: updateRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
}
