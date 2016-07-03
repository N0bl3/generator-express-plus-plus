const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('writeConfig', function () {
  before(function () {
    return helpers.run(path.join(__dirname, '../app'))
      .withPrompts({
        name: "Travis",
        description: "awesome",
        author: "You",
        repo: "Empty repo"
      }) // Mock the prompt answers
      .toPromise();
  });
  it('generate config files', function () {
    assert.file([".babelrc", ".eslintrc", 'public/js/.eslintrc', ".gitignore", "package.json", 'utils/init.js', 'utils/buildJade.js']);
  });
});
