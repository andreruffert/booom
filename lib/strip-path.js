function stripPath(str, level) {
  return str.split('/').slice(level).join('/');
}

module.exports = stripPath;
