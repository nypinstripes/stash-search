export const camelizeString = str => {
  return str.replace(/[\s|_|-](.)/g, $1 => $1.toUpperCase())
    .replace(/[\s|_|-]/g, '')
    .replace(/^(.)/, $1 => $1.toLowerCase());
};

export const getBasicReducer = params => {
  const { action: { type, payload }, name, state } = params;

  return type === name ? payload : state;
};

export const inflectTerm = params => {
  const { count, term } = params;

  return count === 1 ? term.substring(0, term.length - 1) : term;
};

export const setRequestOptions = params => {
  const { accept, content, method } = params;
  let acceptHeader = accept ? accept : 'application/json';
  let contentTypeHeader = content ? content : 'application/json';
  let reqMethod = method ? method : 'GET';

  return {
    method: reqMethod,
    headers: {
      'Content-Type': contentTypeHeader,
      'Accept': acceptHeader
    }
  };
};
