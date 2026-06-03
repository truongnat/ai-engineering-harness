const api = require("./lib/install-cache.js");

if (require.main === module) {
  try {
    api.main();
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}

module.exports = api;
