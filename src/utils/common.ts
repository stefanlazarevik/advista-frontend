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
