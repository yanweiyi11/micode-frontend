/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApiResponse_boolean_ } from '../models/ApiResponse_boolean_';
import type { ApiResponse_long_ } from '../models/ApiResponse_long_';
import type { ApiResponse_Page_User_ } from '../models/ApiResponse_Page_User_';
import type { ApiResponse_Page_UserVO_ } from '../models/ApiResponse_Page_UserVO_';
import type { ApiResponse_User_ } from '../models/ApiResponse_User_';
import type { ApiResponse_UserVO_ } from '../models/ApiResponse_UserVO_';
import type { DeleteRequest } from '../models/DeleteRequest';
import type { UserAddRequest } from '../models/UserAddRequest';
import type { UserLoginRequest } from '../models/UserLoginRequest';
import type { UserQueryRequest } from '../models/UserQueryRequest';
import type { UserRegisterRequest } from '../models/UserRegisterRequest';
import type { UserUpdateRequest } from '../models/UserUpdateRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UserControllerService {
    /**
     * addUser
     * @param addRequest addRequest
     * @returns ApiResponse_long_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static addUserUsingPost(
        addRequest: UserAddRequest,
    ): CancelablePromise<ApiResponse_long_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/user/add',
            body: addRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * deleteUser
     * @param deleteRequest deleteRequest
     * @returns ApiResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static deleteUserUsingPost(
        deleteRequest: DeleteRequest,
    ): CancelablePromise<ApiResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/user/delete',
            body: deleteRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * getUserById
     * @param id id
     * @returns ApiResponse_User_ OK
     * @throws ApiError
     */
    public static getUserByIdUsingGet(
        id: number,
    ): CancelablePromise<ApiResponse_User_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/user/get',
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
     * getUserVOById
     * @param id id
     * @returns ApiResponse_UserVO_ OK
     * @throws ApiError
     */
    public static getUserVoByIdUsingGet(
        id: number,
    ): CancelablePromise<ApiResponse_UserVO_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/user/get-vo',
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
     * listUserByPage
     * @param queryRequest queryRequest
     * @returns ApiResponse_Page_User_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listUserByPageUsingPost(
        queryRequest: UserQueryRequest,
    ): CancelablePromise<ApiResponse_Page_User_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/user/list-page',
            body: queryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * listUserVOByPage
     * @param queryRequest queryRequest
     * @returns ApiResponse_Page_UserVO_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listUserVoByPageUsingPost(
        queryRequest: UserQueryRequest,
    ): CancelablePromise<ApiResponse_Page_UserVO_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/user/list-vo-page',
            body: queryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * userLogin
     * @param userLoginRequest userLoginRequest
     * @returns ApiResponse_UserVO_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static userLoginUsingPost(
        userLoginRequest: UserLoginRequest,
    ): CancelablePromise<ApiResponse_UserVO_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/user/login',
            body: userLoginRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * userLogout
     * @returns ApiResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static userLogoutUsingPost(): CancelablePromise<ApiResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/user/logout',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * userRegister
     * @param userRegisterRequest userRegisterRequest
     * @returns ApiResponse_long_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static userRegisterUsingPost(
        userRegisterRequest: UserRegisterRequest,
    ): CancelablePromise<ApiResponse_long_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/user/register',
            body: userRegisterRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * updateUser
     * @param updateRequest updateRequest
     * @returns ApiResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static updateUserUsingPost(
        updateRequest: UserUpdateRequest,
    ): CancelablePromise<ApiResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/user/update',
            body: updateRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
}
