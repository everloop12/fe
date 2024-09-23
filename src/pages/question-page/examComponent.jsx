/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import PropTypes from 'prop-types';
import { Grid, Stack, Typography, Button, Divider } from '@mui/material';
import { ArrowForward, ArrowBack } from '@mui/icons-material'; // Import arrow icons
import MainCard from 'components/MainCard';
import { useDispatch, useSelector } from 'react-redux';
import { addSAnswer, clearSAnswer, flipQuestion, selectQuestionIndex, selectAnsweredQuestions, selectPage } from 'store/reducers/exam'; // Import necessary selectors
import { useEffect, useState } from 'react';
import { selectUser } from 'store/reducers/user';
import { useAddNewAnswerMutation } from 'store/api/questionApiSlice';
import { apiSlice } from 'store/api/apiSlice';
import CommentComponent from './commentsComponent';
import ReportComponent from './reportComponent';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Cell, PieChart, Pie, ResponsiveContainer } from 'recharts';
import QuestionTracker from './Components/QuestionTracker'; // Import the tracker component
import TextHighlighter from './Components/TextHighlighter';

// ===============================|| SHADOW BOX ||=============================== //

function QuestionBox({ shadow, suffix = 'a', text = 'default', color, noSuffix }) {
    return (
        <MainCard border={true} sx={{ justifyContent: 'center', display: 'flex', height: '100%', backgroundColor: color, borderColor: color, boxShadow: color ? `0px 0px 10px 2px ${color}` : shadow }}>
            <Stack spacing={1} justifyContent="center" alignItems="center" >
                {noSuffix ?
                    <div style={{ textAlign: 'center', width: '100%' }} className='tw-text-center'> {`${text}`} </div>
                    : <div style={{ textAlign: 'left', width: '100%' }}> {`${suffix}- `}  {" "} {`${text}`} </div>}
            </Stack>
        </MainCard>
    );
}

QuestionBox.propTypes = {
    shadow: PropTypes.string.isRequired,
    suffix: PropTypes.string,
    text: PropTypes.string,
};

// ============================|| COMPONENT - EXAM ||============================ //

