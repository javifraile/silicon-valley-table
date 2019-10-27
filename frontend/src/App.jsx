import React, { Component } from 'react';
import { getEpisodes } from './utils/api';
import Table from './Table';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { loading: true, error: false };
    }

    async componentDidMount() {
        const newState = { loading: false };
        const { error, episodes } = await getEpisodes();
        if (error) {
            newState.error = true;
        } else {
            this.episodes = episodes;
            newState.episodes = episodes;
        }
        this.setState(newState);
    }

    render() {
        const { loading, error, episodes } = this.state;
        return (
            <>
                <header>
                    <h2 style={{ textAlign: 'center' }}>Silicon Valley Episodes</h2>
                </header>
                <Table loading={loading} error={error} episodes={episodes} />
            </>
        );
    }
}

export default App;
