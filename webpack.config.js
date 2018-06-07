/**
 * Created by ww on 2018/5/28.
 */
const argv = require('yargs-parser')(process.argv.slice(2));
const marge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const htmlAfterWebpackPlugin = require('./config/htmlAfterWebpackPlugin.js');
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
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: 'babel-loader'
            },
            {
                test: /.css$/,
                use: ["style-loader", "css-loader", "postcss-loader"]
            }
        ]
    },
    plugins: [
        ..._plugins,
        new htmlAfterWebpackPlugin(),
        new CopyWebpackPlugin(
            [{ from: join(__dirname,'/src/webapp/views/common/layout.html'),
               to: '../views/common/layout.html'}],
            { copyUnmodified: true }
        ),
        new CopyWebpackPlugin(
            [{ from: join(__dirname,'/src/webapp/widgets/'),
                to: '../widgets'}],
            {
                copyUnmodified: true,
                ignore: ["*.js","*.css"]
            }
        )
    ]

}
module.exports = marge(_mergeConfig,webpackConfig);
