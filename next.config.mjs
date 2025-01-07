import MonacoWebpackPlugin from 'monaco-editor-webpack-plugin';

export default {
    webpack(config, options) {
        // Disable the Named Chunk feature to avoid conflicts with NFT files
        config.output.filename = '[name].js';

        // Add MonacoWebpackPlugin to the plugins array
        config.plugins.push(new MonacoWebpackPlugin());

        return config;
    },
};