const ExamComponent = ({ data = [], queryReference = {}, categories = {} }) => {
    const dispatch = useDispatch();
    const questionIndex = useSelector(selectQuestionIndex);
    const answeredQuestions = useSelector(selectAnsweredQuestions); // Get answered questions from Redux
    const page = useSelector(selectPage); // Get the current page of the exam
    const revision = queryReference.revision;
    const [showComments, setShowComments] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);
    const [chart, setChart] = useState({ name: 'uv', color: '#9acfff' });
    const [addNewAnswer, { isLoading }] = useAddNewAnswerMutation();

    useEffect(() => {
        setSubmitted(false);
    }, [questionIndex]);

    const currentUser = useSelector(selectUser);

    if (data.length === 0) return <div className='tw-m-4'>No questions in this selection</div>;

    let currentQuestion = data?.[questionIndex];
    let answered = false;
    const suffix = ['A', 'B', 'C', 'D', 'E'];
    const currentChoices = currentQuestion.choices.map((x, i) => ({ ...x, Suffix: suffix[i] }));
    const correctAnswer = currentChoices.filter((x) => x.isCorrect).map(x => x.Suffix);
    const newQuestion = {
        ...currentQuestion,
        Answer: (currentQuestion.answers?.[0] || null)
    };
    currentQuestion = newQuestion;

    let stats = currentQuestion.stats;

    if (currentQuestion.Answer?.answer) {
        answered = true;
    }

    const choices = [];
    let answer = null;

    currentQuestion.choices.forEach((choice, i) => {
        if (currentQuestion.Answer && currentQuestion?.Answer?.index === choice.index) {
            answer = currentQuestion.Answer;
            choices.push({ ...choice, suffix: suffix[i], text: choice.text, color: choice.isCorrect ? '#ADFF2F80' : '#A45A5280' });
        } else if (currentQuestion.Answer && choice.isCorrect)
            choices.push({ ...choice, suffix: suffix[i], text: choice.text, color: '#ADFF2F80' });
        else
            choices.push({ ...choice, suffix: suffix[i], text: choice.text });
    });

    const handleAnswer = async (suffix, index, isCorrect) => {
        setError(false);
        if (answer === null && !isLoading && !submitted) {
            setSubmitted(true);
            const object = {
                questionId: currentQuestion.id,
                answer: suffix,
                userId: currentUser.uid,
                isCorrect: isCorrect,
                index: index,
                categories: currentQuestion.categoryIds
                    .map((x) => categories?.entities?.[x]?.name || null)
                    .filter((x) => x !== null)
            };
    
            // Dispatch the answer action
            dispatch(addSAnswer({ questionID: currentQuestion.id, answer: { ...object } }));
    
            try {
                if (revision) {
                    dispatch(
                        apiSlice.util.updateQueryData('getQuestionsInCategories', queryReference, draft => {
                            const question = draft?.entities?.[currentQuestion.id] || null;
                            if (question) question.answers = [{ ...object }];
                        })
                    );
                } else {
                    await addNewAnswer({
                        ...object,
                        queryReference: queryReference,
                        callBack: {
                            func: () => {
                                setSubmitted(false);
                                setError(true);
                                dispatch(clearSAnswer({ questionID: currentQuestion.id }));
                            }
                        }
                    }).unwrap();
                }
            } catch (err) {
                setSubmitted(false);
                setError(true);
            }
        }
    };
    

    const handleFlip = (action) => {
        dispatch(flipQuestion(action));
    };

    if (answer) {
        stats = [...stats, { answer: answer.answer, user: { university: currentUser?.university || null, country: currentUser?.country || null } }];
    }

    const uData = suffix.map((x) => {
        return {
            name: x,
            uv: parseInt(stats.filter(i => i.answer === x).length / stats.length * 100),
            university: parseInt(stats.filter(i => i.answer === x && i.user.university === currentUser.university).length / stats.filter(x => x.user.university === currentUser.university).length * 100),
            country: parseInt(stats.filter(i => i.answer === x && i.user.country === currentUser.country).length / stats.filter(x => x.user.country === currentUser.country).length * 100)
        };
    });

    const u2Data = [true, false].map((x) => {
        return {
            name: x ? 'correct' : 'incorrect',
            uv: parseInt(stats.filter(i => correctAnswer.includes(i.answer) === x).length / stats.length * 100),
            university: parseInt(stats.filter(i => correctAnswer.includes(i.answer) === x && i.user.university === currentUser.university).length / stats.filter(x => x.user.university === currentUser.university).length * 100),
            country: parseInt(stats.filter(i => correctAnswer.includes(i.answer) === x && i.user.country === currentUser.country).length / stats.filter(x => x.user.country === currentUser.country).length * 100),
        };
    });

    
    // Utility function to remove asterisks and references text
    const cleanText = (text) => {
        return text.replace(/\*/g, '').replace(/references?:[\s\S]*/i, ''); 
 // Removes asterisks and anything starting with "References:" or "Reference:" and everything after it
    };
    

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <div className='tw-flex tw-justify-between'>
                    <Button
                        type="button"
                        variant="contained"
                        color="primary"
                        className='tw-mx-2 tw-my-1'
                        onClick={() => {
                            if (data[questionIndex - 1]) {
                                setError(false);
                                handleFlip({ flip: -1, pageSize: 10 });
                                setShowComments(false);
                            }
                        }}
                        sx={{ borderRadius: '40%', // Circular shape
                            width: '40px',  // Ensure width and height are equal
                            height: '40px' }} // Circular buttons
                    >
                        <ArrowBack /> {/* Left Arrow */}
                    </Button>
                    
{/* Add the Question Tracker here */}
<QuestionTracker
   totalQuestions={data.length}
   currentQuestionIndex={questionIndex}
   answeredQuestions={answeredQuestions} // Pass the answered questions with their correctness state
/>





                    <Button
                        type="button"
                        variant="contained"
                        color="primary"
                        className='tw-mx-2 tw-my-1'
                        onClick={() => {
                            if (data[questionIndex + 1]) {
                                setError(false);
                                handleFlip({ flip: 1, pageSize: 10 });
                                setShowComments(false);
                            }
                        }}
                        sx={{ 
                            borderRadius: '40%', 
                            width: '40px', // Make width fixed
                            height: '40px', // Make height fixed
                            margin: '0 10px' // Add some margin to ensure they have space from the tracker
                          }}
                        >
                          <ArrowForward />
                        </Button>
                </div>
                <div className='tw-bg-white tw-p-6 tw-mt-3'>
                    <>
                        <div className='tw-pb-10 tw-px-2' style={{ whiteSpace: 'pre-line', textAlign: 'left', fontSize: (currentQuestion?.question.length > 500) ? '18px' : '20px' }}>
                        <TextHighlighter allowedHighlight={true}>
    {cleanText(`${currentQuestion?.question || 'question'}`)}
