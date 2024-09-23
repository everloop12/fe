// material-ui
import { Grid } from '@mui/material';

// project import
import { InputAdornment, TextField } from '@mui/material/index';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from '../../../../node_modules/react-router-dom/dist/index';
import { useGetTagsQuery } from 'store/api/TagApiSlice';
import TagList from './tagList';


// ================================|| REGISTER ||================================ //

const TagListPage = () => {
    const {
        data: tags,
        isLoading,
        // isSuccess,
        // isError,
        // error
    } = useGetTagsQuery();

    const navigate = useNavigate();
    const searchFilter = (myQuery, tags = []) => {
        const result = tags.filter((item) => item.name.includes(myQuery))
        return result
    }

    const [query, setQuery] = useState('');

    const processedTags = searchFilter(query, Object.values(tags?.entities || {}));
    return (
        <div className='tw-flex tw-w-full tw-justify-center'>
            <div className=' tw-self-center tw-w-full tw-align-middle tw-bg-white tw-p-6'>
                <div className='tw-flex tw-justify-between tw-my-4 tw-items-center'>
                    <p className='tw-text-black tw-m-0 tw-text-lg tw-h-fit'>Tag List</p>
                    <Button variant="contained" onClick={() => navigate('/tag')}>
                        new tag
                    </Button>
                </div>
                <Grid item >
                    <TextField
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                        id="filled-basic" label="Search..." variant="filled" onChange={(x) => setQuery(x.target.value)} className='tw-w-full'></TextField>
                    {isLoading ? <p>Loading...</p> : <TagList data={processedTags} />}
                </Grid>
            </div>
        </div>
    )
};

export default TagListPage;
