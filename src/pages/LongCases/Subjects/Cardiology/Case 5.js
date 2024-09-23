const Cardiology5 = [
    {
        "id": "question1",
        "question": "A 62-year-old male presents with worsening shortness of breath over the past month. He reports difficulty with physical activities and bilateral leg swelling. He has a history of hypertension and type 2 diabetes. You are tasked with further evaluating his condition.\n\nGiven the patient's symptoms of worsening shortness of breath, difficulty with physical activities, and leg swelling, which additional question would be most relevant for evaluating this case?",
        "choices": [
            { "index": 0, "text": "Can you describe any recent episodes where you felt lightheaded or faint?", "isCorrect": false },
            { "index": 1, "text": "Do you experience shortness of breath while lying flat or when climbing stairs?", "isCorrect": true },
            { "index": 2, "text": "Have you had any recent changes in your bowel habits or abdominal discomfort?", "isCorrect": false },
            { "index": 3, "text": "Do you notice any swelling in other parts of your body besides your legs, such as your abdomen or face?", "isCorrect": false },
            { "index": 4, "text": "Have you had any recent infections or been on antibiotics?", "isCorrect": false }
        ],
        "references": [
            "This question targets symptoms specific to heart failure, such as orthopnea (shortness of breath when lying flat) and exertional dyspnea (shortness of breath with physical activity). These symptoms provide critical insight into the severity and type of heart failure."
        ]
    },
    {
        "id": "question2",
        "question": "The patient reports that the shortness of breath occurs both with exertion and while lying flat at night, causing him to wake up and sit upright to alleviate the symptoms. He also mentions that the leg swelling has gradually worsened, and he has noticed a significant decrease in his ability to perform daily activities.\n\nGiven these additional details, what is the most likely diagnosis?",
        "choices": [
            { "index": 0, "text": "Exacerbation of chronic obstructive pulmonary disease (COPD)", "isCorrect": false },
            { "index": 1, "text": "Acute myocardial infarction with pulmonary edema", "isCorrect": false },
            { "index": 2, "text": "Heart failure with reduced ejection fraction (HFrEF) due to ischemic cardiomyopathy", "isCorrect": true },
            { "index": 3, "text": "Pulmonary embolism with secondary pulmonary hypertension", "isCorrect": false },
            { "index": 4, "text": "Asthma exacerbation with associated respiratory distress", "isCorrect": false }
        ],
        "references": [
            "The combination of orthopnea, worsening leg swelling, bilateral lower extremity edema, elevated JVP, and an S3 gallop is indicative of heart failure, particularly HFrEF. The patient’s history of hypertension and diabetes points to ischemic cardiomyopathy as the likely underlying cause."
        ]
    },
    {
        "id": "question3",
        "question": "Which of the following physical findings would you most likely expect to find on auscultation of the lungs in this patient?",
        "choices": [
            { "index": 0, "text": "Bibasilar crackles", "isCorrect": true },
            { "index": 1, "text": "Decreased breath sounds at the lung bases", "isCorrect": false },
            { "index": 2, "text": "Dullness to percussion in the chest", "isCorrect": false },
            { "index": 3, "text": "Hyperresonance on percussion of the chest", "isCorrect": false },
            { "index": 4, "text": "Absence of breath sounds over the lung fields", "isCorrect": false }
        ],
        "references": [
            "Bibasilar crackles are characteristic of pulmonary congestion and fluid accumulation in the alveoli, commonly associated with heart failure. These crackles indicate fluid overload, which is consistent with the patient's symptoms of shortness of breath and leg swelling."
        ]
    },
    {
        "id": "question4",
        "question": "Which diagnostic test is most crucial in confirming the diagnosis of heart failure with reduced ejection fraction (HFrEF) and assessing its severity?",
        "choices": [
            { "index": 0, "text": "B-type natriuretic peptide (BNP) test", "isCorrect": false },
            { "index": 1, "text": "Electrocardiogram (ECG) for arrhythmias", "isCorrect": false },
            { "index": 2, "text": "Echocardiogram to evaluate cardiac function", "isCorrect": true },
            { "index": 3, "text": "Chest X-ray for pulmonary congestion", "isCorrect": false },
            { "index": 4, "text": "Cardiac MRI for detailed myocardial assessment", "isCorrect": false }
        ],
        "references": [
            "An echocardiogram is essential for diagnosing HFrEF, as it provides direct measurement of ejection fraction and assesses the structure and function of the heart."
        ]
    },
    {
        "id": "question5",
        "question": "The patient has a left ventricular ejection fraction (LVEF) of 45%. What is the most appropriate initial management strategy for this patient?",
        "choices": [
            { "index": 0, "text": "Initiate treatment with an ACE inhibitor and a beta-blocker, and consider adding an aldosterone antagonist", "isCorrect": true },
            { "index": 1, "text": "Start immediate intravenous diuretics and morphine for acute decompensation", "isCorrect": false },
            { "index": 2, "text": "Recommend lifestyle modifications and scheduled follow-up without pharmacologic intervention", "isCorrect": false },
            { "index": 3, "text": "Begin treatment with anticoagulants and a statin for potential ischemic heart disease", "isCorrect": false },
            { "index": 4, "text": "Prescribe high-dose corticosteroids to reduce inflammation and improve symptoms", "isCorrect": false }
        ],
        "references": [
            "For a patient with HFrEF and an LVEF of 45%, initiating treatment with an ACE inhibitor and a beta-blocker is crucial for improving symptoms, reducing hospitalizations, and improving survival."
        ]
    }
]





;

export default Cardiology5;
