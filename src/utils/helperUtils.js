export const getBasicReducer = params => {
  const { action: { type, payload }, name, state } = params;

  return type === name ? payload : state;
};

export const uniqKey = () => {
  let firstPart = (new Date()).getTime().toString(36);
  let lastPart = Math.random().toString(36).substring(2);

  return `${firstPart}${lastPart}`;
};
