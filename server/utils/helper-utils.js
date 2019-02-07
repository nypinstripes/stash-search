const agents = require('../../shared/data/browsers');

exports.getItemArrayIndex = params => {
  return params.items.findIndex(item => item.id === params.id);
};

exports.isBrowserSupported = parser => {
  const { browser: { name }, ua } = parser;
  let support = true;
  let browsers = agents.browsers.map(browser => browser.agents.join(' '));
  let social = agents.social.map(network => {
    return network.agents.filter(agent => ua.indexOf(agent) !== -1);
  });

  if (name && social.length === 0
    && browsers.join(' ').indexOf(name.toLowerCase()) === -1) {
      support = false;
  }

  return support;
};

exports.uniqKey = () => {
  let firstPart = (new Date()).getTime().toString(36);
  let lastPart = Math.random().toString(36).substring(2);

  return `${firstPart}${lastPart}`;
};
