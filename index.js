const fs = require('fs');
const path = require('path');
const got = require('got');
const mkdirp = require('mkdirp');
const unzip = require('unzip');
const stripPath = require('./lib/strip-path');
const pkg = require('./package.json');

function fetch(url, relativePath = '') {
  const destPath = path.join(process.cwd(), relativePath);

  got.stream(url, {
    headers: {
      'user-agent': `${pkg.name}/${pkg.version} (${pkg.homepage})`
    }
  })
  .on('error', _err)
  .pipe(unzip.Parse()) // eslint-disable-line new-cap
  .on('entry', function (entry) {
    const isFile = entry.type === 'File'; // File | Directory
    const fullPath = path.join(destPath, stripPath(entry.path, 2));
    const directory = isFile ? path.dirname(fullPath) : fullPath;
    const filename = path.basename(fullPath);

    // Just extract files/folders located in the `templates` directory.
    if (/templates/.test(entry.path)) {
      console.log(entry.path);
      mkdirp(directory, err => {
        if (err) {
          _err(err);
        }
        if (isFile) {
          console.log(filename);
          entry.pipe(fs.createWriteStream(fullPath));
        }
      });
    } else {
      // Auto drain the stream
      entry.autodrain();
    }
  });

}

function _err(err) {
  throw new Error(err);
}

module.exports = {fetch};
