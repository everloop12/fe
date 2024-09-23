import React, { useState, useEffect } from 'react';
import { Grid, ToggleButton, ToggleButtonGroup, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { initExam, setTopics } from 'store/reducers/exam';
import PriorityList from './PriorityList';
import { useGetAnalyticsQuery } from 'store/api/CategoryApiSlice';

// Priority calculation function
const calculatePriority = (performance, solvedQuestions) => {
    if (solvedQuestions === 0) return -1; // Lowest priority for unanswered categories
    return solvedQuestions * (1 - performance / 100); // Higher priority for more solved questions and lower performance
};

const StudyPlanner = () => {
    const [categoryType, setCategoryType] = useState('clinical'); // Toggle between clinical and preclinical
    const { data: answers = {}, isSuccess } = useGetAnalyticsQuery(null, { refetchOnMountOrArgChange: true });
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (isSuccess && answers?.entities) {
            const categoryData = Object.values(answers.entities)
                .filter(category => {
                    const isTrial = category?.name?.toLowerCase()?.includes('trial');
                    const isSelectedType = categoryType === 'clinical'
                        ? !category?.name?.toLowerCase()?.includes('preclinical')
                        : category?.name?.toLowerCase()?.includes('preclinical');
                    return !isTrial && isSelectedType;
                })
                .map(category => {
                    const totalQuestions = category?.questions?.reduce((acc, question) => acc + question.answers.length, 0) || 0;
                    const correctAnswers = category?.questions?.reduce((acc, question) => acc + question.answers.filter(answer => answer.isCorrect).length, 0) || 0;
                    const performance = (correctAnswers / totalQuestions) * 100 || 0;
                    const priority = calculatePriority(performance, totalQuestions);

                    return {
                        name: category?.name || '',
                        id: category?.id || '',
                        questions: category?.questions || [], // Ensure questions are included
                        solvedQuestions: totalQuestions,
                        performance: performance.toFixed(2),
                        priority: priority.toFixed(2),
                    };
                });

            // Sort categories by priority before setting the state
            const sortedCategories = categoryData.sort((a, b) => b.priority - a.priority);
            setCategories(sortedCategories);
        }
    }, [isSuccess, answers, categoryType]);

    const handleCategoryTypeChange = (event, newCategoryType) => {
        if (newCategoryType !== null) {
            setCategoryType(newCategoryType);
        }
    };

    // Function to start a custom session with the top 3 priority categories
    const startCustomSession = () => {
        const topCategories = categories.slice(0, 3); // Select the top 3 priority categories

        if (topCategories.length > 0) {
            const topicsToSelect = topCategories.map((category) => category.id);
            dispatch(initExam());
            dispatch(setTopics({ topics: topicsToSelect }));
            navigate('/exampage');
        } else {
            console.error('No valid categories found for the custom session.');
        }
    };

    return (
        <div>
            <Grid container spacing={2} justifyContent="center">
                {/* Toggle between clinical and preclinical */}
                <Grid item xs={12} style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <Box sx={{ display: 'inline-block', padding: '10px', backgroundColor: '#f0f4f8', borderRadius: '15px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
                        <ToggleButtonGroup
                            color="primary"
                            value={categoryType}
                            exclusive
                            onChange={handleCategoryTypeChange}
                            aria-label="Category Type"
                        >
                            <ToggleButton value="clinical" sx={{ fontSize: '16px', fontWeight: 'bold' }}>Clinical</ToggleButton>
                            <ToggleButton value="preclinical" sx={{ fontSize: '16px', fontWeight: 'bold' }}>Preclinical</ToggleButton>
                        </ToggleButtonGroup>
                    </Box>
                </Grid>

                {/* Priority List */}
                <Grid item xs={12}>
                    <PriorityList categories={categories} />
                </Grid>

                {/* Custom Session button */}
                <Grid item xs={12} style={{ textAlign: 'center' }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={startCustomSession}
                        sx={{ padding: '10px 20px', fontSize: '18px', fontWeight: 'bold' }}
                    >
                        Start Custom Session
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
};

export default StudyPlanner;
