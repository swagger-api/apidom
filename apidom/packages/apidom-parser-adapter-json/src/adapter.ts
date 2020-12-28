export const mediaTypes = ['application/json'];

export const detect = async (source: string): Promise<boolean> => {
  try {
    JSON.parse(source);
  } catch (e) {
    return false;
  }
  return true;
};
