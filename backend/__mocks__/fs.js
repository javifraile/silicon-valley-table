const dataSet = require('../data/__mocks__/silicon-valley');

const access = () => new Promise((resolve) => {
    process.nextTick(() => resolve(dataSet), );
});

const readFile = () => new Promise((resolve) => {
    process.nextTick(() => resolve(Buffer.from(JSON.stringify(dataSet))), );
});

module.exports = {
    promises: {
        access,
        readFile,
    }
};
