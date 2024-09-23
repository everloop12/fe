/* eslint-disable no-unused-vars */
// material-ui
import { Grid } from '@mui/material';

// project import
import QuestionList from './questionList';
import { useGetQuestionsQuery } from 'store/api/questionApiSlice';
import { InputAdornment, TextField } from '@mui/material/index';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from '../../../../node_modules/react-router-dom/dist/index';
import { MenuItem, Select } from '../../../../node_modules/@mui/material/index';
import { useGetCategorysQuery } from 'store/api/CategoryApiSlice';
import { useGetTagsQuery } from 'store/api/TagApiSlice';


// ================================|| REGISTER ||================================ //

const QuestionListPage = () => {

    const [query, setQuery] = useState({});
    const [pagen, setPagen] = useState(1);
    const [timer, setTimer] = useState(null);

    const {
        data: questions,
        isLoading: isLoadingQ,
        isSuccess: isSuccessQ,
        isFetching,
        // isError,
        // error
        // refetch
    } = useGetQuestionsQuery({ search: query, page: pagen });

    const {
        data: Categories,
        isLoading: isLoadingC,
        isSuccess: isSuccessC,
        // isError,
        // error
    } = useGetCategorysQuery();

    const {
        data: Tags,
        isLoading: isLoadingT,
        isSuccess: isSuccessT,
        // isError,
        // error
    } = useGetTagsQuery();

    const isSuccess = isSuccessQ;
    const isLoading = isLoadingQ;
    const navigate = useNavigate();
    // separate the search field into categories, tags, references, and question and add sort by reports and comments
    // check what the hell is wrong with the pagination of the backend
    const searchFilter = (myQuery, questions = []) => {
        if (myQuery) {
            const result = questions.filter((item) => {
                if (item.question.includes(myQuery))
                    return true
                if (item.categories.some(x => x.name.includes(myQuery)))
                    return true
                if (item.tags.some(x => x.name.includes(myQuery)))
                    return true
                if (item.references.some(x => x.includes(myQuery)))
                    return true
                return false
            })
            return result
        } else
            return questions
    }
    const fireTimerQuery = (myQuery) => {
        clearTimeout(timer);
        setTimer(setTimeout(() => {
            setQuery(() => ({ ...query, ...myQuery }));
            setPagen(1);
            // refetch();

        }, 1000));
    }


    const getCategory = (Qs) => {
        const final = Qs.map((question) => ({
            ...question,
            category: question.categories,
            tag: question.tags,
            // category: question.categoryIds.filter(x => Categories.ids.includes(x)).map((categoryId) => Categories.entities[categoryId]),
            // tag: question.tagIds.map((tagId) => Tags.entities[tagId])
        }))
        return final;
    }

    let processedQuestions = searchFilter('', Object.values(questions?.entities || {}));
    if (isSuccess)
        processedQuestions = getCategory(processedQuestions);

    const handlePrevPage = () => {
        setPagen(prevPage => prevPage - 1);
        // refetch();
    }

    const handleNextPage = () => {
        setPagen(prevPage => prevPage + 1);
        // refetch();
    }
    useEffect(() => {
    }, [questions, Categories, Tags])

    return (
        <div className='tw-flex tw-w-full tw-justify-center'>
            <div className=' tw-self-center tw-w-full tw-align-middle tw-bg-white tw-p-6'>
                <div className='tw-flex tw-justify-between tw-my-4 tw-items-center'>
                    <p className='tw-text-black tw-m-0 tw-text-lg tw-h-fit'>Question List </p>
                    <Button variant="contained" onClick={() => navigate('/question')}>
                        new question
                    </Button>
                </div>
                <Grid x={10} container >
                    <TextField
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                        id="filled-basic" label="Question..." variant="filled" onChange={(x) => { fireTimerQuery({ text: x.target.value }) }} className='tw-w-full'>
                    </TextField>
                    <div className='tw-w-[50%] tw-flex tw-gap-4 tw-pr-4'>
                        <p>Tag:</p>
                        <Select
                            id="tagIds-make"
                            type="tagIds"
                            value={query?.tags || undefined}
                            name="tagIds"
                            onChange={(x) => { fireTimerQuery({ tags: x.target.value }) }}
                            placeholder="tagIds"
                            fullWidth
                        >
                            {Object.values(Tags?.entities || {}).map((cat) => (
                                <MenuItem key={cat.id} value={cat.id}> {cat.name}</MenuItem>
                            ))}
                        </Select>
                    </div>
                    <div className='tw-w-[50%] tw-flex tw-gap-4'>
                        <p>Category:</p>
                        <Select
                            id="tagIds-make"
                            type="tagIds"
                            value={query?.categories || undefined}
                            name="tagIds"
                            onChange={(x) => { fireTimerQuery({ categories: x.target.value }) }}
                            placeholder="tagIds"
                            fullWidth
                        >
                            {Object.values(Categories?.entities || {}).map((cat) => (
                                <MenuItem key={cat.id} value={cat.id}> {cat.name}</MenuItem>
                            ))}
                        </Select>
                    </div>
                    {isLoading || isFetching ? <p>Loading...</p> : <QuestionList data={processedQuestions} />}
                </Grid>
                <div className='tw-flex tw-justify-between'>
                    <Button variant="contained" onClick={handlePrevPage}>
                        Previous Page
                    </Button>
                    <div> <p>current page: {pagen} </p> </div>
                    <Button variant="contained" onClick={handleNextPage}>
                        Next Page
                    </Button>
                </div>
            </div>
        </div>
    )
};

export default QuestionListPage;
