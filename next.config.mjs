import MonacoWebpackPlugin from 'monaco-editor-webpack-plugin';

export default {
    webpack(config, options) {
        // Ensure unique filenames for all assets
        config.output.filename = '[name].[contenthash].js';

        // Add MonacoWebpackPlugin to the plugins array
        config.plugins.push(new MonacoWebpackPlugin({
            languages: ['javascript', 'typescript', 'html', 'css'], // Add necessary languages
            features: ['!copyPaste', '!find'], // Optional: Remove unneeded Monaco features to reduce the bundle size
        }));

        // Optional: Set unique chunk names to avoid conflicts in chunk names
        config.optimization.splitChunks = {
            ...config.optimization.splitChunks,
            cacheGroups: {
                defaultVendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                },
                // You can also customize other cacheGroups here based on your project needs
            },
        };

        return config;
    },

    // Disable font optimization
    experimental: {
        optimizeFonts: false,
    },
};
