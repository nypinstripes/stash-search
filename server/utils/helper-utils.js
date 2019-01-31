let agents = `
  chrome edge firefox gsa opera mini/mobi/tablet mobile safari instagram
`;

exports.getItemArrayIndex = params => {
  const { items, id } = params;

  return items.findIndex(item => item.id === id);
};

exports.isBrowserSupported = parser => {
  const { browser: { name }, ua } = parser;

  if (name && agents.indexOf(name.toLowerCase()) === -1
    && ua.indexOf('FBAN') === -1
    && ua.indexOf('FBAV') === -1
    && ua.indexOf('Twitter') === -1
    && ua.indexOf('Instagram') === -1) {
      return false;
  } else {
    return true;
  }
};

exports.uniqKey = () => {
  let firstPart = (new Date()).getTime().toString(36);
  let lastPart = Math.random().toString(36).substring(2);

  return `${firstPart}${lastPart}`;
};
