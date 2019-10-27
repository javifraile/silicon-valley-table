import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { LOADING_MESSAGE, ERROR_MESSAGE, NO_MATCHES_MESSAGE } from './utils/constants';

const useStyles = makeStyles({
    root: {
        width: '100%',
        overflowX: 'auto',
    },
});

const renderTableLoading = () => (
    <TableRow><TableCell align="center">{LOADING_MESSAGE }</TableCell></TableRow>
);

const renderTableError = () => (
    <TableRow><TableCell align="center">{ERROR_MESSAGE }</TableCell></TableRow>
);

const renderTableEpisodes = (episodes) => {
    if (episodes.length === 0) {
        return (
            <TableRow><TableCell align="center">{NO_MATCHES_MESSAGE}</TableCell></TableRow>
        );
    }
    return episodes.map(({ id, image, title, season, number }) => (
        <TableRow key={id}>
            <TableCell component="th" scope="row">
                <img src={image} alt={image} />
            </TableCell>
            <TableCell align="left">{title}</TableCell>
            <TableCell align="right">{season}</TableCell>
            <TableCell align="right">{number}</TableCell>
        </TableRow>
    ));
};


export default (({ loading, error, episodes }) => {
    const { root } = useStyles();
    return (
        <Paper className={root}>
            <Table aria-label="sticky table">
                <TableHead>
                    <TableRow>
                        <TableCell>Thumbnail</TableCell>
                        <TableCell>Title</TableCell>
                        <TableCell align="right">Season</TableCell>
                        <TableCell align="right">Number</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        (loading && renderTableLoading())
                        || (error && renderTableError())
                        || (episodes && renderTableEpisodes(episodes))
                    }
                </TableBody>
            </Table>
        </Paper>
    );
});
