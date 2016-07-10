'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.Base.extend({
  constructor: function () {
    yeoman.Base.apply(this, arguments);
  },

  greet: function () {
    this.log(yosay('Welcome to the awesome ' + chalk.red('express-basic') + ' generator!'));

    var prompts = [{
      type: 'input', name: 'name', message: 'Your project name', default: this.appname
    }, {
      type: 'input', name: 'description', message: 'Your project description', default: ''
    }, {
      type: 'input', name: 'author', message: 'Who\'s the author?', default: ''
    }, {
      type: 'input', name: 'repo', message: 'What\' the git repository?', default: ''
    }, {
      type: 'confirm', name: 'install', message: 'Do you want to run NPM install?', default: false
    }];

    return this.prompt(prompts).then(function (answers) {
      this.props = answers;
    }.bind(this));
  },

  writeConfig: function () {
    this.fs.copy(this.templatePath('.babelrc'), this.destinationPath('.babelrc'));
    this.fs.copy(this.templatePath('.eslintignore'), this.destinationPath('.eslintignore'));
    this.fs.copy(this.templatePath('.eslintrc'), this.destinationPath('.eslintrc'));
    this.fs.copy(this.templatePath('.gitignore'), this.destinationPath('.gitignore'));
    this.fs.copyTpl(this.templatePath('package.json'), this.destinationPath('package.json'), {
      name: this.props.name,
      description: this.props.description,
      author: this.props.author,
      repo: this.props.repo
    });
    this.fs.copy(this.templatePath('README.md'), this.destinationPath('README.md'));
    this.fs.copy(this.templatePath('utils/*'), this.destinationPath('utils'));
  },

  writeApp: function () {
    this.fs.copy(this.templatePath('server.js'), this.destinationPath('server.js'));
    this.fs.copy(this.templatePath('config/*'), this.destinationPath('config'));
    this.fs.copy(this.templatePath('models/*'), this.destinationPath('models'));
    this.fs.copy(this.templatePath('public/*'), this.destinationPath('public'));
    this.fs.copy(this.templatePath('routes/*'), this.destinationPath('routes'));
    this.fs.copy(this.templatePath('tests/*'), this.destinationPath('tests'));
    this.fs.copyTpl(this.templatePath('views/*'),
      this.destinationPath('views'),
      { name: this.props.name });
  },

  install: function () {
    if (this.props.install) {
      this.installDependencies({
        bower: false
      });
    }
  }
});
