const pagination = (total: number, limit: number): number => {
  return Math.ceil(total / limit);
};

export { pagination };
