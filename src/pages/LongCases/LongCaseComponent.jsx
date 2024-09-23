import React, { useState } from 'react';
import { Grid, Button, Typography } from '@mui/material';
import { ArrowForward, ArrowBack } from '@mui/icons-material';
import MainCard from 'components/MainCard';
import QuestionTracker from '../question-page/Components/QuestionTracker';

const LongCaseComponent = ({ questions }) => {
    const [questionIndex, setQuestionIndex] = useState(0);
    const [submitted, setSubmitted] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [answeredQuestions, setAnsweredQuestions] = useState([]);

    if (!questions || questions.length === 0) {
        return <p>Loading case data...</p>; // Ensure questions are loaded before rendering
    }

    const currentQuestion = questions[questionIndex];
    const suffix = ['A', 'B', 'C', 'D', 'E'];

    if (!currentQuestion) {
        return <p>Question data not available</p>;
    }

    const handleAnswer = (choice) => {
        if (!submitted) {
            setSelectedAnswer(choice);
            setSubmitted(true);
            setAnsweredQuestions((prev) => [...prev, { isCorrect: choice.isCorrect }]);
        }
    };

    const handleNext = () => {
        setSubmitted(false);
        setSelectedAnswer(null);

        if (questionIndex < questions.length - 1) {
            setQuestionIndex(questionIndex + 1);
        }
    };

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <QuestionTracker
                    totalQuestions={questions.length}
                    currentQuestionIndex={questionIndex}
                    answeredQuestions={answeredQuestions}
                />

                <div className="tw-flex tw-justify-between">
                    <Button
                        type="button"
                        variant="contained"
                        color="primary"
                        className="tw-mx-2 tw-my-1"
                        onClick={() => setQuestionIndex(Math.max(0, questionIndex - 1))}
                        sx={{
                            borderRadius: '40%',
                            width: '40px',
                            height: '40px',
                        }}
                        disabled={questionIndex === 0} // Disable when on the first question
                    >
                        <ArrowBack />
                    </Button>
                    <div>
                        <p>
                            Question {questionIndex + 1} / {questions.length}
                        </p>
                    </div>
                    <Button
                        type="button"
                        variant="contained"
                        color="primary"
                        className="tw-mx-2 tw-my-1"
                        onClick={handleNext}
                        sx={{ borderRadius: '40%' }}
                        disabled={questionIndex === questions.length - 1} // Disable when on the last question
                    >
                        <ArrowForward />
                    </Button>
                </div>

                <div className="tw-bg-white tw-p-6 tw-mt-3">
                    <Typography
                        variant="h6"
                        className="tw-pb-10 tw-px-2"
                        style={{ whiteSpace: 'pre-line', textAlign: 'left', fontSize: currentQuestion?.question.length > 500 ? '18px' : '20px' }}
                    >
                        {currentQuestion?.question || "Question data not available"}
                    </Typography>

                    {/* Choices List */}
                    <Grid container justifyContent="center" spacing={2}>
                        <Grid item xs={12} sm={6} container spacing={2} className="tw-justify-center">
                            {currentQuestion?.choices?.map((choice, i) => (
                                <Grid key={`answerTrial${i}`} item xs={10}>
                                    <button
                                        className="tw-border-none tw-bg-transparent tw-w-full tw-h-full"
                                        onClick={() => handleAnswer(choice)}
                                        style={{ fontSize: '18px', fontWeight: '500', textTransform: 'capitalize' }}
                                        disabled={submitted} // Disable button after submission
                                    >
                                        <MainCard
                                            border={true}
                                            sx={{
                                                justifyContent: 'center',
                                                display: 'flex',
                                                height: '100%',
                                                backgroundColor: submitted
                                                    ? choice.isCorrect
                                                        ? '#ADFF2F80'
                                                        : selectedAnswer === choice
                                                        ? '#A45A5280'
                                                        : 'white'
                                                    : 'white',
                                                borderColor: submitted
                                                    ? choice.isCorrect
                                                        ? '#ADFF2F'
                                                        : selectedAnswer === choice
                                                        ? '#A45A52'
                                                        : 'grey'
                                                    : 'grey',
                                                boxShadow: submitted && choice.isCorrect ? `0px 0px 10px 2px #11e311` : 'none',
                                            }}
                                        >
                                            <Typography variant="body1">
                                                {suffix[i]} - {choice.text}
                                            </Typography>
                                        </MainCard>
                                    </button>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>

                    {/* Explanation Section */}
                    <Grid item xs={12} className="tw-p-4">
                        {submitted && (
                            <>
                                <Typography
                                    variant="h5"
                                    className="tw-text-center tw-text-[#1890ff] tw-text-2xl tw-mb-3 tw-mt-6"
                                    style={{ fontWeight: 'bold' }}
                                >
                                    Explanation
                                </Typography>
                                <Typography
                                    variant="body2"
                                    style={{
                                        fontSize: '16px',
                                        color: '#555',
                                        lineHeight: '1.5',
                                        textAlign: 'center',
                                    }}
                                >
                                    {currentQuestion?.references?.[0] || "Explanation not available"}
                                </Typography>
                            </>
                        )}
                    </Grid>
                </div>
            </Grid>
        </Grid>
    );
};

export default LongCaseComponent;
