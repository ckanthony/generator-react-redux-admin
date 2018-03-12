const Generator = require('yeoman-generator');
const path = require('path');
const esprima = require('esprima');
const fs = require('fs');
const _ = require('lodash');

module.exports = class AppGenerator extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.props = {
      name: '',
      urlPath: '',
    }
  }


  prompting () {
    const prompts = [{
      name: 'name',
      message: 'Name of your service (campaign-step)',
      when: !this.options.name
    }, {
      name: 'urlPath',
      message: 'URL Path for your service api (eg. regions)',
      when: !this.options.urlPath
    }];

    return this.prompt(prompts).then(props => {
      this.props = Object.assign(this.props, props);
    });
  }


  writing () {
    const props = this.props;
    // campaign_applications
    const urlPath = this.props.urlPath
    // CAMPAIGNAPPLICATION
    const actionName = this.props.name.split('-').join('').toUpperCase()
    // campaignApplication
    const camelCasedName = _.camelCase(this.props.name)
    // Campaign Application
    const startCasedName = _.startCase(this.props.name)
    // CampaignApplication
    const capitalisedName = _.startCase(this.props.name).replace(/\s/g, '')
    const context = {
      urlPath,
      actionName,
      camelCasedName,
      startCasedName,
    }

    // reducers
    this.fs.copyTpl(
      this.templatePath('reducers/itemForm.js'),
      this.destinationPath(`src/reducers/${camelCasedName}Form.js`),
      context
    );
    this.fs.copyTpl(
      this.templatePath('reducers/itemList.js'),
      this.destinationPath(`src/reducers/${camelCasedName}List.js`),
      context
    );
    // actions
    this.fs.copyTpl(
      this.templatePath('actions/itemForm.js'),
      this.destinationPath(`src/actions/${camelCasedName}Form.js`),
      context
    );
    this.fs.copyTpl(
      this.templatePath('actions/itemList.js'),
      this.destinationPath(`src/actions/${camelCasedName}List.js`),
      context
    );
    // containers
    // form
    this.fs.copyTpl(
      this.templatePath('containers/ItemForm/Form.jsx'),
      this.destinationPath(`src/containers/${capitalisedName}Form/Form.js`),
      context
    );
    this.fs.copyTpl(
      this.templatePath('containers/ItemForm/index.jsx'),
      this.destinationPath(`src/containers/${capitalisedName}Form/index.js`),
      context
    );
    // list
    this.fs.copyTpl(
      this.templatePath('containers/ItemList/Table.jsx'),
      this.destinationPath(`src/containers/${capitalisedName}List/Table.js`),
      context
    );
    this.fs.copyTpl(
      this.templatePath('containers/ItemList/index.jsx'),
      this.destinationPath(`src/containers/${capitalisedName}List/index.js`),
      context
    );

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