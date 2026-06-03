const api = require("./lib/validate.js");

if (require.main === module) {
  api.main();
}

module.exports = api;
