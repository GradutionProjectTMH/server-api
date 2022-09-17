const pagination = (total: number, limit: number): number => {
  return Math.ceil(total / limit);
};

const removeKeyUndefined = (data: any) => {
  Object.keys(data).forEach((key) => {
    if (data[key] === undefined) {
      delete data[key];
    }
  });

  return data;
};
export { pagination, removeKeyUndefined };
