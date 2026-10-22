const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const bump = require('@jsdevtools/version-bump-prompt');
const execa = require('execa');
const ora = require('ora');
const CURRENT_BRANCH = 'main';
const CHANGELOG_PATH = path.resolve(__dirname, '../CHANGELOG.md');
const log = console.log;
const showCurrentBranch = () => {
  return execa.sync('git', ['branch', '--show-current']).stdout;
};
const checkGitTreeClean = () => {
  const { stdout } = execa.sync('git', ['status', '--porcelain']);
  const infos = stdout.split('\n');
  if (infos.length && !!stdout) {
    infos.unshift('Git working directory is not clean.');
    infos.forEach(info => log(chalk.red('ERR!'), info.trim()));
    process.exit();
  }
};
const checkGhCli = () => {
  try {
    execa.sync('gh', ['auth', 'status']);
  } catch (error) {
    log(chalk.red('ERR!'), '自动发布 GitHub Release 需要先安装 gh 并执行 gh auth login');
    process.exit();
  }
};
// 从 CHANGELOG.md 中取出最新版本的内容作为 Release 说明（去掉版本标题行）
const getReleaseNotes = () => {
  const lines = fs.readFileSync(CHANGELOG_PATH, 'utf-8').split('\n');
  const nextIndex = lines.findIndex((line, index) => index > 0 && /^#{1,2} \[/.test(line));
  return lines.slice(1, nextIndex === -1 ? lines.length : nextIndex).join('\n').trim();
};
const currentBranch = showCurrentBranch();
if (currentBranch !== CURRENT_BRANCH) {
  log(chalk.red('ERR!'), `请先切换到「${CURRENT_BRANCH}」分支再进行发布操作`);
  process.exit();
}
checkGitTreeClean();
checkGhCli();
// 只更新 package.json 的版本号，和 changelog、打包产物一起放到同一个 release commit 里
bump({
  commit: false,
  tag: false,
  push: false,
}).then(data => {
  const { newVersion } = data;
  const spinner = ora({
    text: '📦 打包中...',
    color: 'blue',
  }).start();
  try {
    execa.sync('yarn', ['changelog']);
    execa.sync('yarn', ['build']);
    spinner.text = '🔨 提交代码...';
    spinner.color = 'green';
    execa.sync('git', ['add', '.']);
    execa.sync('git', ['commit', '-m', `chore(release): ${newVersion}`]);
    execa.sync('git', ['pull', '--rebase']);
    execa.sync('git', ['push']);
    spinner.text = '🚀 发布 GitHub Release...';
    // 沿用已有的不带 v 前缀的 tag 格式，tag 打在 rebase 之后的 release commit 上
    execa.sync('git', ['tag', newVersion]);
    execa.sync('git', ['push', 'origin', newVersion]);
    execa.sync('gh', ['release', 'create', newVersion, '--verify-tag', '--title', newVersion, '--notes', getReleaseNotes()]);
    spinner.succeed(`🎉 v${newVersion}发布成功!`);
  } catch (error) {
    spinner.fail(`v${newVersion}发布失败`);
    log(chalk.red('ERR!'), error.shortMessage || error.message);
    process.exit(1);
  }
});
