const responseSuccess = (message = 'Success') => {
  return {
    success: true,
    message,
  };
};

const responseSuccessWithData = (data: any, message = 'Success') => {
  return {
    success: true,
    message,
    data,
  };
};

const responseError = (message: string) => {
  return {
    success: false,
    message,
  };
};

export { responseSuccess, responseSuccessWithData, responseError };
