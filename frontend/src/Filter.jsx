import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    textField: {
        margin: theme.spacing(1),
        width: 200,
    },
}));

export default (({ selectedSeason, filterTitle, listSeasons, handleSeason, handleTitle }) => {
    const { formControl, textField } = useStyles();
    return (
        <>
            <FormControl className={formControl}>
                <InputLabel htmlFor="season">Season</InputLabel>
                <Select
                    value={selectedSeason}
                    onChange={handleSeason}
                    inputProps={{
                        name: 'season',
                        id: 'season',
                    }}
                >
                    { listSeasons.map((season) => (
                        <MenuItem key={season} value={season}>{season === 0 ? 'All seasons' : `Season ${season}`}</MenuItem>
                    )) }
                </Select>
            </FormControl>
            <TextField
                id="title"
                label="Title"
                className={textField}
                value={filterTitle}
                onChange={handleTitle}
                margin="normal"
            />
        </>
    );
});
