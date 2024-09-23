import React, { useState } from 'react';
import { Grid, Button, Typography } from '@mui/material';
import { ArrowForward, ArrowBack } from '@mui/icons-material';
import MainCard from 'components/MainCard';
import QuestionTracker from './Components/QuestionTracker'; // Import the Question Tracker

// Hardcoded question data
const hardcodedQuestions = [
    {
        id: 'question1',
        question: "A 60-year-old man is admitted with palpitations to the Emergency Department. An ECG on admission shows a broad complex tachycardia at a rate of 150 bpm. His blood pressure is 124/82 mmHg and there is no evidence of heart failure. Which one of the following is it least appropriate to give?",
        choices: [
            { index: 0, text: 'Procainamide', isCorrect: false },
            { index: 1, text: 'Lidocaine', isCorrect: false },
            { index: 2, text: 'Synchronised DC shock', isCorrect: false },
            { index: 3, text: 'Adenosine', isCorrect: false },
            { index: 4, text: 'Verapamil', isCorrect: true }
        ],
        references: [
            "Verapamil is contraindicated in patients with broad complex tachycardia as it can precipitate ventricular fibrillation in cases of ventricular tachycardia. Adenosine is sometimes used to differentiate between ventricular and supraventricular tachycardia with aberrant conduction."
        ]
    },
    {
        id: 'question2',
        question: "A 51-year-old female is referred to the haematology clinic with a haemoglobin of 19.2 g/dl. She is a non-smoker. Her oxygen saturations on room air are 98% and she is noted to have a mass in the left upper quadrant. What is the most useful test to establish whether she has polycythaemia vera?",
        choices: [
            { index: 0, text: 'Bone marrow aspiration', isCorrect: false },
            { index: 1, text: 'Blood film', isCorrect: false },
            { index: 2, text: 'Red cell mass', isCorrect: false },
            { index: 3, text: 'Transferrin saturation', isCorrect: false },
            { index: 4, text: 'JAK2 mutation screen', isCorrect: true }
        ],
        references: [
            "The discovery of the JAK2 mutation has made red cell mass a second-line investigation for patients with suspected JAK2-negative polycythaemia vera."
        ]
    },
    {
        id: 'question3',
        question: "A 45-year-old woman with Graves' disease comes for review. She has recently been diagnosed with thyroid eye disease and is being considered for radiotherapy. Over the past three days her right eye has become red and painful. On examination, there is proptosis and erythema of the right eye. Visual acuity is 6/9 in both eyes. What complication is she most likely to have developed?",
        choices: [
            { index: 0, text: 'Exposure keratopathy', isCorrect: false },
            { index: 1, text: 'Optic neuropathy', isCorrect: true },
            { index: 2, text: 'Carbimazole-related neutropenia', isCorrect: false },
            { index: 3, text: 'Central retinal vein occlusion', isCorrect: false },
            { index: 4, text: 'Sjogren\'s Syndrome', isCorrect: false }
        ],
        references: [
            "Thyroid eye disease can lead to optic neuropathy, which is a serious complication. The presence of proptosis, erythema, and reduced visual acuity suggests compressive optic neuropathy. Prompt treatment is essential to prevent permanent vision loss."
        ]
    },
    {
        id: 'question4',
        question: "Each one of the following causes of hyponatraemia is associated with a urinary sodium of less than 20 mmol/L, except:",
        choices: [
            { index: 0, text: 'Diarrhoea', isCorrect: false },
            { index: 1, text: 'Psychogenic polydipsia', isCorrect: false },
            { index: 2, text: 'Burns', isCorrect: false },
            { index: 3, text: 'Secondary hyperaldosteronism', isCorrect: false },
            { index: 4, text: 'Syndrome of inappropriate ADH', isCorrect: true }
        ],
        references: [
            "The syndrome of inappropriate ADH (SIADH) is characterized by the inappropriate secretion of antidiuretic hormone (ADH), leading to water retention and dilutional hyponatraemia. In SIADH, urinary sodium is typically greater than 20 mmol/L due to the excessive reabsorption of water and the subsequent excretion of concentrated urine. Other causes listed, such as diarrhoea, psychogenic polydipsia, burns, and secondary hyperaldosteronism, are associated with a low urinary sodium concentration as the kidneys attempt to conserve sodium in the context of volume depletion or water overload."
        ]
    },
    {
        id: 'question5',
        question: "A 39-year-old female who has recently emigrated from sub-Saharan Africa is screened for tuberculosis. She reports being fit and well with no past medical history and has never had a BCG vaccination. Her chest x-ray is normal, so she has a Mantoux test which is positive. An interferon gamma test is also performed which is positive. An HIV test is requested which is negative. What treatment would you recommend?",
        choices: [
            { index: 0, text: '3 months of isoniazid (with pyridoxine) and rifampicin OR 6 months of isoniazid (with pyridoxine)', isCorrect: true },
            { index: 1, text: 'Rifampicin, isoniazid, pyrazinamide and ethambutol for 6 months', isCorrect: false },
            { index: 2, text: 'Observe', isCorrect: false },
            { index: 3, text: 'Rifampicin, isoniazid, pyrazinamide and ethambutol for 2 months then step down to rifampicin and isoniazid for 4 months', isCorrect: false },
            { index: 4, text: '3 months of pyrazinamide and isoniazid OR 6 months of pyrazinamide', isCorrect: false }
        ],
        references: [
            "This patient has latent tuberculosis. The recommended treatment is either 3 months of isoniazid (with pyridoxine) and rifampicin or 6 months of isoniazid (with pyridoxine)."
        ]
    },
    {
        id: 'question6',
        question: "A 54-year-old man is investigated for dyspepsia. An endoscopy shows a gastric ulcer and a CLO test done during the procedure demonstrates H. pylori infection. A course of H. pylori eradication therapy is given. Six weeks later the patient comes for review. What is the most appropriate test to confirm eradication?",
        choices: [
            { index: 0, text: 'Culture of gastric biopsy', isCorrect: false },
            { index: 1, text: 'H. pylori serology', isCorrect: false },
            { index: 2, text: 'Hydrogen breath test', isCorrect: false },
            { index: 3, text: 'Urea breath test', isCorrect: true },
            { index: 4, text: 'Stool culture', isCorrect: false }
        ],
        references: [
            "H. pylori serology remains positive following eradication. A stool antigen test, not culture, may be an appropriate alternative. The urea breath test is commonly used to confirm eradication."
        ]
    },
    {
        id: 'question7',
        question: "A 76-year-old female presents with a 1 month history of left sided temporal headaches and jaw claudication. Biopsy of left temporal artery is negative. Hb 130 g/l, Platelets 359 * 10^9/l, WBC 10.8 * 10^9/l, CRP 89 mg/l. What is the next best step in management?",
        choices: [
            { index: 0, text: 'Observation', isCorrect: false },
            { index: 1, text: 'Commence prednisolone', isCorrect: true },
            { index: 2, text: 'Biopsy the right temporal artery', isCorrect: false },
            { index: 3, text: 'CT brain', isCorrect: false },
            { index: 4, text: 'Ultrasound of left temporal artery', isCorrect: false }
        ],
        references: [
            "Jaw claudication is a specific sign for temporal arteritis. A negative temporal artery biopsy can occur in up to 50 percent of patients. Due to the risk of vision loss, a brief course of steroids should be initiated."
        ]
    }
];


