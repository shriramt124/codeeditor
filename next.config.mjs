import MonacoWebpackPlugin from 'monaco-editor-webpack-plugin';

export default {
    webpack(config, options) {
        config.plugins.push(new MonacoWebpackPlugin());
        return config;
    },
};
