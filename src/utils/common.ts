export const numberWithCommas = (x: any) => {
  if (!x) return 0;
  var parts = x.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
};

export const addDecimals = (num: number) => {
  if (num % 1 !== 0) {
    return parseFloat(num.toFixed(2));
  } else {
    return num;
  }
};
export const messageCharacter = (num: number) =>
  `Must be at least ${num} characters`;
export const TWO_CHARACTER = 'Must be at least 2 characters';
