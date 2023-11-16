export const capitalizeFirstLetter = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const normalizeSpaces = (inputString: string) => {
  return inputString.replace(/\s+/g, ' ');
};
