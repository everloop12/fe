import {
    Grid,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useGetSubscriptionStatusQuery } from 'store/api/PaymentStatusApiSlice';
import PaymentComponent from './PaymentComponent';
import moment from 'moment';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

const PaymentPage = () => {
    const { data: subscribed, isLoading, isSuccess } = useGetSubscriptionStatusQuery();
    const date = subscribed?.data?.lastPackageExpiry || null;
    const navigate = useNavigate(); // Hook for navigation
    return (
        <div className="leading-normal tracking-normal text-black gradient" style={{ fontFamily: "'Source Sans Pro', sans-serif" }}>
            {/* Show the Hero Section only if the user is subscribed */}
            {isSuccess && subscribed && moment(date).isAfter(moment()) && (
                <div className="pt-24">
                    <div className="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center">
                        <div className="flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left p-6">
                            <h1 className="my-4 text-5xl font-bold leading-tight text-blue-500" style={{ textShadow: '1px 1px 1px rgba(69,70,64,1)' }}>
                                Enjoy Premium Benefits
                            </h1>
                            <p className="leading-normal font-bold text-2xl mb-8 text-black">
                                Unlock all features and elevate your study experience with our premium subscription plans.
                            </p>
                            <img className="w-full h-2/5 object-contain" src="/mrcp.svg" alt="MedMythica hero" />
                        </div>
                    </div>
                </div>
            )}

            {/* Payment and Subscription Status Section */}
            <Grid container alignItems="center" justifyContent="center" spacing={3}>
                <Grid item xs={12}>
                    {isLoading && (
                        <div className="tw-bg-white tw-shadow-md tw-p-10 tw-text-center">
                            <Typography variant="h6">Loading.....</Typography>
                        </div>
                    )}
                    {isSuccess && (
                        <>
                            {(!date || moment(date).isBefore(moment())) ? (
                                <PaymentComponent subscribed={subscribed} />
                            ) : (
                                <Grid container alignItems="center" justifyContent="center" className="tw-bg-white tw-p-8 tw-shadow-md tw-flex tw-flex-col">
                                    <Typography variant="h4" className="tw-mb-4 tw-font-bold">
                                        Premium Status Is Active
                                    </Typography>
                                    <Typography variant="h6" className="tw-mb-4 tw-font-bold">
                                        Subscription Ends By: {String(moment(date))}
                                    </Typography>
                                </Grid>
                            )}
                        </>
                    )}
                </Grid>

                {/* FAQ Section */}
                <Grid item xs={12}>
                    <Typography variant="h4" align="center" gutterBottom>
                        Frequently Asked Questions
                    </Typography>

                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>Is MedMythica Relevant Only To UK Students?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                MedMythica is designed primarily for undergraduate medical students and intern doctors around the world. We aim to provide comprehensive resources that cater to the needs of those starting their medical journey. Although adhering to UK guidelines for the SBAs, We have designed them to be relevant to students internationally, focusing on key concepts.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>Is the Subscription Rolling?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                No, We have opted to make our question bank affordable and a one-time payment, preventing automatic payments when you no longer need or are unsatisfied with the content. We understand that many medical students around the world struggle to afford high-quality online question banks. MedMythica was created with affordability in mind to ensure that every student has access to the resources they need to succeed.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>What makes our learning approach unique?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                MedMythica introduces a new take on gamified learning with a leveling system and leaderboard to aid motivation and implement a competitive aspect when studying by yourself or with friends. You can easily compare yourself with peers from the same university, adding a competitive yet educational edge to your studies.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>Is there a textbook available?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                A comprehensive textbook is currently in development and will be available soon. This textbook will further enhance your learning experience by complementing our question bank.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>Is there an app for MedMythica?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                Yes, an app is currently in development. This app will provide easier access to our resources, allowing you to study anytime, anywhere.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>What new features are being developed?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                We are constantly working to improve MedMythica. Upcoming features include custom exam sessions with friends and weekly tournaments with prizes. These dynamic online features aim to make studying more interactive and enjoyable.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </Grid>
            </Grid>

            {/* Image and CTA Section After FAQ */}
      <section className="bg-gradient-to-r from-blue-500 to-orange-500 py-12">
        <div className="container mx-auto text-center text-white p-6 rounded">
          <h2 className="text-5xl font-bold mb-4 text-yellow-300">Level Up Your Learning!</h2>
          <p className="text-xl mb-8 text-blue-100">Try Our Question Bank Today!</p>
          <Button
            onClick={() => navigate('/main')} // Navigate to /main on click
            variant='contained'
            className='mx-auto bg-white text-gray-800 font-bold rounded-full py-4 px-8 shadow-lg'
          >
            Start Now
          </Button>
        </div>
      </section>
    </div>
  );
};

export default PaymentPage;