const ExamComponentTrial = () => {
    const [questionIndex, setQuestionIndex] = useState(0);
    const [submitted, setSubmitted] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [answeredQuestions, setAnsweredQuestions] = useState([]);
  
    const currentQuestion = hardcodedQuestions[questionIndex];
    const suffix = ['A', 'B', 'C', 'D', 'E'];
  
    const handleAnswer = (choice) => {
      if (!submitted) {
        setSelectedAnswer(choice);
        setSubmitted(true);
  
        // Update the answeredQuestions state
        setAnsweredQuestions((prev) => [
          ...prev,
          { isCorrect: choice.isCorrect }
        ]);
      }
    };
  
    const handleNext = () => {
      setSubmitted(false);
      setSelectedAnswer(null);
  
      if (questionIndex < hardcodedQuestions.length - 1) {
        setQuestionIndex(questionIndex + 1);
      }
    };
  
    return (
      <Grid container spacing={3}>
        <Grid item xs={12}>
          {/* Question Tracker */}
          <QuestionTracker
            totalQuestions={hardcodedQuestions.length}
            currentQuestionIndex={questionIndex}
            answeredQuestions={answeredQuestions}
          />
  
          {/* Question Navigation */}
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
                height: '40px'
              }}
              disabled={questionIndex === 0} // Disable when on the first question
            >
              <ArrowBack />
            </Button>
            <div>
              <p>Question {questionIndex + 1} / {hardcodedQuestions.length}</p>
            </div>
            <Button
              type="button"
              variant="contained"
              color="primary"
              className="tw-mx-2 tw-my-1"
              onClick={handleNext}
              sx={{ borderRadius: '40%' }}
              disabled={questionIndex === hardcodedQuestions.length - 1} // Disable when on the last question
            >
              <ArrowForward />
            </Button>
          </div>
  
          {/* Question Content */}
          <div className="tw-bg-white tw-p-6 tw-mt-3">
            <Typography
              variant="h6"
              className="tw-pb-10 tw-px-2"
              style={{ whiteSpace: 'pre-line', textAlign: 'left', fontSize: currentQuestion?.question.length > 500 ? '18px' : '20px' }}
            >
              {currentQuestion.question}
            </Typography>
  
            {/* Choices List */}
            <Grid container justifyContent="center" spacing={2}>
              <Grid item xs={12} sm={6} container spacing={2} className="tw-justify-center">
                {currentQuestion.choices.map((choice, i) => (
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
                            ? (choice.isCorrect ? '#ADFF2F80' : selectedAnswer === choice ? '#A45A5280' : 'white')
                            : 'white',
                          borderColor: submitted
                            ? (choice.isCorrect ? '#ADFF2F' : selectedAnswer === choice ? '#A45A52' : 'grey')
                            : 'grey',
                          boxShadow: submitted && choice.isCorrect ? `0px 0px 10px 2px #11e311` : 'none'
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
                  <Typography variant="body2" style={{ fontSize: '16px', color: '#555', lineHeight: '1.5', textAlign: 'center' }}>
                    {currentQuestion.references[0]}
                  </Typography>
                </>
              )}
            </Grid>
          </div>
        </Grid>
      </Grid>
    );
  };
  
  export default ExamComponentTrial;