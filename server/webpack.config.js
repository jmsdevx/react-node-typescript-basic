var fs = require('fs');
var WebpackShellPlugin = require('webpack-shell-plugin');
var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

module.exports = {
  entry: './server/server.ts',
  output: {
    path: __dirname + '/dist',
    filename: 'server.js',
  },
  resolve: {
    // Add '.ts' and '.tsx' as a resolvable extension.
    extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      { test: /\.tsx?$/, loader: "ts-loader" }
    ]
  },
  plugins: [
      new WebpackShellPlugin({onBuildEnd:["node server/dist/server.js"]})
  ],
  watch: true,
  target: 'node',
  externals: nodeModules,
  mode:"development"
};