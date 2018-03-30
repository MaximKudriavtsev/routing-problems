const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');

module.exports = (env) => {
    const isDevBuild = !(env && env.prod);

    // Configuration in common to both client-side and server-side bundles
    const sharedConfig = () => ({
        output: {
            filename: '[name].js',
            chunkFilename: '[name].bundle.js',
            publicPath: 'dist/'
        },
        //https://webpack.js.org/configuration/stats/
        // Add built modules information
        stats: {
            modules: false
        },
        //https://webpack.js.org/configuration/resolve/#resolve-extensions
        //can import files without extansions
        resolve: {
            extensions: ['.js', '.jsx']
        },
        //https://webpack.js.org/configuration/module/
        module: {
            rules: [
                { test: /\.(js|jsx)$/, include: /ClientApp/, use: { loader: "eslint-loader" }, enforce: 'pre'},
                { test: /\.(js|jsx)$/, include: /ClientApp/, use: { loader: "babel-loader" } },
                //https://webpack.js.org/loaders/url-loader/
                //looks like need install, need check
                { test: /\.(png|jpg|jpeg|gif|svg)$/, use: 'url-loader?limit=25000' }
            ]
        },
        plugins: [
            new webpack.optimize.CommonsChunkPlugin({
                children: true,
                async: true,
            }),
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': isDevBuild 
                    ? '"development"' 
                    : '"production"'
            }),
            new webpack.NormalModuleReplacementPlugin(/\/iconv-loader$/, require.resolve('node-noop')), // Workaround for https://github.com/andris9/encoding/issues/16
        ]
    });

    const pluginMap = isDevBuild ? [
        // Plugins that apply in development builds only
        new webpack.SourceMapDevToolPlugin({
            moduleFilenameTemplate: path.relative('./wwwroot/dist', '[resourcePath]') // Point sourcemap entries to the original file locations on disk
        })
    ] : [
        //https://webpack.js.org/guides/migrating/#uglifyjsplugin-sourcemap
        //Plugins that apply in production builds only
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            sourceMap: true,
        })
    ]
    // Configuration for client-side bundle suitable for running in browsers
    const clientBundleConfig = merge(sharedConfig(), {
        entry: {
            'main-client':['babel-polyfill', './ClientApp/boot-client.jsx']
        },
        output: {
            path: path.join(__dirname, './wwwroot/dist')
        },
        module: {
            rules: [
                { test: /\.css$/, use: ExtractTextPlugin.extract({ use: isDevBuild ? 'css-loader' : 'css-loader?minimize' }) }
            ]
        },
        plugins: [
            //https://github.com/webpack-contrib/extract-text-webpack-plugin
            //load css styles in another file
            new ExtractTextPlugin('site.css')
        ].concat(pluginMap)
    });

    // Configuration for server-side (prerendering) bundle suitable for running in Node
    const serverBundleConfig = merge(sharedConfig(), {
        entry: {
            'main-server': ['babel-polyfill', './ClientApp/boot-server.jsx']
        },
        output: {
            libraryTarget: 'commonjs',
            path: path.join(__dirname, './ClientApp/dist')
        },
        //https://webpack.js.org/configuration/resolve/#resolve-mainfields
        //import only main from package
        resolve: {
            mainFields: ['main']
        },
        plugins: pluginMap,
        target: 'node',
        devtool: 'inline-source-map'
    });

    return [clientBundleConfig, serverBundleConfig];
};