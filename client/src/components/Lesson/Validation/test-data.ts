export const testData = [
  [
    {
      install: true,
      terminalRegex: /\s*npm\s+(i|install)\s+express\s*(--save)?\s*$/,
      // variableRegex: /const/,
      regex: /.?/,
      message: 'Error: Expected express package to be installed',
      suggestion: "Install express from npm by typing 'npm install express' here in the terminal",
    },
  ],
  [
    {
      install: false,
      terminalRegex: null,
      // variableRegex: /const/,
      regex: /\s*const\s+\w+/,
      message: 'Error: Expected const declaration',
      suggestion: "Make sure you use the keyword 'const' to declare your import",
    },
    {
      install: false,
      terminalRegex: null,
      // variableRegex: /(?<=\s*const\s+)(express)/,
      regex: /\s*const\s+(express)/,
      message: "Error: No const variable named 'express'",
      suggestion: "It's convention to name your express import 'express'",
    },
    {
      install: false,
      terminalRegex: null,
      // variableRegex: /(?<=\s*const\s+)(app|server)/,
      regex: /\s*const\s+express\s*=\s*require\('express'\)\s*;?\s*/,
      message: 'Error: Expected express package to be imported',
      suggestion:
        "Make sure you your express import looks like this: 'const express = require('express')",
    },
  ],
  [
    {
      install: false,
      terminalRegex: null,
      // variableRegex: /(?<=\s*const\s+)(app|server)/,
      regex: /\s*const\s+(app|server)/,
      message: "Error: No const variable named 'app' or 'server'",
      suggestion: "It's convention to name your server 'app'",
    },
    {
      install: false,
      terminalRegex: null,
      // variableRegex: /(?<=\s*const\s+)(app|server)/,
      regex: /\s*const\s+app\s*=\s*express\(\)/,
      message: 'Error: Expected app to be initialised as express function invocation',
      suggestion: "Make sure you your app declaration looks like this: 'const app = express()'",
    },
  ],
  [
    {
      install: false,
      terminalRegex: null,
      // variableRegex: /(?<=\s*const\s+)(app|server)/,
      regex: /\s*const\s+PORT/i,
      message: 'Error: No const variable named PORT',
      suggestion: "Have you named your const variable 'PORT'?",
    },
    {
      install: false,
      terminalRegex: null,
      // variableRegex: /(?<=\s*const\s+)(app|server)/,
      regex: /\s*const\s+(port|PORT)\s*=\s*300\d/,
      message: 'Error: Expected PORT to be initialised as a number between 3000 and 3009',
      suggestion: 'Have you correctly set your port between 3000-3009?',
    },
  ],
  [
    {
      install: false,
      terminalRegex: /\s*node\s+(index|index\.js)\s*$/,
      // variableRegex: /(?<=\s*const\s+)(app|server)/,
      regex: /.?/,
      message: 'Error: Expected execution of a .js file',
      suggestion: "Enter 'node index.js' to run your code",
    },
    {
      install: false,
      terminalRegex: null,
      // variableRegex: /(?<=\s*const\s+)(app|server)/,
      regex: /\s*app\.listen\(/,
      message: 'Error: Expected invocation of app.listen',
      suggestion: "Is your server listening with 'app.listen()'?",
    },
    {
      install: false,
      terminalRegex: null,
      // variableRegex: /(?<=\s*const\s+)(app|server)/,
      regex: /\s*app\.listen\((port|PORT)/,
      message: "Error: Expected first argument of app.listen to be 'PORT'",
      suggestion: 'have you listed your PORT variable as the first argument of app.listen?',
    },
    {
      install: false,
      terminalRegex: null,
      // variableRegex: /(?<=\s*const\s+)(app|server)/,
      regex: /\s*app\.listen\((port|PORT),\s*\(\s*\)\s*=>\s*\{\s*console\.log\(.+\)\s*;?\s*\}\s*\)/,
      message:
        'Error: Expected second argument of app.listen to be a callback function with only a console log',
      suggestion: 'Read the error message for a hint',
    },
  ],
  [
    {
      install: false,
      terminalRegex: /\s*node\s+(index|index\.js)\s*$/,
      // variableRegex: /(?<=\s*const\s+)(app|server)/,
      regex: /.?/,
      message: 'Error: Expected execution of a .js file',
      suggestion: "Enter 'node index.js' to run your code",
    },
    {
      install: false,
      terminalRegex: /\s*node\s+(index|index\.js)\s*$/,
      // variableRegex: /(?<=\s*const\s+)(app|server)/,
      // how can we match a backtick?
      regex: /\s*app\.listen\((port|PORT),\s*\(\s*\)\s*=>\s*\{\s*console\.log\(.+http:\/\/localhost:\$\{\s*(port|PORT)\s*\}.+\)\s*;?\s*\}\s*\)/,
      message: 'Error: Expected reference to correct port',
      suggestion: "make sure your console log includes 'http://localhost:${PORT}'",
    },
  ],
];
