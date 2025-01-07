import MonacoWebpackPlugin from 'monaco-editor-webpack-plugin';

export default {
    webpack(config, options) {
        // Ensure unique filenames for all assets to avoid conflicts
        config.output.filename = '[name].[contenthash].js'; // Add contenthash to avoid conflicts

        // Optional: Set unique chunk names to avoid conflicts in chunk names
        config.optimization.splitChunks = {
            ...config.optimization.splitChunks,
            cacheGroups: {
                defaultVendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                },
            },
        };

        // Add MonacoWebpackPlugin to the plugins array
        //config.plugins.push(new MonacoWebpackPlugin());

        return config;
    },
    eslint: {
        ignoreDuringBuilds: true, // Disable ESLint during the build process
    },
};
