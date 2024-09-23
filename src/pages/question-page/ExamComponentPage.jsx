import React, { useState, useEffect } from 'react';
import MainCard from 'components/MainCard';
import ExamPage from './examComponent';
import { useGetUserQuestionDataQuery } from 'store/api/questionApiSlice';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Grid, Typography, Accordion, AccordionSummary, AccordionDetails, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
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

const ExamComponentPage = () => {
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

    // Stopwatch logic
    const [elapsedTime, setElapsedTime] = useState(0); // Time in seconds

    useEffect(() => {
        const interval = setInterval(() => {
            setElapsedTime((prevTime) => prevTime + 1);
        }, 1000);

        return () => {
            clearInterval(interval);
            setElapsedTime(0); // Reset the stopwatch when the component unmounts
        };
    }, []);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };

    // Reference ranges data
    const referenceRanges = {
        'Full blood count': `
            Haemoglobin
            Men: 135-180 g/L
            Women: 115-160 g/L

            Mean cell volume
            82-100 fl

            Platelets
            150-400 * 10^9/L

            White blood cells
            4.0-11.0 * 10^9/L

            Neutrophils
            2.0-7.0 * 10^9/L

            Lymphocytes
            1.0-3.5 * 10^9/L

            Eosinophils
            0.1-0.4 * 10^9/L
        `,
        'Urea and electrolytes': `
            Sodium
            135-145 mmol/L

            Potassium
            3.5 - 5.0 mmol/L

            Urea
            2.0-7 mmol/L

            Creatinine
            55-120 umol/L

            Bicarbonate
            22-28 mmol/L

            Chloride
            95-105 mmol/L
        `,
        'Liver function tests': `
            Bilirubin
            3-17 umol/L

            Alanine transferase (ALT)
            3-40 iu/L

            Aspartate transaminase (AST)
            3-30 iu/L

            Alkaline phosphatase (ALP)
            30-100 umol/L

            Gamma glutamyl transferase (yGT)
            8-60 u/L

            Total protein
            60-80 g/L
        `,
        'Other haematology': `
            Erythrocyte sedimentation rate (ESR)
            Men: < (age / 2) mm/hr
            Women: < ((age + 10) / 2) mm/hr

            Prothrombin time (PT)
            10-14 secs

            Activated partial thromboplastin time (APTT)
            25-35 secs

            Ferritin
            20-230 ng/ml

            Vitamin B12
            200-900 ng/L

            Folate
            3.0 nmol/L

            Reticulocytes
            0.5-1.5%

            D-Dimer
            < 400 ng/ml
        `,
        'Other biochemistry': `
            Calcium
            2.1-2.6 mmol/L

            Phosphate
            0.8-1.4 mmol/L

            CRP
            < 10 mg/L

            Thyroid stimulating hormone (TSH)
            0.5-5.5 mu/L

            Free thyroxine (T4)
            9-18 pmol/L

            Total thyroxine (T4)
            70-140 nmol/L

            Amylase
            70-300 u/L

            Uric acid
            0.18-0.48 mmol/L

            Creatine kinase
            35-250 u/L
        `,
        'Arterial blood gases': `
            pH
            7.35 - 7.45

            pCO2
            4.5 - 6.0 kPa

            pO2
            10 - 14 kPa

            Bicarbonate
            22-28 mmol/L

            Base excess
            -2 to +2 mmol/L
        `,
        'Lipids': `
            Total cholesterol
            < 5 mmol/L

            Triglycerides
            < 2 mmol/L

            HDL cholesterol
            > 1 mmol/L

            LDL cholesterol
            < 3 mmol/L
        `,
    };

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

        content = <ExamPage data={sortedData} queryReference={queryReference} categories={data?.categories || {}} />;
    }

    return (
        <Grid item xs={12}>
            <Grid container alignItems="center" justifyContent="space-between" sx={{ position: 'relative' }}>
                <Grid item className="tw-flex tw-justify-between tw-w-full">
                    {/* Timer Display */}
                    <Box
                        sx={{
                            backgroundColor: '#007bff',
                            padding: isMobile ? '2px 8px' : '4px 12px',  // Adjust padding for mobile
                            borderRadius: '4px',
                            fontWeight: 'bold',
                            fontSize: isMobile ? '14px' : '18px',  // Adjust font size for mobile
                            color: '#ffffff',
                            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                            textAlign: 'center',
                        }}
                    >
                        Timer: {formatTime(elapsedTime)}
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
                        Exit Exam
                    </Button>
                </Grid>

                {/* Reference Ranges Section */}
                <Grid 
                    item 
                    sx={{ 
                        position: 'absolute', 
                        top: -20,  
                        right: isMobile ? '27.5%' : '40%',  // Adjust position for mobile
                        width: isMobile ? '40%' : '20%',  // Adjust width for mobile
                        zIndex: 1000, 
                        backgroundColor: 'white', 
                        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', 
                        borderRadius: '8px', 
                        padding: '0px', 
                        maxHeight: '100vh', 
                        overflowY: 'hidden',
                    }}
                >
                    <Accordion sx={{ width: '100%' }}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="h6" align="center">Reference Ranges</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            {Object.entries(referenceRanges).map(([title, details]) => (
                                <Accordion key={title}>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                        <Typography variant="subtitle1">{title}</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography variant="body2" component="pre" style={{ whiteSpace: 'pre-wrap' }}>
                                            {details}
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                            ))}
                        </AccordionDetails>
                    </Accordion>
                </Grid>
            </Grid>

            <MainCard sx={{ mt: 2 }} content={false}>
                {content}
            </MainCard>
        </Grid>
    );
};

export default ExamComponentPage;
