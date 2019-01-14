const args = require('yargs').argv;
const envVars = { 'GIPHY_KEY': args.GIPHY_KEY };

module.exports = envVars;
