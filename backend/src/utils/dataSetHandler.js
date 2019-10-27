const axios = require('axios');
const fs = require('fs').promises;
const path = require('path');

const { DATASET_URL, DATASET_FILE } = require('./constants');

const checkDataSet = async () => {
    try {
        await fs.access(path.resolve(DATASET_FILE));
        return true;
    } catch (error) {
        return false;
    }
};

const getDataSet = async () => {
    const existsDataSet = await checkDataSet();
    let dataSet;
    if (existsDataSet) {
        const rawData = await fs.readFile(DATASET_FILE);
        dataSet = JSON.parse(rawData);
    } else {
        const response = await axios.get(DATASET_URL);
        dataSet = response.data;
        await fs.writeFile(DATASET_FILE, JSON.stringify(dataSet));
    }
    return dataSet;
};

module.exports = {
    getDataSet,
};
