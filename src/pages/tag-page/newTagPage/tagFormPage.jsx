// material-ui
import { Grid } from '@mui/material';

// project import
import { useParams } from '../../../../node_modules/react-router-dom/dist/index';
import TagForm from './createTagForm';
import { useGetTagsQuery } from 'store/api/TagApiSlice';


// ================================|| REGISTER ||================================ //

const TagFormPage = () => {
    const { id } = useParams();

    const { tag } = useGetTagsQuery("tagsList", {
        selectFromResult: ({ data }) => ({
            tag: data?.entities[id]
        }),
    })
    return (
        <div className='tw-flex tw-justify-center'>

            <div className='tw-self-center tw-align-middle tw-bg-white tw-p-6'>
                {id && !tag ? (
                    <h1>Loading...</h1>
                ) : (
                    <>
                        <p className='tw-text-black tw-mb-4 tw-text-lg'>Create Tag </p>
                        <Grid item xs={10}>
                            <TagForm id={id} selectedTag={tag} />
                        </Grid>
                    </>
                )}
            </div>
        </div>
    )
};

export default TagFormPage;
