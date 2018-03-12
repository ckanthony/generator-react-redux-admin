const Generator = require('yeoman-generator');
const path = require('path');
const esprima = require('esprima');
const fs = require('fs');

module.exports = class AppGenerator extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.props = {
      name: ''
    }
  }


  prompting () {
    const prompts = [{
      name: 'Name',
      message: 'Name of your service',
      when: !this.options.name
    }];

    return this.prompt(prompts).then(props => {
      this.props = Object.assign(this.props, props);
    });
  }


  writing () {
    const props = this.props;

    const reducersJS = fs.readFileSync(this.destinationPath('', 'src/reducers/index.js'), 'utf8');
    var reducersAST = esprima.parseScript(reducersJS, { range: true, tolerant: true });

    console.log(reducersAST.body.filter(ast => ast.type === 'ImportDeclaration'));
    // this.fs.copy(this.templatePath('public'), this.destinationPath('', 'public'));
    // this.fs.copyTpl(
    //   this.templatePath('public/index.html'),
    //   this.destinationPath('public/index.html'),
    //   {
    //     title: this.props.title
    //   }
    // );
    // this.fs.writeJSON(
    //   this.destinationPath('package.json'),
    //   pkg
    // );
  }

  end() {
    this.log('service added.');
  }
}