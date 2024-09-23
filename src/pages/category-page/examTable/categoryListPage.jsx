// material-ui
import { Grid } from '@mui/material';

// project import
import { InputAdornment, TextField } from '@mui/material/index';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from '../../../../node_modules/react-router-dom/dist/index';
import { useGetCategorysQuery } from 'store/api/CategoryApiSlice';
import CategoryList from './categoryList';


// ================================|| REGISTER ||================================ //

const CategoryListPage = () => {
    const {
        data: categories,
        isLoading,
        // isSuccess,
        // isError,
        // error
    } = useGetCategorysQuery();

    const navigate = useNavigate();
    const searchFilter = (myQuery, categories = []) => {
        const result = categories.filter((item) => item.name.includes(myQuery))
        return result
    }

    const [query, setQuery] = useState('');

    const processedCategories = searchFilter(query, Object.values(categories?.entities || {}));
    return (
        <div className='tw-flex tw-w-full tw-justify-center'>
            <div className=' tw-self-center tw-w-full tw-align-middle tw-bg-white tw-p-6'>
                <div className='tw-flex tw-justify-between tw-my-4 tw-items-center'>
                    <p className='tw-text-black tw-m-0 tw-text-lg tw-h-fit'>Category List</p>
                    <Button variant="contained" onClick={() => navigate('/category')}>
                        new category
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
                    {isLoading ? <p>Loading...</p> : <CategoryList data={processedCategories} />}
                </Grid>
            </div>
        </div>
    )
};

export default CategoryListPage;
