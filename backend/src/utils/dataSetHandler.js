const axios = require('axios');

const { DATASET_URL } = require('./constants');

const getDataSet = async () => {
    const response = await axios.get(DATASET_URL);
    return response.data;
};

module.exports = {
    getDataSet,
};
