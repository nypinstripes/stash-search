const agents = require('../../shared/data/browsers');

exports.isBrowserSupported = parser => {
  const { browser: { name }, ua } = parser;
  let browsers = agents.browsers.map(browser => browser.agents.join(' '));
  let user = name ? name.toLowerCase() : false;
  let social = agents.social.map(network => {
    return network.agents.filter(agent => ua.indexOf(agent) !== -1);
  });
  let support = true;

  if (name && social.length === 0 && browsers.join(' ').indexOf(name) === -1) {
    support = false;
  }

  return support;
};
