let agents = `
  chrome edge firefox gsa opera mini/mobi/tablet mobile safari instagram
`;

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
