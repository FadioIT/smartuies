let version;
try {
  // eslint-disable-next-line
  ({ version } = require('date-fns/package.json'));
} catch {
  version = '';
}

const MAJOR_VERSION = Number(version.split('.')[0]);

if (MAJOR_VERSION < 2) {
  module.exports = require('./DateFnsV1Adapter');
} else {
  module.exports = require('./DateFnsV2Adapter');
}
