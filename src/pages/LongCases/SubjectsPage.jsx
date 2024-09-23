import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Card, CardContent, Typography, Box, Button } from '@mui/material';

const subjects = [
  { name: 'Cardiology', icon: '/icons/Cardiology Icon Trial.svg' },
  { name: 'Endocrinology', icon: '/icons/Endocrine Icon Trial.svg' },
  { name: 'Gastroenterology', icon: '/icons/Gastroenterology Icon Trial.svg' },
  { name: 'Haematology', icon: '/icons/Hematology Icon Trial.svg' },
  { name: 'Nephrology', icon: '/icons/Nephrology Icon Trial.svg' },
  { name: 'Neurology', icon: '/icons/Neurology Icon Trial.svg' },
  { name: 'Orthopedics', icon: '/icons/Orthopedics Icon Trial.svg' },
  { name: 'Pediatrics', icon: '/icons/Pediatrics Icon Trial.svg' },
  { name: 'Respiratory', icon: '/icons/Respiratory Icon Trial.svg' },
  { name: 'Rheumatology', icon: '/icons/Rheumatology Icon Trial.svg' },
  { name: 'Surgery', icon: '/icons/Surgery Icon Trial.svg' },
  { name: 'Women\'s Health', icon: '/icons/Women Icon Trial.svg' }
];

const SubjectsPage = () => {
  return (
    <>
      {/* Enhanced Header Section */}
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
          flexDirection: { xs: 'column', md: 'row' }, // Stack on small screens, row on medium+
          textAlign: { xs: 'center', md: 'left' }, // Center text on mobile
        }}
      >
        {/* Header Text */}
        <Box sx={{ flex: 1, paddingRight: { md: '2rem' }, mb: { xs: '2rem', md: '0' } }}>
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: 'bold',
              color: '#003366',
              mb: 2,
              fontSize: { xs: '2rem', md: '3rem' }, // Adjust font size for mobile
            }}
          >
            Explore Clinical Long Cases
          </Typography>
          <Typography variant="h6" color="textSecondary" sx={{ mb: 2, fontSize: { xs: '1rem', md: '1.25rem' } }}>
            Dive deep into patient cases across various medical specialties. These long cases simulate real-world clinical scenarios, allowing you to sharpen your diagnostic and management skills.
          </Typography>
          <Typography variant="body1" color="textSecondary" sx={{ fontSize: { xs: '0.9rem', md: '1rem' } }}>
            Our platform provides you with comprehensive cases that guide you through patient history, physical examinations, diagnosis, and treatment.
          </Typography>
        </Box>

        {/* Hero Image */}
        <Box
          component="img"
          src="/hero.svg"
          alt="Hero"
          sx={{
            width: { xs: '80%', md: '40%' }, // Smaller on mobile
            height: 'auto',
            margin: { xs: 'auto', md: '0' }, // Centered on mobile
          }}
        />
      </Box>

      {/* Subject Cards Section */}
      <Grid container spacing={4} justifyContent="center">
        {subjects.map((subject) => (
          <Grid item key={subject.name} xs={12} sm={6} md={4}>
            <Card
              sx={{
                maxWidth: 345,
                minHeight: 400,
                margin: '1rem',
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
                {/* Subject Icon - made even larger */}
                <Box
                  component="img"
                  src={subject.icon}
                  alt={`${subject.name} Icon`}
                  sx={{ width: 180, height: 180, marginBottom: '1.5rem' }}
                />
                {/* Subject Title with custom styles */}
                <Typography
                  variant="h5"
                  sx={{
                    fontSize: '1.8rem',
                    fontWeight: 'bold',
                    color: '#003366',
                    marginBottom: '1rem',
                    letterSpacing: '2px',
                    textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
                  }}
                >
                  {subject.name}
                </Typography>
                {/* View Cases Button */}
                <Link to={`/LongCases/${subject.name}`} style={{ textDecoration: 'none' }}>
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
                    View Cases
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default SubjectsPage;
