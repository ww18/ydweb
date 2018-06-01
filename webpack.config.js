/**
 * Created by ww on 2018/5/28.
 */
const argv = require('yargs-parser')(process.argv.slice(2));
const marge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const glob = require('glob');
const files = glob.sync('./src/webapp/views/**/*.entry.js');
const _mode = argv.mode || "development";


const _mergeConfig = require(`./config/webpack.${_mode}.js`);

const {resolve, join, basename} = require('path');

let _entry = {};

for(let item of files){
    if(/.+\/([a-zA-Z]+)(\.entry\.js$)/g.test(item)){
        const entrykey = RegExp.$1;
        console.log(entrykey);
        _entry[entrykey] = item;
    }
}

let webpackConfig = {
    entry: _entry,
    output: {
        path: join(__dirname,'./dist/'),
        publicPath: '/',
        filename: 'assets/scripts/[name].bundle.js'
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
        new CopyWebpackPlugin(
            [{ from: 'src/webapp/views/', to: 'views/'}],
            { copyUnmodified: true }
        )
    ]

}
module.exports = marge(_mergeConfig,webpackConfig);
