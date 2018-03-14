const Generator = require('yeoman-generator');
const path = require('path');
const { kebabCase } = require('lodash');
const _ = require('lodash');

module.exports = class AppGenerator extends Generator {
  constructor (args, opts) {
    super(args, opts);

    this.pkg = this.fs.readJSON(this.destinationPath('package.json'), {});

    const name = this.pkg.name || process.cwd().split(path.sep).pop()
    this.props = {
      name,
      description: this.pkg.description,
      src: this.pkg.directories && this.pkg.directories.lib
    };

    this.dependencies = [
      "antd@^3.2.1",
      "moment@^2.21.0",
      "react@^16.2.0",
      "react-dom@^16.2.0",
      "react-redux@^5.0.5",
      "react-router-dom@^4.2.2",
      "redux@^3.7.2",
      "redux-thunk@^2.2.0"
    ]

    this.devDependencies = [
      "babel-core@^6.23.1",
      "babel-eslint@^8.2.1",
      "babel-loader@^7.1",
      "babel-plugin-import@^1.6.3",
      "babel-plugin-transform-class-properties@^6.24.1",
      "babel-plugin-transform-object-rest-spread@^6.26.0",
      "babel-plugin-transform-runtime@^6.23.0",
      "babel-preset-env@^1.6.0",
      "babel-preset-react@^6.23.0",
      "babel-runtime@^6.22.0",
      "case-sensitive-paths-webpack-plugin@^2.1.1",
      "clean-webpack-plugin@^0.1.18",
      "copy-webpack-plugin@^4.4.1",
      "css-loader@^0.28.9",
      "eslint@^4.9.0",
      "eslint-config-airbnb@^16.1.0",
      "eslint-plugin-import@^2.7.0",
      "eslint-plugin-jsx-a11y@^6.0.2",
      "eslint-plugin-react@^7.4.0",
      "extract-text-webpack-plugin@^3.0.2",
      "file-loader@^1.1.9",
      "html-webpack-plugin@^2.26.0",
      "less@2.7.2",
      "less-loader@^4.0.5",
      "react-dev-utils@^5.0.0",
      "react-hot-loader@^3.0.0-beta.6",
      "redux-immutable-state-invariant@^2.1.0",
      "redux-logger@^3.0.6",
      "style-loader@^0.20.1",
      "url-loader@0.5.7",
      "webpack@^3.3.0",
      "webpack-cleanup-plugin@^0.4.2",
      "webpack-dev-server@^2.4.1",
      "webpack-merge@^4.1.1"
    ]
    
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
    this.fs.copy(this.templatePath('_babelrc'), this.destinationPath('.babelrc'));
    this.fs.copy(this.templatePath('_dockerignore'), this.destinationPath('.dockerignore'));
    this.fs.copy(this.templatePath('_eslintignore'), this.destinationPath('.eslintignore'));
    this.fs.copy(this.templatePath('_eslintrc'), this.destinationPath('.eslintrc'));
    this.fs.copy(this.templatePath('_gitignore'), this.destinationPath('.gitignore'));
    this.fs.copy(this.templatePath('Dockerfile'), this.destinationPath('Dockerfile'));
    this.fs.copy(this.templatePath('webpack.config.common.js'), this.destinationPath('webpack.config.common.js'));
    this.fs.copy(this.templatePath('webpack.config.dev.js'), this.destinationPath('webpack.config.dev.js'));
    this.fs.copy(this.templatePath('webpack.config.prod.js'), this.destinationPath('webpack.config.prod.js'));
    this.fs.copy(this.templatePath('public'), this.destinationPath('public'));
    this.fs.copyTpl(
      this.templatePath('public/index.html'),
      this.destinationPath('public/index.html'),
      {
        title: this.props.title || this.props.name
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