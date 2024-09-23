import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Grid, Typography, Box, Button, Card, CardContent } from '@mui/material';
import AOS from 'aos';
import 'aos/dist/aos.css';

const SubjectCasesPage = () => {
    const { subject } = useParams();
    const [cases, setCases] = useState([]);

    useEffect(() => {
        AOS.init({ duration: 1000 }); // Initialize animations
    }, []);

    useEffect(() => {
        const loadCases = async () => {
            try {
                let context;
                // Dynamically load the appropriate subject folder
                switch (subject) {
                    case 'Cardiology':
                        context = require.context('./Subjects/Cardiology', false, /\.js$/);
                        break;
                    case 'Endocrinology':
                        context = require.context('./Subjects/Endocrinology', false, /\.js$/);
                        break;
                    // Add other subjects as needed
                    default:
                        console.error('Subject not found');
                        return;
                }

                // Get case file paths and map them to just the base name (e.g., 'Cardiology1')
                const caseFiles = context.keys();
                const uniqueCases = Array.from(new Set(caseFiles.map((file) => file.split('/').pop().replace('.js', ''))));
                setCases(uniqueCases); // Ensure unique cases
            } catch (error) {
                console.error('Error loading cases: ', error);
            }
        };

        loadCases();
    }, [subject]);

    return (
        <>
            {/* Header Section */}
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: '#f0f4f8',
                    padding: '2rem 4rem',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    marginBottom: '3rem',
                    flexDirection: { xs: 'column', md: 'row' },  // Adjust layout for mobile
                    textAlign: { xs: 'center', md: 'left' },  // Center text on mobile
                }}
                data-aos="fade-up"
            >
                {/* Header Text */}
                <Box sx={{ flex: 1, paddingRight: { md: '2rem' }, mb: { xs: '2rem', md: '0' } }}>
                    <Typography
                        variant="h3"
                        component="h1"
                        sx={{ fontWeight: 'bold', color: '#003366', mb: 2, fontSize: { xs: '2rem', md: '3rem' } }}  // Font size responsive
                    >
                        {subject} Long Cases
                    </Typography>
                    <Typography variant="h6" color="textSecondary" sx={{ mb: 2, fontSize: { xs: '1rem', md: '1.25rem' } }}>
                        Explore detailed clinical cases in {subject}. These cases simulate real-life clinical scenarios that help you improve your diagnosis and management skills.
                    </Typography>
                    <Typography variant="body1" color="textSecondary" sx={{ fontSize: { xs: '0.9rem', md: '1rem' } }}>
                        Gain in-depth knowledge and refine your clinical thinking by diving into patient history, physical exams, diagnostics, and management.
                    </Typography>
                </Box>

                {/* Hero Image */}
                <Box
                    component="img"
                    src="/hero.svg"
                    alt="Hero"
                    sx={{
                        width: { xs: '80%', md: '40%' },  // Smaller on mobile
                        height: 'auto',
                        margin: { xs: 'auto', md: '0' },  // Center on mobile
                    }}
                />
            </Box>

            {/* Case Cards Section */}
            <Grid container spacing={4} justifyContent="center">
                {cases.length > 0 ? (
                    cases.map((caseId, index) => (
                        <Grid item key={caseId} xs={12} sm={6} md={4} data-aos="zoom-in" data-aos-delay={index * 100}>
                            <Card
                                sx={{
                                    maxWidth: 345,
                                    minHeight: 200,
                                    padding: '1rem',
                                    backgroundColor: '#ffffff',
                                    borderRadius: '16px',
                                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                                    transition: 'transform 0.2s ease-in-out',
                                    '&:hover': {
                                        transform: 'scale(1.05)',
                                    },
                                }}
                            >
                                <CardContent
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    {/* Case Title */}
                                    <Typography
                                        variant="h5"
                                        sx={{
                                            fontSize: '1.5rem',
                                            fontWeight: 'bold',
                                            marginBottom: '1rem',
                                            textAlign: 'center',
                                            color: '#003366',
                                        }}
                                    >
                                        {`${subject}  ${caseId}`}
                                    </Typography>

                                    {/* View Case Button */}
                                    <Link to={`/LongCases/${subject}/${caseId}`} style={{ textDecoration: 'none' }}>
                                        <Button
                                            variant="contained"
                                            sx={{
                                                background: 'linear-gradient(to right, #FF7E5F, #FEB47B)',  // Custom color gradient
                                                fontWeight: 'bold',
                                                padding: '10px 20px',
                                                borderRadius: '50px',
                                                textTransform: 'none',
                                                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                                                '&:hover': {
                                                    background: 'linear-gradient(to right, #FF6A42, #FE9B70)',
                                                },
                                            }}
                                        >
                                            View Case
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))
                ) : (
                    <Grid item xs={12}>
                        <Typography variant="h6" color="textSecondary" sx={{ textAlign: 'center' }}>
                            No cases found for this subject.
                        </Typography>
                    </Grid>
                )}
            </Grid>
        </>
    );
};

export default SubjectCasesPage;
