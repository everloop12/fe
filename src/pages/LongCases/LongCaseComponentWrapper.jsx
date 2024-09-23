import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LongCaseComponent from './LongCaseComponent'; // Main component

const LongCaseComponentWrapper = () => {
    const { subject, caseId } = useParams();
    const [caseData, setCaseData] = useState(null);

    useEffect(() => {
        const loadCaseData = async () => {
            try {
                // Dynamically require all files in the Subjects folder and subfolders
                const context = require.context('./Subjects/', true, /\.js$/);

                // Find the matching module based on subject and caseId
                const caseFilePath = `./${subject}/${caseId}.js`;

                // Ensure that the file exists in the context, else throw an error
                if (context.keys().includes(caseFilePath)) {
                    const caseModule = context(caseFilePath);
                    setCaseData(caseModule.default); // Set the loaded data
                } else {
                    console.error(`No case found for ${subject} - ${caseId}`);
                }
            } catch (error) {
                console.error('Error loading case data: ', error);
            }
        };

        loadCaseData();
    }, [subject, caseId]);

    if (!caseData) {
        return <p>Loading case...</p>;
    }

    // Pass the questions directly to LongCaseComponent
    return <LongCaseComponent questions={caseData} />;
};

export default LongCaseComponentWrapper;
