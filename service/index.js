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
      name: 'name',
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
    const reducersAST = esprima.parseScript(reducersJS, { loc: true, tolerant: true });

    const astImports = reducersAST.body.filter(ast => ast.type === 'ImportDeclaration');
    const astReducers = reducersAST.body.filter(ast => ast.type === 'ExportDefaultDeclaration' && ast.declaration.callee.name === 'combineReducers');

    if (astImports.find(ast => ast.source.value !== './'+props.name)) {
      const data = reducersJS.split('\n');
      // insert import statement
      const astImport = astImports.pop();
      const lineNumberImport = astImport.loc.end.line;
      const importStatement = `import ${props.name} from './${props.name}'`;
      data.splice(lineNumberImport, 0, importStatement);

      // insert reducer name
      const astReducer = astReducers[0].declaration.arguments[0].properties.pop();
      const lineNumberReducer = astReducer.loc.end.line;
      data.splice(lineNumberReducer + 1, 0, `  ${props.name},`);

      const newReducerJS = data.join('\n');

      fs.writeFile(this.destinationPath('', 'src/reducers/index.js'), newReducerJS, function (err) {
        if (err) return console.log(err);
      });
    }
  }

  end() {
    this.log('service added.');
  }
}