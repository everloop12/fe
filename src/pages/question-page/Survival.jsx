import React, { useState, useEffect } from 'react';
import MainCard from 'components/MainCard';
import ExamPage from './examComponent';
import { useGetUserQuestionDataQuery } from 'store/api/questionApiSlice';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Grid, Typography, Box } from '@mui/material';
import { selectSelectedTags, selectSelectedTopics, selectRevision, selectHistory, selectQuestions, setQuestions, selectAnsweredQuestions } from 'store/reducers/exam';
import { selectUser } from 'store/reducers/user';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';
import './Survival.css';  // Import your CSS file
import heartImage from './heart.svg';  // Ensure the path is correct


// Fisher-Yates shuffle algorithm
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const Survival = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isMobile = useMediaQuery('(max-width:600px)');
    const selectedCategories = useSelector(selectSelectedTopics);
    const selectedTags = useSelector(selectSelectedTags);
    const user = useSelector(selectUser);
    const revision = useSelector(selectRevision);
    const history = useSelector(selectHistory);
    const questions = useSelector(selectQuestions);
    const answeredQuestions = useSelector(selectAnsweredQuestions); // Get the answered questions from Redux
    const queryReference = { uid: user?.uid, categories: selectedCategories ?? [], tags: selectedTags ?? [], revision: revision ?? false, history: history ?? false };

    const { data, isLoading, isSuccess, isError, isFetching } = useGetUserQuestionDataQuery();

    // State for Survival Mode (Hearts)
    const [hearts, setHearts] = useState(5);
    const [maxHearts] = useState(5);
    const [gameOver, setGameOver] = useState(false);
    const [questionsAnswered, setQuestionsAnswered] = useState(0);
    const [correctAnswers, setCorrectAnswers] = useState(0);

    useEffect(() => {
        if (!questions && isSuccess && data) {
            const questionO = { ids: [], entities: {} };
            let filteredQuestions = Object.values(data?.questions?.entities || {})
                .map((question) => ({
                    ...question,
                    answers: question.answers.filter((answer) => !answer.deleted)
                }))
                .filter((question) => queryReference.categories.length === 0 || question.categoryIds.some((categoryId) => selectedCategories.includes(categoryId)))
                .filter((question) => queryReference.tags.length === 0 || question.tagIds.some((tagId) => selectedTags.includes(tagId)))
                .filter((question) => queryReference.revision ? question.answers.length > 0 && !question.answers[0].isCorrect : question.answers.length === 0)
                .map((x) => queryReference.revision ? { ...x, answers: [] } : x);

            // Randomize the filtered questions
            filteredQuestions = shuffleArray(filteredQuestions);

            filteredQuestions.forEach((question) => {
                questionO.ids.push(question.id);
                questionO.entities[question.id] = question;
            });

            dispatch(setQuestions({ questions: questionO }));
        }
    }, [isSuccess, data, dispatch, questions, selectedCategories, selectedTags, queryReference]);

    // React to new answers being stored in Redux (answeredQuestions)
    useEffect(() => {
        if (answeredQuestions.length > 0 && !gameOver) {
            const lastAnswer = answeredQuestions[answeredQuestions.length - 1]; // Get the most recent answer

            if (lastAnswer.isCorrect) {
                // Correct answer, restore a heart
                setCorrectAnswers((prev) => prev + 1);
                setHearts((prev) => Math.min(prev + 1, maxHearts)); // Cap at maxHearts
            } else {
                // Incorrect answer, lose a heart
                setHearts((prev) => Math.max(prev - 1, 0)); // Ensure hearts don't drop below 0
                if (hearts - 1 <= 0) {
                    setGameOver(true); // Game over if no hearts left
                }
            }
            setQuestionsAnswered((prev) => prev + 1);
        }
    }, [answeredQuestions]); // Dependencies: only rerun when answeredQuestions change

    const renderHearts = () => {
        return [...Array(maxHearts)].map((_, index) => {
            const isFull = index < hearts; // Determine if the heart should be full or greyed out
            const heartClass = isFull ? 'heart-full heart-gain' : 'heart-grey heart-lose'; // Apply animation class based on full/grey
    
            return (
                <img
                    key={index}
                    src={heartImage}  // Use the heart SVG image
                    alt={`Heart ${index + 1}`}
                    className={heartClass}  // Apply class for styling
                />
            );
        });
    };
    
    

    let content;
    if (isLoading || isFetching || !questions) {
        content = <div>Loading...</div>;
    } else if (isError) {
        content = <div>Error has occurred</div>;
    } else if (isSuccess && questions && questions.entities && !gameOver) {
        const data1 = Object.values(questions.entities);
        let sortedData = data1;

        // Sorting logic for history mode
        if (history) {
            sortedData = data1.sort((a, b) => a.answers[0]?.createdAt - b.answers[0]?.createdAt);
        }

        content = <ExamPage data={sortedData} queryReference={queryReference} categories={data?.categories || {}} />;
    } else if (gameOver) {
        content = (
            <Box sx={{ textAlign: 'center', padding: 4 }}>
                <Typography variant="h4">Game Over!</Typography>
                <Typography variant="h6">You answered {questionsAnswered} questions with {correctAnswers} correct answers.</Typography>
            </Box>
        );
    }

    return (
        <Grid item xs={12}>
            <Grid container alignItems="center" justifyContent="space-between" sx={{ position: 'relative' }}>
                <Grid item className="tw-flex tw-justify-between tw-w-full">
                    {/* Hearts Display */}
                    <Box className="hearts-bar">
                        {renderHearts()}
                    </Box>

                    {/* Exit Exam Button */}
                    <Button
                        variant="contained"
                        onClick={() => navigate('/main')}
                        sx={{
                            fontSize: isMobile ? '12px' : 'inherit',
                            padding: isMobile ? '4px 8px' : '8px 16px',
                        }}
                    >
                        Exit Survival Mode
                    </Button>
                </Grid>
            </Grid>

            <MainCard sx={{ mt: 2 }} content={false}>
                {content}
            </MainCard>
        </Grid>
    );
};

export default Survival;
