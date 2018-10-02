const { exec, spawn } = require('./utils');

const controlUncommittedFile = async () => {
  const uncommittedFileList = (await exec('git status --porcelain')).replace(
    /^\s*[^\s]+\s/gm,
    '	',
  );

  if (uncommittedFileList) {
    // eslint-disable-next-line no-console
    console.error(
      `error: The following uncommitted working tree files would distort test results:` +
        `\n${uncommittedFileList}`,
      '\nCommit or stash them (add --ignore-uncommitted to bypass)',
    );
    process.exit(1);
  }
};

(async () => {
  await controlUncommittedFile();
  await spawn('yarn', ['test']);
})();
