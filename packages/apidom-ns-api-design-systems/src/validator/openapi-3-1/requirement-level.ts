export const may = (value: any, values: any[]) => {
  if (value === null) return true;

  return values.includes(value);
};

export const must = (value: any, values: any[]) => {
  return values.includes(value);
};
