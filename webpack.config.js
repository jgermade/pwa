/* global process */

var webpack = require('webpack'),
    fs = require('fs'),
    YAML = require('js-yaml'),
    branch = process.env.CI_BRANCH || process.env.DRONE_BRANCH || process.env.GIT_BRANCH || ( '' + require('child_process').execSync('git symbolic-ref --short -q HEAD 2>/dev/null') );

module.exports = {
  module: {
    rules: [{
      test: /\.html$/,
      use: [ {
        loader: 'html-loader',
        options: {
          minimize: true,
          removeComments: false,
          collapseWhitespace: false
        }
      }],
    }]
  },
  plugins: [
    new webpack.DefinePlugin({
      APP_ENV: JSON.stringify( YAML.safeLoad( fs.readFileSync('env.yml', { encoding: 'utf8' }) )[ branch === 'release' ? 'production' : 'development' ] )
    })
  ],
};
