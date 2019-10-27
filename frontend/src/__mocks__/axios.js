import episodeList from './episodeList';

const get = () => new Promise((resolve) => {
    process.nextTick(() => resolve(episodeList), );
});

export default {
    get,
};
