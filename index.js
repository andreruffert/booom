const got = require('got');
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const unzip = require('unzip');
const stripPath = require('./lib/stripPath');
const pkg = require('./package.json');

function fetch(url, relativePath = '') {
  const destPath = path.join(process.cwd(), relativePath);

  got.stream(url, {
      headers: {
        'user-agent': `${pkg.name}/${pkg.version} (${pkg.repository})`
      }
    })
    .on('error', _err)
    .pipe(unzip.Parse())
    .on('entry', function (entry) {
      const isFile = 'File' === entry.type; // File | Directory
      const fullPath  = path.join(destPath, stripPath(entry.path, 2));
      const directory = !isFile ? fullPath : path.dirname(fullPath);
      const filename = path.basename(fullPath);

      // Just extract `/templates/**` files.
      if (/templates/.test(entry.path)) {
        mkdirp(directory, function(err) {
          if (err) {
            _err(err);
          }
          if (isFile) {
            entry.pipe(fs.createWriteStream(fullPath));
          }
        });
      }
      else {
        // Auto drain the stream
        entry.autodrain();
      }
    });
}

function _err(err) {
  throw new Error(err);
}

module.exports = { fetch };
