// eslint-disable-next-line import/no-extraneous-dependencies
const { version } = require('date-fns/package.json');

const MAJOR_VERSION = Number(version.split('.')[0]);

if (MAJOR_VERSION < 2) {
  module.exports = require('./DateFnsV1Adapter');
} else {
  module.exports = require('./DateFnsV2Adapter');
}
