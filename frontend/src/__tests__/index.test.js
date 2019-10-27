jest.mock('axios');

import React from 'react';
import renderer from 'react-test-renderer';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import App from '../App';
import Table from '../Table';
import { LOADING_MESSAGE, NO_MATCHES_MESSAGE } from '../utils/constants';
import { data } from '../__mocks__/episodeList';

const { episodes } = data;
let testRenderer;
let testInstance;

describe('Should show a list of episodes', () => {
    it('should render a table', () => {
        testRenderer  = renderer.create(<App />);
        testInstance = testRenderer.root;
        const { loading } = testInstance.findByType(Table).props;
        expect(loading).toEqual(true);
        expect(testInstance.findByType(TableBody).findByType(TableCell).props.children).toEqual(LOADING_MESSAGE);
    });

    it('should obtain a list of episodes', async () => {
        testRenderer  = renderer.create(<App />);
        testInstance = testRenderer.root;
        await testInstance.instance.componentDidMount();
        const { loading, error, episodes } = testInstance.findByType(Table).props;
        expect(loading).toEqual(false);
        expect(error).toEqual(false);
        expect(episodes.length).toEqual(38);
        const { children } = testInstance.findByType(TableBody).props;
        expect(children.length).toEqual(38);
        let episodeCounter = 0;
        for (const { image, title, season, number } of episodes) {
            expect(children[episodeCounter].props.children[0].props.children.props.src).toEqual(image);
            expect(children[episodeCounter].props.children[1].props.children).toEqual(title);
            expect(children[episodeCounter].props.children[2].props.children).toEqual(season);
            expect(children[episodeCounter].props.children[3].props.children).toEqual(number);
            episodeCounter++;
        }
    });

    it('should filter options', async () => {
        testRenderer  = renderer.create(<App />);
        testInstance = testRenderer.root;
        await testInstance.instance.componentDidMount();
        testInstance.instance.handleFilter({target: {name: 'season', value: 1}});
        expect(testInstance.findByType(Table).props.episodes.length).toEqual(8);
        testInstance.instance.handleFilter({target: {name: 'season', value: 0}});
        expect(testInstance.findByType(Table).props.episodes.length).toEqual(38);
        testInstance.instance.handleFilter({target: {name: 'season', value: 2}});
        expect(testInstance.findByType(Table).props.episodes.length).toEqual(10);
        testInstance.instance.handleFilter({target: {name: 'title', value: 'M'}});
        expect(testInstance.findByType(Table).props.episodes.length).toEqual(1);
        testInstance.instance.handleFilter({target: {name: 'season', value: 0}});
        expect(testInstance.findByType(Table).props.episodes.length).toEqual(4);
        testInstance.instance.handleFilter({target: {name: 'title', value: 'aa'}});
        expect(testInstance.findByType(Table).props.episodes.length).toEqual(0);
        expect(testInstance.findByType(TableBody).findByType(TableCell).props.children).toEqual(NO_MATCHES_MESSAGE);
        testInstance.instance.handleFilter({target: {name: 'title', value: ''}});
        expect(testInstance.findByType(Table).props.episodes.length).toEqual(38);
    });
});