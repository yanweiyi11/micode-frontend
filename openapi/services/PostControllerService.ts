/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApiResponse_boolean_ } from '../models/ApiResponse_boolean_';
import type { ApiResponse_IPage_Post_ } from '../models/ApiResponse_IPage_Post_';
import type { ApiResponse_Post_ } from '../models/ApiResponse_Post_';
import type { Post } from '../models/Post';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class PostControllerService {
    /**
     * selectAll
     * @param content
     * @param countId
     * @param createTime
     * @param current
     * @param id
     * @param isDelete
     * @param maxLimit
     * @param optimizeCountSql
     * @param orders0Asc
     * @param orders0Column
     * @param pages
     * @param records0Content
     * @param records0CreateTime
     * @param records0Id
     * @param records0IsDelete
     * @param records0ThumbNum
     * @param records0Title
     * @param records0UpdateTime
     * @param records0UserId
     * @param searchCount
     * @param size
     * @param thumbNum
     * @param title
     * @param total
     * @param updateTime
     * @param userId
     * @returns ApiResponse_IPage_Post_ OK
     * @throws ApiError
     */
    public static selectAllUsingGet(
        content?: string,
        countId?: string,
        createTime?: string,
        current?: number,
        id?: number,
        isDelete?: number,
        maxLimit?: number,
        optimizeCountSql?: boolean,
        orders0Asc?: boolean,
        orders0Column?: string,
        pages?: number,
        records0Content?: string,
        records0CreateTime?: string,
        records0Id?: number,
        records0IsDelete?: number,
        records0ThumbNum?: number,
        records0Title?: string,
        records0UpdateTime?: string,
        records0UserId?: number,
        searchCount?: boolean,
        size?: number,
        thumbNum?: number,
        title?: string,
        total?: number,
        updateTime?: string,
        userId?: number,
    ): CancelablePromise<ApiResponse_IPage_Post_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/post',
            query: {
                'content': content,
                'countId': countId,
                'createTime': createTime,
                'current': current,
                'id': id,
                'isDelete': isDelete,
                'maxLimit': maxLimit,
                'optimizeCountSql': optimizeCountSql,
                'orders[0].asc': orders0Asc,
                'orders[0].column': orders0Column,
                'pages': pages,
                'records[0].content': records0Content,
                'records[0].createTime': records0CreateTime,
                'records[0].id': records0Id,
                'records[0].isDelete': records0IsDelete,
                'records[0].thumbNum': records0ThumbNum,
                'records[0].title': records0Title,
                'records[0].updateTime': records0UpdateTime,
                'records[0].userId': records0UserId,
                'searchCount': searchCount,
                'size': size,
                'thumbNum': thumbNum,
                'title': title,
                'total': total,
                'updateTime': updateTime,
                'userId': userId,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * insert
     * @param post post
     * @returns ApiResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static insertUsingPost(
        post: Post,
    ): CancelablePromise<ApiResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/post',
            body: post,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * update
     * @param post post
     * @returns ApiResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static updateUsingPut(
        post: Post,
    ): CancelablePromise<ApiResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/post',
            body: post,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * delete
     * @param idList idList
     * @returns ApiResponse_boolean_ OK
     * @throws ApiError
     */
    public static deleteUsingDelete(
        idList: Array<number>,
    ): CancelablePromise<ApiResponse_boolean_> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/post',
            query: {
                'idList': idList,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }
    /**
     * selectOne
     * @param id id
     * @returns ApiResponse_Post_ OK
     * @throws ApiError
     */
    public static selectOneUsingGet(
        id: string,
    ): CancelablePromise<ApiResponse_Post_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/post/{id}',
            path: {
                'id': id,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
}
