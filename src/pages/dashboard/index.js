import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';  // Importing AOS CSS
import { Grid, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ExamComponentTrial from 'pages/question-page/ExamComponentTrial'; // Adjust the path based on your file structure
import './Dashboard.css';  // Assuming this file is created for custom styles
import { Assignment, Tune, Support, Insights, FactCheck, TrackChanges, Gamepad, Public, Leaderboard } from '@mui/icons-material';

const features = [
  {
    title: 'Simplified Revision',
    description: 'We offer medical practice exams designed to mirror real-world test conditions. Whether it’s preparing for end-of-year exams or specific modules, our platform allows students to engage in focused, efficient revision. With a vast database of questions that span various topics, you’ll have the structure you need to revise smarter, not harder.',
    icon: <Assignment fontSize="xlarge" style={{ color: '#15aaed' }} />, // Represents test creation
  },
  {
    title: 'Customized Exams',
    description: 'Tailor your study sessions to meet your individual learning needs. Our platform enables you to build customized exams that target specific subjects or areas where you need the most practice. This feature ensures that your revision is both comprehensive and personalized, helping you cover every aspect of your curriculum at your own pace.',
    icon: <Tune fontSize="xlarge" style={{ color: '#d89935' }} />, // Symbolizes customization and control
  },
  {
    title: 'Customer Service',
    description: 'We understand that timely support can make all the difference in your study experience. Our dedicated customer service team is available to assist you with any technical issues or questions, ensuring that you get the help you need when you need it.',
    icon: <Support fontSize="xlarge" style={{ color: '#15aaed' }} />, // Customer support or service
  },
  {
    title: 'Innovative Explanations',
    description: 'Beyond simply providing the correct answers, we deliver detailed, insightful explanations for each question. This feature allows students to not only understand what the correct answer is but also why it is correct, helping to solidify your knowledge base and improve retention.',
    icon: <Insights fontSize="xlarge" style={{ color: '#d89935' }} />, // Represents insights and explanations
  },
  {
    title: 'Lab Values Reference',
    description: 'Never be without essential information. We provide a detailed and easily accessible list of normal laboratory values, allowing students to refer to critical reference points whenever they’re tackling clinical-based questions. This feature enhances your understanding of key lab indicators, which is crucial in your exams and future medical practice.',
    icon: <FactCheck fontSize="xlarge" style={{ color: '#15aaed' }} />, // Symbolizes lab references and checks
  },
  {
    title: 'Performance Tracking',
    description: 'Our platform offers sophisticated tools to track your performance and monitor your progress. With detailed analytics, you can identify your strengths and weaknesses over time, allowing for targeted revision that is data-driven and effective.',
    icon: <TrackChanges fontSize="xlarge" style={{ color: '#d89935' }} />, // Performance tracking and progress
  },
  {
    title: 'Gamify Your Learning',
    description: 'We bring the concept of learning through engagement to life. With built-in gamification features, you’ll earn points, rewards, and badges as you complete quizzes, making the revision process more interactive and motivating.',
    icon: <Gamepad fontSize="xlarge" style={{ color: '#15aaed' }} />, // Gamification aspect
  },
  {
    title: 'Country & University Statistics',
    description: 'Get insights into how students from various countries and universities are performing on similar exams. This feature gives you a broad perspective on the competitive landscape and lets you compare your progress with others on a global scale.',
    icon: <Public fontSize="xlarge" style={{ color: '#d89935' }} />, // Represents global or country statistics
  },
  {
    title: 'See Where you Rank',
    description: 'Our platform provides ranking systems based on your performance, allowing you to see where you stand relative to your peers. Identify your strengths, highlight areas for improvement, and set personal benchmarks to ensure continuous progression.',
    icon: <Leaderboard fontSize="xlarge" style={{ color: '#15aaed' }} />, // Ranking and leaderboard
  },
];


const DashboardDefault = () => {
  const navigate = useNavigate();

  // Initialize AOS on component mount
  useEffect(() => {
    AOS.init({
      duration: 1200,  // Set animation duration
      easing: 'ease-in-out',  // Easing function
      once: true,  // Whether animation should happen only once
    });
  }, []);

  return (
    <div className="leading-normal tracking-normal text-black gradient" style={{ fontFamily: "'Source Sans Pro', sans-serif" }}>
      {/* Hero Section */}
      <div className="pt-24" data-aos="fade-up">  {/* Apply AOS animation */}
        <div className="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center">
          {/* Left Column */}
          <div className="flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left p-6">
            <p className="uppercase tracking-loose w-full text-orange-500"></p>
            <h1 className="my-4 text-5xl font-bold leading-tight text-blue-500" style={{ textShadow: '1px 1px 1px rgba(69,70,64,1)' }}>
              Supporting You From Medical School To Residency
            </h1>
            <p className="leading-normal font-bold text-2xl mb-8 text-black">
              With Over 10,000 SBAs, Our Question Banks & Analytics Aid Undergraduate Medical Students Internationally.
              Study Smarter Not Harder With MedMythica
            </p>
            <Button 
              onClick={() => { navigate('/main') }} 
              variant='contained' 
              className='mx-auto lg:mx-0 hover:underline bg-orange text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg'
            >
              Discover
            </Button>
          </div>
          {/* Right Column */}
          <div className="w-full md:w-3/5 py-1 text-center" style={{ height: '500px' }}>
            <img className="w-full h-full object-contain" src="hero.svg" alt="Hero" data-aos="fade-left" />  {/* Apply AOS animation */}
          </div>
        </div>
      </div>

      {/* Title and Content Sections */}
      <section className="bg-black bg-opacity-0 border-b py-8" data-aos="fade-right">  {/* Apply AOS animation */}
        <div className="container max-w-5xl mx-auto m-8 p-6 rounded">
          <h2 className="w-full my-2 text-5xl font-bold leading-tight text-center text-blue-500" style={{ textShadow: '1px 1px 1px rgba(69,70,64,1)' }}>
            Make The Most Out Of Your Study Sessions.
          </h2>
          <div className="w-full mb-4">
            <div className="h-1 mx-auto gradient w-64 opacity-0 my-0 py-0 rounded-t"></div>
          </div>
          <div className="flex flex-wrap">
            <div className="w-full lg:w-1/2 p-6">
              <h3 className="text-3xl text-orange-500 font-bold leading-none mb-3">
                The Medmythica Platform
              </h3>
              <p className="text-lg gray-600 mb-8">
              At Medmythica, we are committed to transforming undergraduate medical education by providing comprehensive, accessible resources that support students through every stage of their studies. Our extensive question banks cover all areas of undergraduate medicine, ensuring that you have the tools you need to succeed. We understand that motivation is key to effective learning, so we’ve integrated features designed to keep you engaged and focused. With detailed performance tracking, you can monitor your progress, identify areas for improvement, and tailor your study plan to your needs. Our goal is to make your educational journey both effective and enjoyable, helping you reach your full potential with confidence.
              </p>
            </div>
            <div className="w-full lg:w-1/2 p-6 flex justify-center items-center">
              <img className="w-full h-full object-contain" src="/mrcp.svg" alt="Medmythica Logo" data-aos="zoom-in" />  {/* Apply AOS animation */}
            </div>
          </div>
        </div>
      </section>

      {/* Exam Component Section */}
      <section className="bg-gray-100 py-8" data-aos="fade-up">  {/* Apply AOS animation */}
        <div className="container max-w-5xl mx-auto m-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold leading-tight text-center text-blue-500 mb-6" style={{ textShadow: '1px 1px 1px rgba(69,70,64,1)' }}>
            Try Our Interactive Questions
          </h2>
          <div className="flex justify-center">
            <div className="w-full">
              <ExamComponentTrial />
            </div>
          </div>
        </div>
      </section>

{/* Pricing Section */}
<section className="bg-gray-100 py-8" data-aos="fade-up" data-aos-duration="1200">
  <div className="container mx-auto text-center p-6 rounded">
    <h2 className="text-5xl font-bold leading-tight text-blue-500 mb-6" style={{ textShadow: '1px 1px 1px rgba(69,70,64,1)' }}>
      Pricing
    </h2>
    <p className="text-xl text-gray-600 mb-8">
      The Most Affordable Pricing Plan For You
    </p>
    <Grid container spacing={2} justifyContent="center">
      {/* 1 Month Plan */}
      <Grid item>
        <div style={{
          width: '100%',
          maxWidth: '300px',
          padding: '24px',
          backgroundColor: '#ffffff',
          border: '1px solid #d1d5db',
          borderRadius: '16px',
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
          margin: '16px',
          textAlign: 'center'
        }}>
          <h3 style={{ fontSize: '28px', fontWeight: 'bold', color: '#15aaed' }}>1 Month</h3>
          <p style={{ marginTop: '16px', color: '#4b5563' }}>$5/Month</p>
          <p style={{ marginTop: '8px', color: '#6b7280' }}>10,000+ Preclinical & Clinical SBAs.</p>
          <p style={{ color: '#6b7280' }}>Comprehensive Revision & Analytics System.</p>
          <p style={{ color: '#6b7280' }}>Gamification Features To Aid Studying.</p>
          <div style={{
            width: '100%',
            height: '150px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#00000000',
            borderRadius: '8px',
            marginBottom: '16px'
          }}>
            <img src="/cardioasset.svg" alt="Cardio Asset" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
          </div>
          <Button
            variant="contained"
            onClick={() => navigate('/subscription')}
            style={{
              marginTop: '16px',
              background: 'linear-gradient(to right, #0886bf, #f59e0b)',
              color: '#ffffff',
              fontWeight: 'bold',
              borderRadius: '9999px',
              padding: '12px 32px',
              boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)'
            }}
          >
            Sign Up
          </Button>
        </div>
      </Grid>

      {/* 3 Months Plan */}
      <Grid item>
        <div style={{
          width: '100%',
          maxWidth: '300px',
          padding: '24px',
          backgroundColor: '#ffffff',
          border: '1px solid #d1d5db',
          borderRadius: '16px',
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
          margin: '16px',
          textAlign: 'center'
        }}>
          <h3 style={{ fontSize: '28px', fontWeight: 'bold', color: '#15aaed' }}>3 Months</h3>
          <p style={{ marginTop: '16px', color: '#4b5563' }}>$9 (Save 40%)</p>
          <p style={{ marginTop: '8px', color: '#6b7280' }}>10,000+ Preclinical & Clinical SBAs.</p>
          <p style={{ color: '#6b7280' }}>Comprehensive Revision & Analytics System.</p>
          <p style={{ color: '#6b7280' }}>Gamification Features To Aid Studying.</p>
          <div style={{
            width: '100%',
            height: '150px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#00000000',
            borderRadius: '8px',
            marginBottom: '16px'
          }}>
            <img src="/nephroasset.svg" alt="Nephro Asset" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
          </div>
          <Button
            variant="contained"
            onClick={() => navigate('/subscription')}
            style={{
              marginTop: '16px',
              background: 'linear-gradient(to right, #0886bf, #f59e0b)',
              color: '#ffffff',
              fontWeight: 'bold',
              borderRadius: '9999px',
              padding: '12px 32px',
              boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)'
            }}
          >
            Sign Up
          </Button>
        </div>
      </Grid>

      {/* 6 Months Plan */}
      <Grid item>
        <div style={{
          width: '100%',
          maxWidth: '300px',
          padding: '24px',
          backgroundColor: '#ffffff',
          border: '1px solid #d1d5db',
          borderRadius: '16px',
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
          margin: '16px',
          textAlign: 'center'
        }}>
          <h3 style={{ fontSize: '28px', fontWeight: 'bold', color: '#15aaed' }}>6 Months</h3>
          <p style={{ marginTop: '16px', color: '#4b5563' }}>$15 (Save 50%)</p>
          <p style={{ marginTop: '8px', color: '#6b7280' }}>10,000+ Preclinical & Clinical SBAs.</p>
          <p style={{ color: '#6b7280' }}>Comprehensive Revision & Analytics System.</p>
          <p style={{ color: '#6b7280' }}>Gamification Features To Aid Studying.</p>
          <div style={{
            width: '100%',
            height: '150px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#00000000',
            borderRadius: '8px',
            marginBottom: '16px'
          }}>
            <img src="/respiratoryasset.svg" alt="Respiratory Asset" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
          </div>
          <Button
            variant="contained"
            onClick={() => navigate('/subscription')}
            style={{
              marginTop: '16px',
              background: 'linear-gradient(to right, #0886bf, #f59e0b)',
              color: '#ffffff',
              fontWeight: 'bold',
              borderRadius: '9999px',
              padding: '12px 32px',
              boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)'
            }}
          >
            Sign Up
          </Button>
        </div>
      </Grid>

      {/* 12 Months Plan */}
      <Grid item>
        <div style={{
          width: '100%',
          maxWidth: '300px',
          padding: '24px',
          backgroundColor: '#ffffff',
          border: '1px solid #d1d5db',
          borderRadius: '16px',
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
          margin: '16px',
          textAlign: 'center'
        }}>
          <h3 style={{ fontSize: '28px', fontWeight: 'bold', color: '#15aaed' }}>12 Months</h3>
          <p style={{ marginTop: '16px', color: '#4b5563' }}>$24 (Save 60%)</p>
          <p style={{ marginTop: '8px', color: '#6b7280' }}>10,000+ Preclinical & Clinical SBAs.</p>
          <p style={{ color: '#6b7280' }}>Comprehensive Revision & Analytics System.</p>
          <p style={{ color: '#6b7280' }}>Gamification Features To Aid Studying.</p>
          <div style={{
            width: '100%',
            height: '150px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#00000000',
            borderRadius: '8px',
            marginBottom: '16px'
          }}>
            <img src="/neuroasset.svg" alt="Neuro Asset" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
          </div>
          <Button
            variant="contained"
            onClick={() => navigate('/subscription')}
            style={{
              marginTop: '16px',
              background: 'linear-gradient(to right, #0886bf, #f59e0b)',
              color: '#ffffff',
              fontWeight: 'bold',
              borderRadius: '9999px',
              padding: '12px 32px',
              boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)'
            }}
          >
            Sign Up
          </Button>
        </div>
      </Grid>
    </Grid>
  </div>
