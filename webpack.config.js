const path = require('path');

const yargs = require('yargs');

const { env } = yargs.argv; // use --env with webpack 2

const shouldExportToAMD = yargs.argv.amd;

let libraryName = 'index';

let outputFile;
let mode;

if (shouldExportToAMD) {
    libraryName += '.amd';
}

if (env === 'build') {
    mode = 'production';
    outputFile = `${libraryName}.min.js`;
} else {
    mode = 'development';
    outputFile = `${libraryName}.js`;
}

const config = {
    mode,
    entry: `${__dirname}/src/index.js`,
    devtool: 'source-map',
    output: {
        path: `${__dirname}/lib`,
        filename: outputFile,
        library: libraryName,
        libraryTarget: shouldExportToAMD ? 'amd' : 'umd',
        libraryExport: 'default',
        umdNamedDefine: true,
        globalObject: `typeof self !== 'undefined' ? self : this`,
    },
    module: {
        rules: [
            {
                test: /(\.jsx|\.js|\.ts|\.tsx)$/,
                use: {
                    loader: 'babel-loader',
                },
                exclude: /(node_modules|bower_components)/,
            },
        ],
    },
    resolve: {
        modules: [path.resolve('./node_modules'), path.resolve('./src')],
        extensions: ['.json', '.js'],
    },
};

module.exports = config;
