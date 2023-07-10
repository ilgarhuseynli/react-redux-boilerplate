const path = require(`path`);
const sourcePath = path.resolve(__dirname, "src/");

module.exports = {
    webpack: {
        alias: {
            '@': path.resolve(__dirname, 'src/'),
            "@config": sourcePath + "/config",
            "@lib": sourcePath + "/library",
            "@actions": sourcePath + "/actions",
            "@hooks": sourcePath + "/hooks",
            "@stores": sourcePath + "/stores",
            "@components": sourcePath + "/components",
        },
    },
};