</section>

<section className="bg-gray-100 py-8" data-aos="fade-right">  
    <div className="container mx-auto text-center p-6 rounded">
      <h2 className="text-5xl font-bold leading-tight text-blue-500 mb-8" style={{ textShadow: '1px 1px 1px rgba(69,70,64,1)' }}>
        Key Features
      </h2>
      <div className="grid grid-cols-12 gap-6 px-6 py-12">
        {features.map((feature, index) => (
          <div
            key={index}
            className="col-span-12 sm:col-span-6 lg:col-span-4 bg-white rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105"
            style={{ 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'center', 
              alignItems: 'center',
              minHeight: '400px'
            }}
            data-aos="fade-up"
          >
            <div style={{ fontSize: '64px', marginBottom: '16px' }}>
              {feature.icon} {/* Display MUI Icon */}
            </div>
            <Typography
              variant="h6"
              className="font-bold text-lg mb-2"
              style={{ color: '#333', textAlign: 'center' }}
            >
              {feature.title}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              className="text-sm text-gray-600"
              style={{ lineHeight: '1.6', textAlign: 'center' }}
            >
              {feature.description}
            </Typography>
          </div>
        ))}
      </div>
    </div>
  </section>

    
{/* Testimonials Section */}
<section className="py-12 md:py-20 border-t border-gray-200 bg-white" data-aos="fade-up">
  <div className="max-w-6xl mx-auto px-4 sm:px-6">
    {/* Section Header */}
    <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
      <h2 className="text-3xl font-bold mb-4 text-blue-500" style={{ textShadow: '1px 1px 1px rgba(69,70,64,1)' }}>
        Dont Take Our Word For It
      </h2>
      <p className="text-lg text-gray-600">
        Our platform has been trusted by thousands of students globally.
      </p>
    </div>

    {/* Testimonials Grid */}
    <div className="max-w-sm mx-auto grid gap-8 lg:grid-cols-3 lg:gap-6 items-start lg:max-w-none">
      {/* 1st Testimonial */}
      <div className="flex flex-col h-full p-6 bg-blue-100 rounded-lg shadow-lg" data-aos="fade-up">
        <div className="relative inline-flex flex-col mb-4">
        </div>
        <blockquote className="text-lg text-gray-700 grow text-center mb-4">
          — MedMythicas extensive question bank has been a game-changer for me. The platforms affordability and accessibility mean I can revise anywhere, whether on campus or at home. What really sets it apart is the analytics; I can track my progress in real-time and see exactly where I need to improve. The gamified features make learning fun, keeping me motivated throughout my revision.
        </blockquote>
        <div className="text-gray-500 font-medium text-center">
          <cite className="text-gray-900">Ahmed El-Sayed</cite> - Medical Student
        </div>
      </div>

      {/* 2nd Testimonial */}
      <div className="flex flex-col h-full p-6 bg-blue-100 rounded-lg shadow-lg" data-aos="fade-up" data-aos-delay="200">
        <div className="relative inline-flex flex-col mb-4">
        </div>
        <blockquote className="text-lg text-gray-700 grow text-center mb-4">
          — What I love most about the platform is how easy it makes revision. The huge content library ensures I have everything I need in one place. The detailed analytics break down my strengths and weaknesses, giving me a clear focus for each study session. Plus, the gamified elements keep it engaging, which is a huge plus for someone who finds traditional studying methods a bit dry.
        </blockquote>
        <div className="text-gray-500 font-medium text-center">
          <cite className="text-gray-900">Emily Carter</cite> - Medical Student
        </div>
      </div>

      {/* 3rd Testimonial */}
      <div className="flex flex-col h-full p-6 bg-blue-100 rounded-lg shadow-lg" data-aos="fade-up" data-aos-delay="400">
        <div className="relative inline-flex flex-col mb-4">
        </div>
        <blockquote className="text-lg text-gray-700 grow text-center mb-4">
          — The QBank is definitely an affordable, accessible resource that fits perfectly into my busy schedule. The content is vast, covering everything I need for medical school exams. I especially appreciate the detailed feedback on each question and the performance tracker, which helps me stay on top of my progress. The gamified features add a layer of fun to my study routine, making revision far more engaging.
        </blockquote>
        <div className="text-gray-500 font-medium text-center">
          <cite className="text-gray-900">Priya Sharma</cite> - Medical Student
        </div>
      </div>
    </div>
  </div>
