const path = require('path');

module.exports = {
    mode: 'development',
    entry: './webpack/entry',
    output: {
        path: path.resolve(__dirname, 'src', 'assets', 'js'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader"
            },
        ]
    }
}