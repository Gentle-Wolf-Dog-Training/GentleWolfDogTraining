const path = require('path');
var glob = require("glob");
function getEntries() {
    return glob.sync('./src/*/script.ts')
        .map((file) => {
            return {
                name: file.replace("./src/", "").replace(".ts", ""),
                path: file
            }
        }).reduce((memo, file) => {
            memo[file.name] = [file.path, file.path.replace("script.ts", "style.scss")]
            return memo;
        }, {main: "./src/main.ts"})
}

module.exports = {
  entry: getEntries(),
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
            {
                loader: 'file-loader',
                options: {
                    outputPath: (url, resourcePath, context) => {
                        return `${path.relative(context, resourcePath).match(/src[/\\\\]([^/\\\\]*)[/\\\\].*\.scss$/)[1]}/${url}`;
                    },
                    name: '[name].min.css'
                }
            },
            'sass-loader'
        ]
      }
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build'),
  },
  optimization: {
      minimize: true
  }
};
