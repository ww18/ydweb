/**
 * Created by ww on 2018/5/28.
 */
const CopyWebpackPlugin = require('copy-webpack-plugin');
const {resolve, join, basename} = require('path');
module.exports = {
    output: {
        filename: 'scripts/[name].bundle.js?v=[hash]'
    },
    plugins: [
        new CopyWebpackPlugin(
          [{ from: join(__dirname,'..','/src/webapp/views/common/layout.html'),
              to: '../views/common/layout.html'
          }],
          { copyUnmodified: true }
        ),
        new CopyWebpackPlugin(
          [{ from: join(__dirname,'..','/src/webapp/widgets/'),
              to: '../widgets'
            }],
            {
                copyUnmodified: true,
                  ignore: ["*.js","*.css"]
            })
    ]
}