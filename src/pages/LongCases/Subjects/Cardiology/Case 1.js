const Cardiology1 = [
    {
        "id": "question1",
        "question": "A 70-year-old male presents to the emergency department with sudden onset severe abdominal pain radiating to the back. He describes it as a tearing sensation. The pain began about an hour ago while he was watching television. He has a history of hypertension, chronic obstructive pulmonary disease (COPD), and a 40-pack-year smoking history. On examination, his blood pressure is 90/60 mmHg, heart rate is 110 bpm, and he appears pale and diaphoretic.\n\nQuestion: On further questioning, what additional symptom would you most likely expect to find?",
        "choices": [
            { "index": 0, "text": "History of recent gastrointestinal bleeding", "isCorrect": false },
            { "index": 1, "text": "A pulsatile abdominal mass on physical examination", "isCorrect": true },
            { "index": 2, "text": "History of claudication and leg pain with walking", "isCorrect": false },
            { "index": 3, "text": "Recent history of a urinary tract infection (UTI)", "isCorrect": false },
            { "index": 4, "text": "History of recent weight loss and night sweats", "isCorrect": false }
        ],
        "references": [
            "In the context of a suspected abdominal aortic aneurysm (AAA), a pulsatile abdominal mass is a classic finding. This suggests the presence of an enlarged aorta, which is often palpable in cases of AAA. The other options, while they might be relevant in different contexts, are less directly related to the acute presentation of an AAA."
        ]
    },
    {
        "id": "question2",
        "question": "Upon further examination, a pulsatile mass is indeed palpated in the abdomen, and the patient reports that he has felt a throbbing sensation in his abdomen intermittently over the past few months. However, he did not seek medical attention until the onset of severe pain today.\n\nQuestion: What is the most appropriate initial investigation to perform?",
        "choices": [
            { "index": 0, "text": "Abdominal ultrasound", "isCorrect": false },
            { "index": 1, "text": "Computed tomography (CT) angiography", "isCorrect": true },
            { "index": 2, "text": "Plain abdominal X-ray", "isCorrect": false },
            { "index": 3, "text": "Magnetic resonance imaging (MRI) of the abdomen", "isCorrect": false },
            { "index": 4, "text": "Immediate surgical consultation without imaging", "isCorrect": false }
        ],
        "references": [
            "Given the findings of a pulsatile mass and the patient's acute presentation, a CT angiography is the best choice for detailed imaging of the abdominal aorta to assess the size of the aneurysm and confirm any evidence of rupture."
        ]
    },
    {
        "id": "question3",
        "question": "A computed tomography angiography (CTA) is performed, which confirms the presence of an infrarenal abdominal aortic aneurysm (AAA) measuring 3 cm in diameter.\n\nQuestion: What is the most appropriate management strategy for this patient?",
        "choices": [
            { "index": 0, "text": "Immediate surgical repair", "isCorrect": false },
            { "index": 1, "text": "Endovascular aneurysm repair (EVAR)", "isCorrect": false },
            { "index": 2, "text": "Serial ultrasound monitoring", "isCorrect": true },
            { "index": 3, "text": "Initiation of beta-blocker therapy", "isCorrect": false },
            { "index": 4, "text": "Referral for elective open surgical repair", "isCorrect": false }
        ],
        "references": [
            "For an abdominal aortic aneurysm (AAA) that is 3 cm in diameter, the recommended management is typically conservative, with serial ultrasound monitoring. This is because the risk of rupture is low for aneurysms smaller than 5.5 cm."
        ]
    },
    {
        "id": "question4",
        "question": "What is the most common underlying cause of this patient's condition?",
        "choices": [
            { "index": 0, "text": "Connective tissue disorder", "isCorrect": false },
            { "index": 1, "text": "Atherosclerosis", "isCorrect": true },
            { "index": 2, "text": "Chronic hypertension", "isCorrect": false },
            { "index": 3, "text": "Marfan syndrome", "isCorrect": false },
            { "index": 4, "text": "Trauma", "isCorrect": false }
        ],
        "references": [
            "Atherosclerosis is the most common underlying cause of abdominal aortic aneurysms (AAA). It leads to the weakening of the arterial wall, which, over time, can result in the formation of an aneurysm."
        ]
    }
];

export default Cardiology1;
