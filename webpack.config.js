module.exports = {
    entry: './src/app.js',
    mode: 'development',
    output: {
        path: __dirname + '/public',
        filename: 'bundle.js'
    },
    devtool: 'source-maps',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                loader: "babel-loader",
                options: { presets: ["@babel/env"] }
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            }
        ]
    }
}