</section>


{/* Footer Section */}
<footer className="bg-gray-700 py-12 md:py-16">  
  <div className="max-w-6xl mx-auto px-4 sm:px-6">
    <div className="grid md:grid-cols-12 gap-8 lg:gap-20 mb-8 md:mb-12">
      <div className="md:col-span-4 lg:col-span-5">
        <div className="mb-4">
          <a href="/" className="inline-block" aria-label="MedMythica">
            <img className="w-24 h-24" src="/logo.svg" alt="MedMythica Logo" />
          </a>
        </div>
        <div className="text-gray-300 text-sm leading-loose">
          MedMythica provides top-tier resources to help medical students excel in their exams. Our extensive question banks cover all areas of undergraduate medicine, ensuring that you have the tools you need to succeed.
        </div>
      </div>
      <div className="md:col-span-8 lg:col-span-7 grid sm:grid-cols-3 gap-8">
        <div className="text-sm">
          <h6 className="text-gray-200 font-medium mb-2">Products</h6>
          <ul>
            <li className="mb-1">
              <a href="/main" className="text-gray-400 hover:text-gray-100 transition duration-150 ease-in-out">
                Question Bank
              </a>
            </li>
            <li className="mb-1">
              <a href="/analytics" className="text-gray-400 hover:text-gray-100 transition duration-150 ease-in-out">
                Analytics
              </a>
            </li>
          </ul>
        </div>
        <div className="text-sm">
          <h6 className="text-gray-200 font-medium mb-2">Company</h6>
          <ul>
            <li className="mb-1">
              <a href="/tos" className="text-gray-400 hover:text-gray-100 transition duration-150 ease-in-out">
                Terms of Service
              </a>
            </li>
            <li className="mb-1">
              <a href="/contact" className="text-gray-400 hover:text-gray-100 transition duration-150 ease-in-out">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div className="md:flex md:items-center md:justify-between">
      <ul className="flex mb-4 md:order-1 md:ml-4 md:mb-0">
        <li>
          <a href="https://web.facebook.com/MedMythica/" className="flex justify-center items-center text-gray-500 hover:text-gray-100 transition duration-150 ease-in-out">
            <img className="w-8 h-8" src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" alt="Facebook" />
          </a>
        </li>
        <li className="ml-4">
          <a href="https://www.instagram.com/medmythica/" className="flex justify-center items-center text-gray-500 hover:text-gray-100 transition duration-150 ease-in-out">
            <img className="w-8 h-8" src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" alt="Instagram" />
          </a>
        </li>
      </ul>
      <div className="text-gray-400 text-sm mr-4">&copy; 2024 MedMythica. All rights reserved.</div>
    </div>
  </div>
</footer>

</div>
  );
};

export default DashboardDefault;
