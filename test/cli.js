import test from 'ava';
import execa from 'execa';
import pkg from '../package.json';

test('show --version', async t => {
  t.is(await execa.stdout('../cli.js', ['--version']), pkg.version);
});

test('show --help', async t => {
  t.regex(await execa.stdout('../cli.js', ['--help']), new RegExp(pkg.description));
});
