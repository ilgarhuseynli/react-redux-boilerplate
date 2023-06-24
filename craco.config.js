const path = require(`path`);
const sourcePath = path.resolve(__dirname, "src/");

module.exports = {
    webpack: {
        alias: {
            '@': path.resolve(__dirname, 'src/'),
            "@config": sourcePath + "/config",
            "@stores": sourcePath + "/stores",
            "@lib": sourcePath + "/library",
            "@components": sourcePath + "/components",
        },
    },
};
