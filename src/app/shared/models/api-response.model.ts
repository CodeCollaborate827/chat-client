export interface APIResponse<T> {
    errorCode?: string,
    message?: string,
    data?: T
}

export interface NoDataAPIResponse {
    errorCode?: string,
    message?: string,
}