export interface Paged<T> {
    total: number,
    lastPage: number;
    data?: T;
}

export interface NodeResponse<T> {
    status: number,
    data?: T,
    message?: string;
}
