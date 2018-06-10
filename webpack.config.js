/**
 * Created by ww on 2018/5/28.
 */
const argv = require('yargs-parser')(process.argv.slice(2));
const marge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const htmlAfterWebpackPlugin = require('./config/htmlAfterWebpackPlugin.js');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const glob = require('glob');
const files = glob.sync('./src/webapp/views/**/*.entry.js');
const _mode = argv.mode || "development";
const _modeflag = (_mode == 'production') ? true : false;

const _mergeConfig = require(`./config/webpack.${_mode}.js`);

const {resolve, join, basename} = require('path');

let _entry = {}; //webpack 公用的入口
let _plugins = []; //webpack公用插件

for(let item of files){
    if(/.+\/([a-zA-Z]+-[a-zA-Z]+)\.entry\.js$/g.test(item)){
        const entrykey = RegExp.$1;
        console.log(entrykey);
        _entry[entrykey] = item;
        const [dist, template] = entrykey.split('-');
        _plugins.push(new HtmlWebpackPlugin({
            filename: `../views/${dist}/pages/${template}.html`,
            template: `src/webapp/views/${dist}/pages/${template}.html`,
            minify: {
                collapseWhitespace: _modeflag,
                removeAttributeQuotes: _modeflag
            },
            inject: false
        }));
    }
}

let webpackConfig = {
    entry: _entry,
    output: {
        path: join(__dirname,'./dist/assets/'),
        publicPath: '/',
        filename: 'scripts/[name].bundle.js'
    },
    optimization: {
        nodeEnv: _mode,
        runtimeChunk: {
            name: 'manifest'
        },
        //minimizer: false, // [new UglifyJsPlugin({...})]
        splitChunks: {
            chunks: 'async',
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            name: false,
            cacheGroups: {
                vendor: {
                    name: 'vendor',
                    chunks: 'initial',
                    priority: -10,
                    reuseExistingChunk: true,
                    test: /node_modules\/(.*).js/
                }
            }
        }
    },
    watch: !_modeflag,
    watchOptions: {
        ignored: /node_modules/,
        aggregateTimeout: 300,
        poll: 1
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: 'babel-loader'
            },
            {
                test: /.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [{
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            minimize: _modeflag  //是否开启压缩
                        }
                    },"postcss-loader"]
                })
            }
        ]
    },
    plugins: [
        ..._plugins,
        new htmlAfterWebpackPlugin(),
        new ExtractTextPlugin({
            filename: 'styles/[name].bundle.css?v=[hash]'
        })
    ]

}
module.exports = marge(_mergeConfig,webpackConfig);
