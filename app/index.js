const Generator = require('yeoman-generator');
const path = require('path');
const { kebabCase } = require('lodash');

module.exports = class AppGenerator extends Generator {
  constructor (args, opts) {
    super(args, opts);

    this.pkg = this.fs.readJSON(this.destinationPath('package.json'), {});

    this.props = {
      name: this.pkg.name || process.cwd().split(path.sep).pop(),
      description: this.pkg.description,
      src: this.pkg.directories && this.pkg.directories.lib
    };

    this.dependencies = [
      'antd',
      'moment',
      'react',
      'react-dom',
      'react-redux',
      'react-router-dom',
      'redux',
      'redux-thunk'
    ];

    this.devDependencies = [
      'babel-core',
      'babel-eslint',
      'babel-loader',
      'babel-plugin-import',
      'babel-plugin-transform-class-properties',
      'babel-plugin-transform-object-rest-spread',
      'babel-plugin-transform-runtime',
      'babel-preset-env',
      'babel-preset-react',
      'babel-runtime',
      'case-sensitive-paths-webpack-plugin',
      'clean-webpack-plugin',
      'copy-webpack-plugin',
      'css-loader',
      'eslint',
      'eslint-config-airbnb',
      'eslint-plugin-import',
      'eslint-plugin-jsx-a11y',
      'eslint-plugin-react',
      'extract-text-webpack-plugin',
      'file-loader',
      'html-webpack-plugin',
      'less',
      'less-loader',
      'react-dev-utils',
      'react-hot-loader',
      'redux-immutable-state-invariant',
      'redux-logger',
      'style-loader',
      'url-loader',
      'webpack',
      'webpack-cleanup-plugin',
      'webpack-dev-server',
      'webpack-merge',
    ];
  }

  prompting () {
    const dependencies = this.dependencies.concat(this.devDependencies)
    const prompts = [{
      name: 'name',
      message: 'Project name',
      when: !this.pkg.name,
      default: this.props.name,
      filter: kebabCase,
      validate (input) {
        // The project name can not be the same as any of the dependencies
        // we are going to install
        const isSelfReferential = dependencies.some(dependency => {
          const separatorIndex = dependency.indexOf('@');
        const end = separatorIndex !== -1 ? separatorIndex : dependency.length;
        const dependencyName = dependency.substring(0, end);

        return dependencyName === input;
      });

        if (isSelfReferential) {
          return `Your project can not be named '${input}' because the '${input}' package will be installed as a project dependency.`;
        }

        return true;
      }
    }, {
      name: 'title',
      message: 'Title of your project',
      when: !this.options.title
    }, {
      name: 'description',
      message: 'Description',
      when: !this.pkg.description
    }];

    return this.prompt(prompts).then(props => {
      this.props = Object.assign(this.props, props);
    });
  }

  writing () {
    const props = this.props;
    const pkg = this.pkg = require(this.templatePath('package.json.js'))(this);

    this.fs.copy(this.templatePath('src'), this.destinationPath('src'));
    this.fs.copy(this.templatePath('_gitignore'), this.destinationPath('', '.gitignore'));
    this.fs.copy(this.templatePath('_dockerignore'), this.destinationPath('', '.dockerignore'));
    this.fs.copy(this.templatePath('_eslintignore'), this.destinationPath('', '.eslintignore'));
    this.fs.copy(this.templatePath('Dockerfile'), this.destinationPath('', 'Dockerfile'));
    this.fs.copy(this.templatePath('public'), this.destinationPath('', 'public'));
    this.fs.copyTpl(
      this.templatePath('public/index.html'),
      this.destinationPath('public/index.html'),
      {
        title: this.props.title
      }
    );
    this.fs.writeJSON(
      this.destinationPath('package.json'),
      pkg
    );
  }

  install () {
    this.yarnInstall(this.dependencies);
    this.yarnInstall(this.devDependencies, { 'dev': true });
  }
}