</TextHighlighter>

                        </div>
                        <div className='tw-flex tw-flex-col tw-gap-2'>
                            <Grid container justifyContent="center" gap={2}>
                                <Grid xs={12} sm={6} container spacing={2} className='tw-justify-center'>
                                {choices.slice(0, 5).map((choice, i) => (
    <Grid key={`answerExam${i}`} item xs={10}>
            <TextHighlighter allowedHighlight={true}>
        <button
            className='tw-border-none tw-bg-transparent tw-w-full tw-h-full'
            onClick={() => { handleAnswer(choice.suffix, choice.index, choice.isCorrect) }}
            style={{ fontSize: '18px', fontWeight: '500', textTransform: 'capitalize' }} // Add your custom text styling here
        >
            <QuestionBox
                shadow="7"
                {...choice}
                text={cleanText(choice.text)}
            />
        </button>
            </TextHighlighter>

    </Grid>
                                    ))}
                                </Grid>
                                <Grid xs={12} sm={6} spacing={2} className="tw-p-4">
    {answered && (
        <>
            <div 
                className='tw-text-center tw-text-[#1890ff] tw-text-2xl tw-mb-3 tw-mt-6'
                style={{ fontSize: '28px', fontWeight: 'bold' }} // Adjust font size and weight here
            >
                Explanation
            </div>
            <Grid container spacing={1} className='tw-flex tw-justify-center'>
                {currentQuestion.references.map((ref, i) => (
                    <div key={`button${i}`} className='tw-my-4'>
                        <Typography 
                            variant="body2" 
                            style={{ fontSize: '18px', lineHeight: '1.5' }} // Adjust font size and line height here
                        >
                            {cleanText(ref)}
                        </Typography>
                    </div>
                ))}
                {currentQuestion.references.length < 1 && 
                    <h3 className='tw-my-4' style={{ fontSize: '16px', color: '#666' }}>
                        This question does not have any Explanation
                    </h3>
                }
            </Grid>
        </>
    )}
</Grid>

                            </Grid>

                            {answered && (
                                <>
                                    <Divider sx={{ borderStyle: 'dashed', borderColor: 'black', marginTop: '0.5rem' }} />
                                    <div className='tw-text-center tw-text-[#1890ff] tw-text-2xl tw-mb-3 tw-mt-6'>Statistics</div>
                                    <div className='tw-w-full tw-flex tw-justify-center'>
                                        <Button onClick={() => { setChart({ name: 'uv', color: '#9acfff' }); }}>No filter</Button>
                                        <Button onClick={() => { setChart({ name: 'university', color: "#679ac9" }); }}>In your university</Button>
                                        <Button onClick={() => { setChart({ name: 'country', color: '#8fb5dd' }); }}>In your country</Button>
                                    </div>
                                    <Grid container spacing={1} className='tw-flex tw-justify-between'>
                                        <Grid xs={12} sm={6} spacing={2} className="tw-p-4">
                                            <ResponsiveContainer width='100%' height={350}>
                                                <BarChart data={uData} margin={{ top: 5, bottom: 5 }}>
                                                    <Bar dataKey={chart.name}>
                                                        {uData.map((entry, index) => (
                                                            <Cell key={`cell-${index}`} fill={correctAnswer.includes(entry.name) ? '#11e31191' : '#ff9696'} />
                                                        ))}
                                                    </Bar>
                                                    <XAxis dataKey="name" />
                                                    <YAxis domain={[0, 100]} />
                                                    <Tooltip />
                                                </BarChart>
                                            </ResponsiveContainer>
                                        </Grid>
                                        <Grid xs={12} sm={6} spacing={2} className="tw-p-4">
                                            <div className='tw-text-center'>Percentage of correct vs incorrect answers</div>
                                            <ResponsiveContainer width='100%' height={350}>
                                                <PieChart>
                                                    <Pie data={u2Data} dataKey={chart.name} nameKey="name" outerRadius={60} fill="#82ca9d" label={true}>
                                                        {u2Data.map((entry, index) => (
                                                            <Cell key={`cell-${index}`} fill={entry.name === 'correct' ? '#11e31191' : '#ff9696'} />
                                                        ))}
                                                    </Pie>
                                                </PieChart>
                                            </ResponsiveContainer>
                                        </Grid>
                                    </Grid>
                                    <Divider sx={{ borderStyle: 'dashed', borderColor: 'black' }} />
                                    <Grid xs={12} spacing={2} className="tw-p-4">
                                        {!showComments && (
                                            <div className='tw-flex tw-w-full tw-justify-center tw-mb-2'>
                                                <Button variant='contained' onClick={() => { setShowComments(true); }}>Show Feedback section</Button>
                                            </div>
                                        )}
                                        {showComments && (
                                            <>
                                                <div className='tw-flex tw-w-full tw-justify-center tw-mb-2'>
                                                    <Button variant='contained' onClick={() => { setShowComments(false); }}>Hide Feedback section</Button>
                                                </div>
                                                <ReportComponent questionId={currentQuestion.id} questionIndex={questionIndex} currentUser={currentUser} />
                                                <Divider sx={{ borderStyle: 'dashed', borderColor: 'black' }} />
                                                <CommentComponent questionId={currentQuestion.id} questionIndex={questionIndex} currentUser={currentUser} />
                                            </>
                                        )}
                                    </Grid>
                                </>
                            )}
                        </div>
                    </>
                </div>
            </Grid>
        </Grid>
    );
};

export default ExamComponent;
