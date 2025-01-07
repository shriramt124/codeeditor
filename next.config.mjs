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
    experimental: {
        turbo: {
            rules: {
                '*.svg': {
                    loaders: ['@svgr/webpack'],
                    as: '*.js',
                },
            },
            resolveAlias: {
                underscore: 'lodash',
                mocha: { browser: 'mocha/browser-entry.js' },
            },
            resolveExtensions: [
                '.mdx',
                '.tsx',
                '.ts',
                '.jsx',
                '.js',
                '.mjs',
                '.json',
            ],

            moduleIdStrategy: 'deterministic',

        },
    },
};
