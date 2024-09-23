package com.example.medmythica;

import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.view.animation.Animation;
import android.view.animation.AnimationUtils;
import android.widget.ImageView;
import android.widget.TextView;
import androidx.appcompat.app.AppCompatActivity;
import java.util.Random;

public class LoaderActivity extends AppCompatActivity {

    private Handler handler = new Handler();
    private TextView fadingTextView;
    private String[] medicalFacts = {
            "Did you know that the gold standard investigation for Non-Alcoholic Fatty Liver Disease (NAFLD) is a liver biopsy? It confirms the diagnosis and differentiates it from other hepatic disorders.",
            "For measuring Glomerular Filtration Rate (GFR), the gold standard test is the inulin clearance test, although creatinine clearance is more commonly used in clinical practice.",
            "Cardiac troponin levels are the gold standard for diagnosing myocardial infarction, as they are highly specific for cardiac injury.",
            "The gold standard for diagnosing an acute ischemic stroke is a non-contrast head CT scan, which helps to rule out hemorrhagic stroke.",
            "The most reliable test for diagnosing deep vein thrombosis (DVT) is venous duplex ultrasonography, which visualizes the clot and assesses blood flow.",
            "For diagnosing pulmonary embolism, the gold standard is a CT pulmonary angiography, providing detailed images of the pulmonary arteries.",
            "Percutaneous coronary intervention (PCI) is the gold standard treatment for acute coronary syndrome (ACS), restoring blood flow to the affected coronary artery.",
            "Dual-energy X-ray absorptiometry (DEXA) scan is the gold standard for diagnosing osteoporosis, as it measures bone mineral density accurately.",
            "MRI of the brain and spinal cord is the gold standard investigation for diagnosing multiple sclerosis, revealing demyelinating lesions.",
            "For diagnosing peptic ulcer disease, the gold standard is upper gastrointestinal endoscopy, allowing direct visualization and biopsy of the ulcer.",
            "A fascinating fact: The classical presentation of myocardial infarction includes chest pain radiating to the left arm or jaw, shortness of breath, diaphoresis, and nausea.",
            "Classical presentation of aortic dissection is sudden, severe chest or back pain described as tearing or ripping, often with a differential blood pressure between arms.",
            "Parkinson’s disease classically presents with bradykinesia, resting tremor, muscle rigidity, and postural instability.",
            "In Graves' disease, hyperthyroidism symptoms like weight loss, palpitations, and exophthalmos (bulging eyes) are classical presentations.",
            "Multiple sclerosis typically presents with optic neuritis, transverse myelitis, and Lhermitte's sign (electric shock-like sensations with neck flexion).",
            "The classical presentation of appendicitis includes right lower quadrant abdominal pain, nausea, vomiting, and fever.",
            "Diabetes mellitus often presents with polyuria, polydipsia, and unexplained weight loss.",
            "In chronic obstructive pulmonary disease (COPD), patients commonly present with chronic cough, sputum production, and dyspnea.",
            "Rheumatoid arthritis typically presents with symmetrical joint swelling, morning stiffness, and pain in small joints of the hands and feet.",
            "In asthma, classical symptoms include episodic wheezing, shortness of breath, chest tightness, and coughing, especially at night or early morning.",
            "Interesting fact: Beta-blockers, commonly used for hypertension and heart failure, can cause side effects like fatigue, bradycardia, and depression.",
            "ACE inhibitors, prescribed for heart failure and hypertension, often have a side effect of a persistent dry cough.",
            "Metformin, a first-line treatment for type 2 diabetes, can cause gastrointestinal side effects such as diarrhea and abdominal discomfort.",
            "Statins, used to lower cholesterol, can lead to muscle pain and, rarely, rhabdomyolysis, a serious condition involving muscle breakdown.",
            "Methotrexate, used in rheumatoid arthritis, can cause side effects like liver toxicity and bone marrow suppression, necessitating regular monitoring.",
            "Levothyroxine, used to treat hypothyroidism, can cause symptoms of hyperthyroidism if the dose is too high, including palpitations and anxiety.",
            "Aspirin, commonly used for its antiplatelet effects, can cause gastrointestinal bleeding and should be used with caution in patients with peptic ulcer disease.",
            "Warfarin, an anticoagulant, has a narrow therapeutic window and requires regular INR monitoring to avoid bleeding complications.",
            "Corticosteroids, used in many inflammatory conditions, can cause side effects like hyperglycemia, osteoporosis, and increased infection risk.",
            "Antipsychotic medications, such as olanzapine and risperidone, can lead to metabolic syndrome, including weight gain and diabetes.",
            "Interesting demographic fact: Alzheimer's disease is more common in women, with nearly two-thirds of Americans with Alzheimer's being female.",
            "Prostate cancer is most commonly diagnosed in men aged 65 and older, and African-American men have a higher incidence compared to other races.",
            "Lung cancer is the leading cause of cancer death worldwide, with smoking being the primary risk factor.",
            "Type 2 diabetes prevalence is higher in certain ethnic groups, including Native Americans, African Americans, and Hispanics.",
            "Breast cancer is the most common cancer in women worldwide, with higher incidence rates in developed countries compared to developing ones.",
            "Hypertension is more prevalent in African American adults compared to Caucasian or Hispanic adults, contributing to higher rates of stroke and heart disease.",
            "Stroke is more common in older adults, with the risk doubling every decade after age 55.",
            "Multiple sclerosis is more common in women than men, with a female-to-male ratio of about 2 to 1.",
            "Asthma prevalence is higher in children than adults, and it is more common in boys during childhood and in women during adulthood.",
            "Rheumatoid arthritis is more common in women, with a female-to-male ratio of approximately 3 to 1.",
            "Did you know? Chronic obstructive pulmonary disease (COPD) is primarily caused by smoking, accounting for approximately 85-90% of cases.",
            "Peptic ulcers are most commonly caused by Helicobacter pylori infection and the use of nonsteroidal anti-inflammatory drugs (NSAIDs).",
            "Epilepsy affects about 1% of the population globally, with a higher incidence in low- and middle-income countries due to infectious causes and limited access to treatment.",
            "Celiac disease is an autoimmune disorder where the ingestion of gluten leads to damage in the small intestine, affecting approximately 1% of the population worldwide.",
            "Sickle cell disease is more prevalent in individuals of African, Mediterranean, Middle Eastern, and Indian ancestry.",
            "Systemic lupus erythematosus (SLE) is more common in women, particularly those of African, Hispanic, Asian, and Native American descent.",
            "Hemophilia A, a bleeding disorder, is caused by a deficiency of clotting factor VIII and primarily affects males, occurring in about 1 in 5,000 male births.",
            "Cystic fibrosis is a genetic disorder affecting the respiratory and digestive systems, with the highest prevalence in Caucasians of Northern European descent.",
            "Melanoma, a serious form of skin cancer, is more common in fair-skinned individuals and those with a history of excessive sun exposure.",
            "Huntington's disease is a hereditary neurodegenerative disorder, with symptoms typically appearing between ages 30 and 50, and it affects both men and women equally."
    };

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_loader);

        ImageView loaderImageView = findViewById(R.id.loaderImageView);
        Animation rotateAnimation = AnimationUtils.loadAnimation(this, R.anim.loader_animation);
        loaderImageView.startAnimation(rotateAnimation);

        fadingTextView = findViewById(R.id.fadingTextView);

        // Set a random fact
        Random random = new Random();
        String randomFact = medicalFacts[random.nextInt(medicalFacts.length)];
        fadingTextView.setText(randomFact);

        // Apply the fade-in-out animation to the TextView
        Animation fadeInOut = AnimationUtils.loadAnimation(this, R.anim.fade_in_out);
        fadingTextView.startAnimation(fadeInOut);

        // Start long-running operation in a background thread
        new Thread(new Runnable() {
            public void run() {
                try {
                    // Simulate loading for 3 seconds
                    Thread.sleep(3000);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }

                // When the loading is complete, start the main activity
                handler.post(new Runnable() {
                    public void run() {
                        Intent intent = new Intent(LoaderActivity.this, MainActivity.class);
                        startActivity(intent);
                        finish(); // Finish LoaderActivity
                    }
                });
            }
        }).start();
    }
}