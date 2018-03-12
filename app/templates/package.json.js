const semver = require('semver');

module.exports = function(generator) {
  const major = semver.major(process.version);
  const { props } = generator;
  const lib = props.src;
  const [ packager, version ] = ['yarn', '1.3.2'];
  const pkg = {
    name: props.name,
    description: props.description,
    version: '0.0.0',
    keywords: [
      'react-starter',
    ],
    author: {
      name: generator.user.git.name(),
      email: generator.user.git.email()
    },
    engines: {
      node: `^${major}.0.0`,
      [packager]: version
    },
    'scripts': {
      "build": "NODE_ENV=production webpack --config webpack.config.prod.js --progress --profile --colors",
      "start": "NODE_ENV=development API_URL=http://localhost:3030 webpack-dev-server --config webpack.config.dev.js --colors",
      "test": "echo \"Error: no test specified\" && exit 1"
    }
  };

  return pkg;
};