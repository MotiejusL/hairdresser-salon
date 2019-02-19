const path = require('path');

module.exports = {
  entry: './src/employee.js',
  output: {
    filename: 'employee-bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
