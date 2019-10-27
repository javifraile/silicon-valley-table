import axios from 'axios';

import { BASE_URL, PATH_EPISODES_URL } from './constants';

const getEpisodes = async () => {
    try {
        const { data } = await axios.get(`${BASE_URL}${PATH_EPISODES_URL}`);
        return data;
    } catch (err) {
        return { error: true };
    }
};

export {
    getEpisodes,
};
