import React from 'react';
import { Grid, Card, CardContent, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const SubsLandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="leading-normal tracking-normal text-black gradient" style={{ fontFamily: "'Source Sans Pro', sans-serif", paddingTop: '60px' }}>
      {/* Page Title */}
      <div className="container mx-auto text-center p-6 rounded">
        <h2 className="text-5xl font-bold leading-tight text-blue-500 mb-6" style={{ textShadow: '1px 1px 1px rgba(69,70,64,1)' }}>
        Unlock Your Full Potential
        </h2>
      </div>

      {/* Options */}
      <Grid container spacing={4} justifyContent="center" style={{ padding: '20px' }}>
        {/* Subscription Option */}
        <Grid item xs={12} sm={6} md={5}>
          <Card className="tw-rounded-lg tw-h-full tw-border tw-shadow-lg">
            <CardContent>
              <Typography
                variant="h4"
                className="tw-font-bold tw-mb-4"
                style={{ color: '#333', textAlign: 'center' }}  // Custom styles for title
              >
                Medical Student Finals
              </Typography>
              <Typography
                variant="body1"
                className="tw-mb-4"
                style={{ fontSize: '16px', color: '#555', lineHeight: '1.5', textAlign: 'center' }}  // Custom styles for description
              >
Gain unlimited access to our extensive question bank with over 10,000+ SBAs, crafted by experts to reflect the latest medical guidelines.
Dive deep into detailed analytics to track your progress and identify areas for improvement.              </Typography>
              <Typography
                variant="body1"
                className="tw-mb-8"
                style={{ fontSize: '16px', color: '#555', lineHeight: '1.5', textAlign: 'center' }}  // Custom styles for description
              >
                Choose from flexible subscription plans that fit your needs.
              </Typography>
              <img
                src="logo.svg"
                alt="Subscription"
                className="tw-w-full tw-h-64 tw-object-contain tw-mb-4"
              />
              <Button
                variant="contained"
                fullWidth
                className='bg-gradient-to-r from-blue-500 to-yellow-500 text-white font-bold rounded-full py-4 shadow-lg'
                onClick={() => navigate('/subs/subscription')}
              >
                Go to Subscription
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* MRCP Option */}
        <Grid item xs={12} sm={6} md={5}>
          <Card className="tw-rounded-lg tw-h-full tw-border tw-shadow-lg">
            <CardContent>
              <Typography
                variant="h4"
                className="tw-font-bold tw-mb-4"
                style={{ color: '#333', textAlign: 'center' }}  // Custom styles for title
              >
                MRCP
              </Typography>
              <Typography
                variant="body1"
                className="tw-mb-4"
                style={{ fontSize: '16px', color: '#555', lineHeight: '1.5', textAlign: 'center' }}  // Custom styles for description
              >
Tailor your preparation for the MRCP exams with resources specifically designed to help you succeed.
Our upcoming MRCP resources will provide the structured guidance you need to excel in your exams.
            </Typography>
              <Typography
                variant="body1"
                className="tw-mb-8"
                style={{ fontSize: '16px', color: '#555', lineHeight: '1.5', textAlign: 'center' }}  // Custom styles for description
              >
                Coming Soon! Stay tuned for updates.
              </Typography>
              <img
                src="mrcp.svg"
                alt="MRCP"
                className="tw-w-full tw-h-64 tw-object-contain tw-mb-4"
              />
              <Button
                variant="contained"
                fullWidth
                disabled
                className='bg-gradient-to-r from-blue-500 to-yellow-500 text-white font-bold rounded-full py-4 shadow-lg'
              >
                Coming Soon
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default SubsLandingPage;
