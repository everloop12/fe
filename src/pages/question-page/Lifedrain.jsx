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
import './LifeDrainMode.css'; // Import the CSS file for the health bar

// Fisher-Yates shuffle algorithm for shuffling questions
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const LifeDrain = () => {
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

    // State for Life Drain Mode
    const [timeRemaining, setTimeRemaining] = useState(120); // Start with 120 seconds
    const [maxTime] = useState(180); // Set the maximum time limit
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [gameOver, setGameOver] = useState(false);

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

    // Timer countdown logic for life drain mode
    useEffect(() => {
        if (timeRemaining > 0 && !gameOver) {
            const interval = setInterval(() => {
                setTimeRemaining((prevTime) => prevTime - 1);
            }, 1000);
            return () => clearInterval(interval);
        } else if (timeRemaining <= 0) {
            setGameOver(true); // End the session if time runs out
        }
    }, [timeRemaining, gameOver]);

    // React to new answers being stored in Redux (answeredQuestions)
    useEffect(() => {
        if (answeredQuestions.length > 0 && !gameOver) {
            const lastAnswer = answeredQuestions[answeredQuestions.length - 1]; // Get the most recent answer

            if (lastAnswer.isCorrect) {
                // Correct answer, restore time
                setCorrectAnswers((prev) => prev + 1);
                setTimeRemaining((prev) => Math.min(prev + 15, maxTime)); // Cap time at maxTime
            }
        }
    }, [answeredQuestions, gameOver, maxTime]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const getHealthBarColor = () => {
        const percentage = timeRemaining / maxTime;
        if (percentage > 0.66) {
            return 'green';
        } else if (percentage > 0.33) {
            return 'orange';
        } else {
            return 'red';
        }
    };

    const getHealthBarWidth = () => {
        return `${(timeRemaining / maxTime) * 100}%`;
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
                <Typography variant="h6">You answered {correctAnswers} questions correctly.</Typography>
            </Box>
        );
    }

    return (
        <Grid item xs={12}>
            <Grid container alignItems="center" justifyContent="space-between" sx={{ position: 'relative' }}>
                <Grid item className="tw-flex tw-justify-between tw-w-full">
                    {/* Health Bar Display */}
                    <div className="health-bar-container">
                        <div className="health-bar">
                            <div className="health-bar-fill" style={{ width: getHealthBarWidth(), backgroundColor: getHealthBarColor() }}>
                                <span className="timer-text">{formatTime(timeRemaining)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Exit Exam Button */}
                    <Button
                        variant="contained"
                        onClick={() => navigate('/main')}
                        sx={{
                            fontSize: isMobile ? '12px' : 'inherit',  // Adjust button size for mobile
                            padding: isMobile ? '4px 8px' : '8px 16px',  // Adjust button padding for mobile
                        }}
                    >
                        Exit Life Drain Mode
                    </Button>
                </Grid>
            </Grid>

            <MainCard sx={{ mt: 2 }} content={false}>
                {content}
            </MainCard>
        </Grid>
    );
};

export default LifeDrain;
