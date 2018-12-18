export const setReqOptions = params => {
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
