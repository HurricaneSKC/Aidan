import MedicalForm from "@/components/shared/MedicalForm"

export default function UTIPage() {
  const UTIFormQuestions = [
    {
      "question": "What Condition do you think you have?",
      "type": "text"
    },
    {
      "question": "Please list your main symptom",
      "type": "text"
    },
    {
      "question": "INCONTINENCE DURATION - When did the condition start?",
      "type": "radio",
      "options": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]
    },
    {
      "question": "Duration Unit",
      "type": "radio",
      "options": ["Days", "Weeks", "Months", "Years"]
    },
    {
      "question": "How would you describe the change in your incontinence symptoms over time?", 
      "type": "radio",
      "options": ["Sudden Onset", "Gradual Onset", "Stable no Change", "Progressively worse"]
    },
    {
      "question": "When did it start getting worse?",
      "type": "text"
    },
    {
      "question": "Do you have issues with passing urine? (STARTING, STOPPING, DRIBBLING, STREAM)",
      "type": "checkbox",
      "options": ["To wait a longer than normal to start urinating", "Poor Flow/Stream", "Dribbling after passing water", "Known urethral narrowing/strictures"]
    },
    {
      "question": "Do you pass urine at night? (NOCTURIA)",
      "type": "radio",
      "options": ["I do not need to pass urine at night", "I wake up to pass urine at night (number of times)"]
    },
    {
      "question": "Number of times you wake up to pass urine at night",
      "type": "radio",
      "options": ["0", "1", "2", "3", "4", "5+"]
    },
    {
      "question": "URINARY FREQUENCY (check all that apply)",
      "type": "checkbox",
      "options": ["Going more frequent", "Feel like I do not Empty fully", "Needing to go back to wee", "Waking up more than usual to pass urine"]
    },
    {
      "question": "PROSTATE HISTORY (check all that apply)",
      "type": "checkbox",
      "options": ["History of Prostate problems", "Had surgery on my prostate", "Bone pains", "Family history of Prostate cancer"]
    },
    {
      "question": "For my prostate/ urinary issues I am currently taking",
      "type": "text"
    },
    {
      "question": "Previously tried",
      "type": "text"
    },
    {
      "question": "Immediate/First degree relatives were diagnosed with cancer",
      "type": "radio",
      "options": ["Under 55 years old", "55-65 years old", "Over 65 years old"]
    },
    {
      "question": "Please add any other information not provided which you feel we need to Know",
      "type": "textarea"
    },
    {
      "question": "Please indicate any of the following symptoms you have experienced related to haematuria/blood in urine (check all that apply):",
      "type": "checkbox",
      "options": ["Blood in urine", "Pink Urine", "Blood Clots", "Bleeding throughout urination", "Bleeding at the end of urination", "Bruising on Shins", "Diarrhoea", "Frothy Urine", "Urinating Air"]
    },
    {
      "question": "Do you have painful urination? (check all symptoms that apply)",
      "type": "checkbox",
      "options": ["Burning", "Stinging", "Glass", "Dark", "Smelly", "Cloudy"]
    },
    {
      "question": "Urinary Risk Factors - I have had any of the following (check all that apply):",
      "type": "checkbox",
      "options": ["Temperatures", "Nausea", "Vomiting", "Constant Thirst", "Bone pains", "Known Kidney stones", "I have a history of ovarian cysts"]
    },
    {
      "question": "Urinary Incontinence/ Urinary Leaking/ Inability to Control Urine",
      "type": "checkbox",
      "options": ["Incontinence when I cough/sneeze/exercise", "Incontinence as soon as I feel the urge to pass water", "Urinary accidents and get caught short or need to run to the toilet"]
    },
    {
      "question": "Abdominal Pain (Diagram)",
      "type": "checkbox",
      "options": ["Right Upper Quadrant", "Right Lower Quadrant", "Left Upper Quadrant", "Left Lower Quadrant", "Epigastric", "Belly Button", "Loin Pain", "Low back Pain", "Suprapubic pain", "Loin to Groin"]
    },
    {
      "question": "Abdominal Pain (Description)",
      "type": "checkbox",
      "options": ["Crampy", "Spasms", "Constant", "Related to eating", "Comes and goes", "Heartburn/Indigestion", "Pulsatile", "Radiating into back"]
    },
    {
      "question": "Pain Description",
      "type": "checkbox",
      "options": ["Crampy", "Spasms", "Constant", "Sharp", "Electric Shock", "Burning", "Hot", "Tingling", "Numb", "Ache", "Glass", "Acidic"]
    },
    {
      "question": "Back Pain (Diagram)",
      "type": "checkbox",
      "options": ["Left Shoulder Blade", "Right Shoulder Blade", "Inbetween Shoulder Blades", "Left between hips and ribs", "Right between hips and ribs", "Middle Spine", "Left Pelvic Bone", "Right Pelvic bone", "Spine meets pelvis", "Left Buttock", "Right Buttock"]
    },
    {
      "question": "Back Pain (Description)",
      "type": "checkbox",
      "options": ["Crampy", "Spasms", "Constant", "Sharp", "Electric Shock", "Burning", "Hot", "Tingling", "Numb", "Ache", "Glass", "Acidic"]
    },
    {
      "question": "Bloating Frequency",
      "type": "radio",
      "options": ["I get bloated 1-5 times a month", "I get bloated 6-10 times a month", "I get bloated 11-15 times a month", "I get bloated more than half the days of the month"]
    },
    {
      "question": "Additional Conditions (check all that apply)",
      "type": "checkbox",
      "options": ["Vaginal Prolapse", "History of Prostate problems", "Family history of Prostate Problems", "Constipation", "Weight Loss"]
    },
    {
      "question": "Please add any other information not provided which you feel we need to Know",
      "type": "textarea"
    }
  ]
  

  return (
    <div className="z-10 relative col-span-1 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md p-10 mx-5 flex flex-col max-w-screen-xl xl:mx-auto">
      <h1 
        className="text-2xl font-bold text-gray-900 mb-5"
      >Urination Form</h1>
      <h4
        className="text-gray-700 mb-5"
      >
        Please read before completing template
      </h4>
      <ul
        className="text-gray-700 mb-10"
      >
        <li>Not all questions are relevant but nearly all of them are</li>
        <li>If left unchecked it means you do not have those symptoms</li>
        <li>If the associated symptoms do not show a good pattern with your main symptoms or started at the same time as your main symptom please start another template</li>
        <li>At the end free text what have you tried</li>
        <li>Please edit the summary of your complaint to fit your history of the complaint</li>
        <li>Please tell us if you have the same issue in the past, when it occurred</li>
      </ul>
      <MedicalForm formData={UTIFormQuestions} />
    </div>
  )
}