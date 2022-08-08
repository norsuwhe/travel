const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
    entry: path.resolve(__dirname, 'src'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        clean: true,
        filename: 'bundle.[contenthash].js'
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                ],
            },
            {
                test: /\.html$/,
                use: [
                    'html-loader'
                ],
            },
        ]
    },
    plugins: [new HtmlWebpackPlugin({
        template: 'src/index.html'
    })],
    mode: 'production',
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    }
}