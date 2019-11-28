require("@babel/register")({
  presets: ["@babel/preset-env"],
  plugins: ["@babel/plugin-proposal-class-properties"]
});

// Import the rest of our application.
module.exports = require('./server.js')