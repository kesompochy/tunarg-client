const path = require('path');

module.exports = {
    entry: './src/index.ts',
    mode: 'production',
    output: {
        path: path.resolve(__dirname, 'dist'),
        library: {
            name: 'TUNARG',
            type: 'umd',
            umdNamedDefine: true,
        },
        filename: "./index.js"
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader',
            },
        ]
    },
    resolve: {
        extensions: ['.ts', '.js'],
        roots: [__dirname],
        alias: {
        }
    },
};