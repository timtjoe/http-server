const { default: parse } = require('./src/parse');

const lines = require('fs').readFileSync(0, 'utf8').split('\n');

function isVersion(s) {
  // TODO: return true only if s matches /^HTTP\/\d+\.\d+$/
  return s.startsWith("HTTP/");
}

parse.request(lines)