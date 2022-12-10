declare const responseSuccess: (data: any, message?: string) => {
    success: boolean;
    message: string;
    data: any;
};
declare const responseError: (message: string) => {
    success: boolean;
    message: string;
};
export { responseSuccess, responseError };
