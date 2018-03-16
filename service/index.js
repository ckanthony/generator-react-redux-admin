const Generator = require('yeoman-generator');
const path = require('path');
const esprima = require('esprima');
const fs = require('fs');
const _ = require('lodash');
const acorn = require('acorn-jsx');
const walk = require('acorn-jsx-walk').default;

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
      message: 'Service name in single form (eg. campaign-step)',
      when: !this.options.name
    }, {
      name: 'urlPath',
      message: 'Service API URL Path (eg. regions)',
      when: !this.options.urlPath
    }];
    return this.prompt(prompts).then(props => {
      this.props = Object.assign(this.props, props);
    });
  }

  writing () {
    // declare names
    const props = this.props;
    // campaign_applications
    const urlPath = props.urlPath
    // CAMPAIGNAPPLICATION
    const actionName = this.props.name.split('-').join('').toUpperCase()
    // campaignApplication
    const camelCasedName = _.camelCase(props.name)
    // Campaign Application
    const startCasedName = _.startCase(props.name)
    // CampaignApplication
    const capitalisedName = _.startCase(props.name).replace(/\s/g, '')
    const snakeCasedName = _.snakeCase(props.name)
    const context = {
      urlPath,
      actionName,
      camelCasedName,
      startCasedName,
      snakeCasedName,
    }
    
    // check if the service exists
    const hasService = () => {
      const destinationPath = 'src/containers/App/index.jsx'
      const file = fs.readFileSync(this.destinationPath(destinationPath), 'utf8');
      const ast = acorn.parse(file, {
        locations: true,
        sourceType: 'module',
        plugins: { jsx: true }
      })
      return !!(ast.body.filter(node => node.type === 'ImportDeclaration').find(node => node.source.value === `../${capitalisedName}List`))
    }
    if (hasService()) {
      this.hasService = true
      this.log('Service is existed.')
      return
    }

    // copy reducers
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

    // copy actions
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

    // copy form containers
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

    // copy list containers
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

    // add reducers
    const editReducer = () => {
      const reducersJS = fs.readFileSync(this.destinationPath('', 'src/reducers/index.js'), 'utf8');
      const reducersAST = esprima.parseScript(reducersJS, { loc: true, tolerant: true });
      const astImports = reducersAST.body.filter(ast => ast.type === 'ImportDeclaration');
      const astReducers = reducersAST.body.filter(ast => ast.type === 'ExportDefaultDeclaration' && ast.declaration.callee.name === 'combineReducers');
      if (astImports.find(ast => ast.source.value !== './'+camelCasedName)) {
        const lines = reducersJS.split('\n');
        const astImport = astImports.pop();
        const importLineNumber = astImport.loc.end.line;
        const astReducer = astReducers[0].declaration.arguments[0].properties.pop();
        const reducerLineNumber = astReducer.loc.end.line;
        lines.splice(importLineNumber, 0, `import ${camelCasedName}List from './${camelCasedName}List'`);
        lines.splice(importLineNumber + 1, 0, `import ${camelCasedName}Form from './${camelCasedName}Form'`);
        lines.splice(reducerLineNumber + 2, 0, `  ${camelCasedName}List,`);
        lines.splice(reducerLineNumber + 3, 0, `  ${camelCasedName}Form,`);
        fs.writeFile(this.destinationPath('', 'src/reducers/index.js'), lines.join('\n'), function (err) {
          if (err) return console.log(err);
        });
      } 
    }
    editReducer()

    // add routes in app
    const editApp = () => { 
      const destinationPath = 'src/containers/App/index.jsx'
      const file = fs.readFileSync(this.destinationPath(destinationPath), 'utf8');
      const ast = acorn.parse(file, {
        locations: true,
        sourceType: 'module',
        plugins: { jsx: true }
      })
      const lines = file.split('\n');
      const importAst = ast.body.filter(node => node.type === 'ImportDeclaration').slice(-2, -1)[0]
      const routeAst = ast.body.find(node => node.type === 'ExportDefaultDeclaration').declaration.body.body[0].value.body.body[0].argument.children.find(node => node.type === 'JSXElement').children.filter(node => node.type === 'JSXElement').slice(-2, -1)[0]
      const importAstLineNumber = importAst.loc.start.line
      const routeAstLineNumber = routeAst.loc.start.line
      const urlPathName = `${snakeCasedName}s`
      lines.splice(importAstLineNumber, 0, `import ${capitalisedName}List from '../${capitalisedName}List'`);
      lines.splice(importAstLineNumber + 1, 0, `import ${capitalisedName}Form from '../${capitalisedName}Form'`);
      lines.splice(routeAstLineNumber + 2, 0, `          <PrivateRoute exact path='/admin/${urlPathName}' component={${capitalisedName}List} />`);
      lines.splice(routeAstLineNumber + 3, 0, `          <PrivateRoute exact path='/admin/${urlPathName}/create' component={props => <${capitalisedName}Form {...props} type='create' />} />`);
      lines.splice(routeAstLineNumber + 4, 0, `          <PrivateRoute exact path='/admin/${urlPathName}/edit/:itemId' component={props => <${capitalisedName}Form {...props} type='edit' />} />`);
      fs.writeFile(this.destinationPath(destinationPath), lines.join('\n'), function (err) {
        if (err) return console.log(err);
      });
    }
    editApp()

    // add menu items in admin layout
    const editAdminMenu = () => { 
      const destinationPath = 'src/components/AdminLayout/Menu.jsx'
      const file = fs.readFileSync(this.destinationPath(destinationPath), 'utf8');
      const ast = acorn.parse(file, {
        locations: true,
        sourceType: 'module',
        plugins: { jsx: true }
      })
      const lines = file.split('\n');
      const menuItemAst = ast.body.find(node => node.type === 'ExportDefaultDeclaration').declaration.body.children.filter(node => node.type === 'JSXElement').slice(-1)[0]
      const menuItemAstLineNumber = menuItemAst.loc.start.line
      const urlPathName = `${snakeCasedName}s`
      lines.splice(menuItemAstLineNumber, 0, `    <Menu.Item key='${urlPathName}'><Icon type='solution' /><span>${startCasedName}s</span></Menu.Item>`);
      fs.writeFile(this.destinationPath(destinationPath), lines.join('\n'), function (err) {
        if (err) return console.log(err);
      });
    }
    editAdminMenu()
    
    // append action types constants
    const editConstants = () => {
      const file = fs.readFileSync(this.destinationPath('src/constants/actionTypes.js'), 'utf8');
      const constants = this.fs.read(this.templatePath('constants'), 'utf8').replace(/\${NAME}/g, actionName);
      fs.writeFile(this.destinationPath('src/constants/actionTypes.js'), file.concat(constants), function (err) {
        if (err) return console.log(err);
      });
    }
    editConstants()
    
  }

  end() {
    !this.hasService && this.log('Service is created.');
  }
}