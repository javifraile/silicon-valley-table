import React, { Component } from 'react';
import { getEpisodes } from './utils/api';
import Table from './Table';
import Filter from './Filter';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { loading: true, error: false, selectedSeason: 0, filterTitle: '' };
        this.handleFilter = this.handleFilter.bind(this);
    }

    async componentDidMount() {
        const newState = { loading: false };
        const { error, episodes } = await getEpisodes();
        if (error) {
            newState.error = true;
        } else {
            this.episodes = episodes;
            newState.episodes = episodes;
            newState.listSeasons = [0, ...new Set(episodes.map(({ season }) => season))];
        }
        this.setState(newState);
    }

    handleFilter(event) {
        const { filterTitle, selectedSeason } = this.state;
        const { name, value } = event.target;
        let newFilterTitle;
        let newSeason;
        if (name === 'season') {
            newSeason = value;
            if (newSeason !== selectedSeason) {
                let filteredEpisodes = newSeason === 0 ? this.episodes
                    : this.episodes.filter(({ season }) => season === newSeason);
                filteredEpisodes = filterTitle === '' ? filteredEpisodes
                    : filteredEpisodes.filter(({ title }) => title.includes(filterTitle));
                this.setState({ selectedSeason: newSeason, episodes: filteredEpisodes });
            }
        } else {
            newFilterTitle = value;
            if (newFilterTitle !== filterTitle) {
                let filteredEpisodes = selectedSeason === 0 ? this.episodes
                    : this.episodes.filter(({ season }) => season === selectedSeason);
                filteredEpisodes = newFilterTitle === '' ? filteredEpisodes
                    : filteredEpisodes.filter(({ title }) => title.includes(newFilterTitle));

                this.setState({ filterTitle: newFilterTitle, episodes: filteredEpisodes });
            }
        }
    }

    render() {
        const { loading, error, episodes, selectedSeason, listSeasons, filterTitle } = this.state;
        return (
            <>
                <header>
                    <h2 style={{ textAlign: 'center' }}>Silicon Valley Episodes</h2>
                </header>
                { !loading && !error
                && (
                    <Filter
                        selectedSeason={selectedSeason}
                        handleSeason={this.handleFilter}
                        listSeasons={listSeasons}
                        handleTitle={this.handleFilter}
                        filterTitle={filterTitle}
                    />
                )}
                <Table loading={loading} error={error} episodes={episodes} />
            </>
        );
    }
}

export default App;
