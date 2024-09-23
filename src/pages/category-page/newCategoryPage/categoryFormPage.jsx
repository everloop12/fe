// material-ui
import { Grid } from '@mui/material';

// project import
import { useParams } from '../../../../node_modules/react-router-dom/dist/index';
import CategoryForm from './createCategoryForm';
import { useGetCategorysQuery } from 'store/api/CategoryApiSlice';


// ================================|| REGISTER ||================================ //

const CategoryFormPage = () => {
    const { id } = useParams();

    const { category } = useGetCategorysQuery("categorysList", {
        selectFromResult: ({ data }) => ({
            category: data?.entities[id]
        }),
    })
    return (
        <div className='tw-flex tw-justify-center'>

            <div className='tw-self-center tw-align-middle tw-bg-white tw-p-6'>
                {id && !category ? (
                    <h1>Loading...</h1>
                ) : (
                    <>
                        <p className='tw-text-black tw-mb-4 tw-text-lg'>Create Category </p>
                        <Grid item xs={10}>
                            <CategoryForm id={id} selectedCategory={category} />
                        </Grid>
                    </>
                )}
            </div>
        </div>
    )
};

export default CategoryFormPage;
