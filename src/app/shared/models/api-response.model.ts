export interface APIResponse<T> {
    errorCode?: string,
    message?: string,
    data?: T
}