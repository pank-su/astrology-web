module.exports = {
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        config.module.rules.push(
            {
                test: /\.txt$/,
                // This is the asset module.
                type: 'asset/source',
            }
        )
        config.module.rules.push({
            test: /\.worker\.ts$/,
            loader: 'worker-loader',
            // options: { inline: true }, // also works
            options: {
                name: 'static/[hash].worker.js',
                publicPath: '/_next/',
            },
        });
        return config
    },
}