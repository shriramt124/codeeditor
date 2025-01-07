import MonacoWebpackPlugin from 'monaco-editor-webpack-plugin';

export default {
    webpack(config, options) {
        // Ensure unique filenames for all assets to avoid conflicts
        config.output.filename = '[name].[contenthash].js'; // Add contenthash to avoid conflicts

        // Set unique chunk names to avoid conflicts in chunk names
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

        // Add MonacoWebpackPlugin to handle Monaco editor assets
        // It's important to ensure the plugin only runs in the browser environment, not during SSR
        if (typeof window !== 'undefined') {
            config.plugins.push(new MonacoWebpackPlugin({
                languages: ['javascript', 'css', 'html', 'typescript'],
                features: ['!gotoSymbol']
            }));
        }

        return config;
    },

    eslint: {
        ignoreDuringBuilds: true, // Disable ESLint during the build process
    },

    // Configure React and Next.js optimizations
    reactStrictMode: true, // Ensure React is running in strict mode for better performance
    future: {
        webpack5: true, // Enable Webpack 5 for better performance and optimizations
    },

    // You may want to set up proper headers and caching strategies on Vercel, 
    // this is usually done through the `vercel.json` configuration.
};
