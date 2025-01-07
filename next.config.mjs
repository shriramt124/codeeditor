import MonacoWebpackPlugin  from 'monaco-editor-webpack-plugin';

/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.plugins.push(
                new MonacoWebpackPlugin({
                    languages: ['javascript', 'cpp', 'java', 'python'], // Specify required languages
                })
            );
        }
        return config;
    },
};

export default nextConfig;