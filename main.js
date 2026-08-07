const { default: parser } = require('./src/parser');
const lines = require('fs').readFileSync(0, 'utf8').split('\n');

// parser.request(lines);
parser.headers(lines);