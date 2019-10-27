const get = require('lodash.get');

const { getDataSet } = require('../utils/dataSetHandler');

const getEpisodes = async (filterOptions) => {
    const dataSet = await getDataSet();
    let episodes = get(dataSet, '_embedded.episodes');
    if (filterOptions && filterOptions.season) {
        episodes = episodes.filter(({ season }) => season === filterOptions.season);
    }
    return episodes.map(({ id, name: title, season, number, image: { medium: image } }) => (
        { id, season, number, title, image }
    ));
};

module.exports = {
    getEpisodes,
};
