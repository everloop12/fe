// material-ui
import { Grid } from '@mui/material';

// project import
import QuestionForm from './createQuestionForm';
import { useParams } from '../../../../node_modules/react-router-dom/dist/index';
import { useGetSaidQuestionQuery } from 'store/api/questionApiSlice';
import { useGetCategorysQuery } from 'store/api/CategoryApiSlice';
import { useGetTagsQuery } from 'store/api/TagApiSlice';
import AdminCommentComponent from '../adminCommentsComponent';
import { useSelector } from 'react-redux';
import { selectUser } from 'store/reducers/user';
import AdminReportComponent from '../adminReportComponent';
import { useEffect, useState } from 'react';


// ================================|| REGISTER ||================================ //

const QuestionFormPage = () => {
    const { id } = useParams();
    const currentUser = useSelector(selectUser)
    const [question, setQuestion] = useState(null)

    const { data: questions, isLoading: isLoadingQ } = useGetSaidQuestionQuery(id)

    useEffect(() => {
        setQuestion(questions)
    }, [id, questions])

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

    const isLoading = isLoadingC || isLoadingQ || isLoadingT;

    return (
        <div className='tw-flex tw-justify-center tw-mb-5'>

            <div className='tw-self-center tw-align-middle tw-bg-white tw-p-6'>
                <p className='tw-text-black tw-mb-4 tw-text-lg'>Create Question </p>
                <Grid item xs={10}>
                    {id ?
                        <>
                            {isLoading ? <div>loading</div>
                                : <>
                                    <QuestionForm id={id} selectedQuestion={question} Categories={Categories} Tags={Tags} />
                                    <AdminCommentComponent currentUser={currentUser} questionId={id} />
                                    <AdminReportComponent currentUser={currentUser} questionId={id} />
                                </>
                            }
                        </>
                        :
                        <>
                            {isLoading ? <div>loading</div> :
                                isSuccessC && isSuccessT && <QuestionForm Categories={Categories} Tags={Tags} />}
                        </>

                    }
                </Grid>

            </div>
        </div>
    )
};

export default QuestionFormPage;
