import { getIfUtils, removeEmpty } from 'webpack-config-utils';
import { join, resolve } from 'path';
import chalk from 'chalk';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import LiveReloadPlugin from 'webpack-livereload-plugin';
import ProgressBarPlugin from 'progress-bar-webpack-plugin';
import webpack from 'webpack';
import WebpackCleanupPlugin from 'webpack-cleanup-plugin';

const config = env => {
  const { ifProd, ifNotProd } = getIfUtils(env);
  const configVars = JSON.stringify(`${ifProd('production', 'development')}`);
  const minify = {
    collapseWhitespace: true,
    keepClosingSlash: true,
    minifyCSS: true,
    minifyJS: true,
    minifyURLs: true,
    removeComments: true,
    removeEmptyAttributes: true,
    removeRedundantAttributes: true,
    removeStyleLinkTypeAttributes: true,
    showErrors: true,
    useShortDoctype: true
  };

  let chromeUA = 'Chrome/65.0.3325.162 Safari/537.36';
  let mozUA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3)';
  let safariUA = 'AppleWebKit/537.36 (KHTML, like Gecko)';

  let devUA = {
    'browser': {
      'name': 'Chrome',
      'version': '65.0.3325.162',
      'major': '65'
    },
    'cpu': {},
    'device': {},
    'engine': {
      'name': 'WebKit',
      'version': '537.36'
    },
    'os': {
      'name': 'Mac OS',
      'version': '10.13.3'
    },
    'ua': `${mozUA} ${safariUA} ${chromeUA}`
  };

  const serverVars = {
    baseUrl: JSON.stringify('/'),
    host: JSON.stringify('build'),
    originalUrl: JSON.stringify('/'),
    'process.env.NODE_ENV': configVars,
    tagOptions: false,
    uaName: JSON.stringify(devUA)
  };

  const envConfig = {
    devServer: {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
      },
      historyApiFallback: true,
      hot: true,
      publicPath: '/',
      stats: {
        assets: false,
        cached: false,
        cachedAssets: false,
        children: false,
        chunks: false,
        chunkModules: false,
        chunkOrigins: false,
        colors: true,
        depth: false,
        entrypoints: false,
        errors: true,
        errorDetails: true,
        hash: false,
        maxModules: 0,
        modules: false,
        performance: false,
        providedExports: false,
        publicPath: false,
        reasons: false,
        source: false,
        timings: false,
        usedExports: false,
        version: false,
        warnings: false
      }
    },
    devtool: ifProd(false, 'cheap-eval-source-map'),
    entry: resolve(__dirname, 'src/index'),
    mode: ifProd('production', 'development'),
    module: {
      noParse: [/aws-sdk/],
      rules: [
        {
          test: /\.json$/,
          loader: 'json-loader'
        },
        {
          enforce: 'pre',
          test: /\.jsx?$/,
          loader: 'eslint-loader',
          exclude: /node_modules/
        },
        {
          test: /\.jsx?$/,
          include: [resolve(__dirname, 'src')],
          loader: 'babel-loader'
        },
        {
          test: /\.(gif|ico|jpe?g|png)$/i,
          loader: 'file-loader?name=[name].[ext]'
        },
        {
          test: /(\.css|\.scss)$/,
          loaders: [{
              loader: 'style-loader',
              options: {
                sourceMap: ifProd(false, true)
              }
            },
            {
              loader: 'css-loader',
              options: {
                sourceMap: ifProd(false, true)
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: ifProd(false, true)
              }
            }
          ]
        }
      ]
    },
    output: {
      path: resolve(__dirname, 'dist'),
      pathinfo: ifNotProd(),
      publicPath: '/',
      filename: 'bundle.js'
    },
    performance: { hints: false },
    plugins: removeEmpty([
      ifProd(new ExtractTextPlugin('[name].[contenthash].css')),
      new HtmlWebpackPlugin({
        inject: true,
        minify: ifProd(minify, false),
        sourceMap: false,
        template: 'server/views/index.ejs'
      }),
      ifNotProd(new LiveReloadPlugin({ appendScriptTag: true })),
      new ProgressBarPlugin({
        clear: false,
        format: ` ${chalk.green(':bar')} ${chalk.cyan(':percent')} (:elapsed sec) \r`
      }),
      new webpack.DefinePlugin(serverVars)
    ]),
    resolve: {
      extensions: ['.js', '.jsx', '.json'],
    },
    target: 'web'
  };

  if (env.debug) {
    console.log(envConfig);
    debugger; // eslint-disable-line
  }

  return envConfig;
};

export default config;
