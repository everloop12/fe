import React, { useState, useEffect } from 'react';
import MainCard from 'components/MainCard';
import ExamPage from './examComponent';
import { useGetUserQuestionDataQuery } from 'store/api/questionApiSlice';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Grid, Typography, Box, TextField } from '@mui/material';
import { selectSelectedTags, selectSelectedTopics, selectRevision, selectHistory, selectQuestions, setQuestions } from 'store/reducers/exam';
import { selectUser } from 'store/reducers/user';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';

// Fisher-Yates shuffle algorithm
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const Pomodoro = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isMobile = useMediaQuery('(max-width:600px)'); // Hook to detect mobile view
    const selectedCategories = useSelector(selectSelectedTopics);
    const selectedTags = useSelector(selectSelectedTags);
    const user = useSelector(selectUser);
    const revision = useSelector(selectRevision);
    const history = useSelector(selectHistory);
    const questions = useSelector(selectQuestions);
    const queryReference = { uid: user?.uid, categories: selectedCategories ?? [], tags: selectedTags ?? [], revision: revision ?? false, history: history ?? false };

    const { data, isLoading, isSuccess, isError, isFetching } = useGetUserQuestionDataQuery();

    // State for Pomodoro intervals
    const [studyTime, setStudyTime] = useState(25); // default study time in minutes
    const [breakTime, setBreakTime] = useState(5); // default break time in minutes
    const [isStudySession, setIsStudySession] = useState(true);
    const [timer, setTimer] = useState(studyTime * 60); // convert study time to seconds
    const [inputSubmitted, setInputSubmitted] = useState(false); // track if user submitted timer settings

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

    // Timer logic
    useEffect(() => {
        if (inputSubmitted) {
            const interval = setInterval(() => {
                if (timer > 0) {
                    setTimer(timer - 1);
                } else {
                    // Toggle between study and break session
                    setIsStudySession(!isStudySession);
                    setTimer(isStudySession ? breakTime * 60 : studyTime * 60); // switch between study and break times
                }
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [timer, isStudySession, inputSubmitted, breakTime, studyTime]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };

    // Handle timer input form submission
    const handleTimerSubmit = (e) => {
        e.preventDefault();
        setInputSubmitted(true);
        setTimer(studyTime * 60); // start the first study session
    };

    // Show timer input form before starting
    if (!inputSubmitted) {
        return (
            <Grid container spacing={3} alignItems="center" justifyContent="center">
                <Grid item xs={12} md={6}>
                    <form onSubmit={handleTimerSubmit}>
                        <TextField
                            label="Study Interval (minutes)"
                            type="number"
                            fullWidth
                            value={studyTime}
                            onChange={(e) => setStudyTime(e.target.value)}
                        />
                        <TextField
                            label="Break Interval (minutes)"
                            type="number"
                            fullWidth
                            value={breakTime}
                            onChange={(e) => setBreakTime(e.target.value)}
                            sx={{ marginTop: 2 }}
                        />
                        <Button type="submit" variant="contained" fullWidth sx={{ marginTop: 2 }}>
                            Start Pomodoro Session
                        </Button>
                    </form>
                </Grid>
            </Grid>
        );
    }

    let content;
    if (isLoading || isFetching || !questions) {
        content = <div>Loading...</div>;
    } else if (isError) {
        content = <div>Error has occurred</div>;
    } else if (isSuccess && questions && questions.entities) {
        const data1 = Object.values(questions.entities);
        let sortedData = data1;

        // Sorting logic for history mode
        if (history) {
            sortedData = data1.sort((a, b) => a.answers[0]?.createdAt - b.answers[0]?.createdAt);
        }

        // If in break mode, block the exam component with a break overlay
        if (!isStudySession) {
            content = (
                <Box sx={{ textAlign: 'center', padding: 4 }}>
                    <Typography variant="h4">Break Time! Relax for {formatTime(timer)} minutes.</Typography>
                </Box>
            );
        } else {
            content = <ExamPage data={sortedData} queryReference={queryReference} categories={data?.categories || {}} />;
        }
    }

    return (
        <Grid item xs={12}>
            <Grid container alignItems="center" justifyContent="space-between" sx={{ position: 'relative' }}>
                <Grid item className="tw-flex tw-justify-between tw-w-full">
                    {/* Timer Display */}
                    <Box
                        sx={{
                            backgroundColor: isStudySession ? '#007bff' : '#f54242', // Blue for study, red for break
                            padding: isMobile ? '2px 8px' : '4px 12px',  // Adjust padding for mobile
                            borderRadius: '4px',
                            fontWeight: 'bold',
                            fontSize: isMobile ? '14px' : '18px',  // Adjust font size for mobile
                            color: '#ffffff',
                            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                            textAlign: 'center',
                        }}
                    >
                        {isStudySession ? 'Study Timer: ' : 'Break Timer: '} {formatTime(timer)}
                    </Box>

                    {/* Exit Exam Button */}
                    <Button
                        variant="contained"
                        onClick={() => navigate('/main')}
                        sx={{
                            fontSize: isMobile ? '12px' : 'inherit',  // Adjust button size for mobile
                            padding: isMobile ? '4px 8px' : '8px 16px',  // Adjust button padding for mobile
                        }}
                    >
                        Exit Pomodoro Session
                    </Button>
                </Grid>
            </Grid>

            <MainCard sx={{ mt: 2 }} content={false}>
                {content}
            </MainCard>
        </Grid>
    );
};

export default Pomodoro;
