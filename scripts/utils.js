const { exec: nodeExec, spawn: nodeSpawn } = require('child_process');

const spawn = (cmd, args = [], options = {}) =>
  new Promise((resolve, reject) => {
    const child = nodeSpawn(cmd, args, {
      stdio: 'inherit',
      ...options,
    });

    child.on('error', reject);
    child.on('exit', code => {
      if (!code) {
        resolve();
      } else {
        process.exit(code);
      }
    });
  });

const exec = (cmd, options = {}) =>
  new Promise((resolve, reject) => {
    nodeExec(
      cmd,
      {
        encoding: 'utf8',
        stdio: 1,
        ...options,
      },
      (error, stdout, stderr) => {
        if (error || stderr) {
          reject(error || stderr);
        } else {
          resolve(stdout);
        }
      },
    );
  });

module.exports = {
  exec,
  spawn,
};
