const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: './src/index.ts',
    output: {
        libraryTarget: 'commonjs',
        // path needs to be an ABSOLUTE file path
        path: path.resolve(process.cwd(), 'dist'),
        filename: 'app.js',
    },
    target: 'node',
    node: {
        "__dirname": false,
    },
    // Enable sourcemaps for debugging webpack's output.
    devtool: 'source-map',
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        modules: [__dirname, 'node_modules'],
        extensions: ['.ts', '.tsx', '.js', '.json'],
        plugins: [
            new TsconfigPathsPlugin(),
        ]
    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            use: [{
                loader: 'awesome-typescript-loader',
            }],
            include: [
                path.resolve(__dirname, 'src'),
            ],
        },
            {
                test: /\.js$/,
                use: ["source-map-loader"],
                enforce: "pre"
            }]
    },
    externals: [nodeExternals({
        whitelist: [/^(?:(?!jsonpath|aws-sdk).)*$/]
    })],
    plugins: [
        new CleanWebpackPlugin(),
    ],
    optimization: {
        minimize: false,
    },
};
