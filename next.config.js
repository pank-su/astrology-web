module.exports = {
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        config.module.rules.push(
            {
                test: /\.txt$/,
                // This is the asset module.
                type: 'asset/source',
            }
        )
        return config
    },
}