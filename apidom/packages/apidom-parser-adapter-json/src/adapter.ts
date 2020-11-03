export const mediaTypes = ['application/javascript'];

export const detect = (source: string): boolean => {
  try {
    JSON.parse(source);
  } catch (e) {
    return false;
  }
  return true;
};
