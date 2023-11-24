"use client";
import MedicalForm from "@/components/shared/MedicalForm"
import { useState, useEffect } from "react";
import getQuestions from "../api/contentful";

interface FormField {
  question: string;
  type: string;
  options?: string[];
  sentence: string;
  dependsOn?: {
    question: string;
    answer: string;
  }
}

interface MedicalFormProps {
  formData: FormField[];
}

export default function Page(
  { params } : { params: { form: string } }
) {
  const [formData, setFormData] = useState<FormField[]>([]);

  function snakeToCamel(str: string) {
    // Remove the "form" part and convert to camelCase
    return str.replace(/[-_](.)/g, (_: any, char: string) => char.toUpperCase()).replace("form", "");
  }

  useEffect(() => {
    getQuestions(params.form)
      .then((data:any) => {
      console.log("Data fetched from API:", data);
      const removeForm = params.form.replace("-form", "");
      const FormCollection = snakeToCamel(removeForm);
      console.log("FormCollectionFromPage", FormCollection);
      setFormData(data[FormCollection + "FormCollection"].items);
    })
    // .then (() => {
    //   setFormData(UTIFormQuestionsWithDependsOn)
    //   }
    // )
    .catch((error) => {
      console.error("Error fetching data from API:", error);
    })
  }, [params.form]);

  console.log("formData", formData);

  return (
    
    <MedicalForm formData={formData} />
    
    )
  }

  // {

  //   "question": "DO YOU HAVE URINARY FREQUENCY",
  //   "answer": "I have urinary frequency",
  // }
  
  // const UTIFormQuestions = [
  //   {
  //     "question": "What Condition do you think you have?",
  //     "type": "text",
  //     "sentence": "I think I have {value}"
  //   },
  //   {
  //     "question": "Please list your main symptom",
  //     "type": "text",
  //     "sentence": "My main symptom is {value}"
  //   },
  //   {
  //     "question": "INCONTINENCE DURATION - When did the condition start?",
  //     "type": "radio",
  //     "options": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
  //     "sentence": "I have had this condition for {value}"
  //   },
  //   {
  //     "question": "Duration Unit",
  //     "type": "radio",
  //     "options": ["Days", "Weeks", "Months", "Years"],
  //     "sentence": "{value}"
  //   },
  //   {
  //     "question": "How would you describe the change in your incontinence symptoms over time?", 
  //     "type": "radio",
  //     "options": ["Sudden Onset", "Gradual Onset", "Stable no Change", "Progressively worse"],
  //     "sentence": "My incontinence symptoms have been {value}"
  //   },
  //   {
  //     "question": "When did it start getting worse?",
  //     "type": "text",
  //     "sentence": "My incontinence symptoms started getting worse {value}"
  //   },
  //   {
  //     "question": "Do you have issues with passing urine? (STARTING, STOPPING, DRIBBLING, STREAM)",
  //     "type": "checkbox",
  //     "options": ["To wait a longer than normal to start urinating", "Poor Flow/Stream", "Dribbling after passing water", "Known urethral narrowing/strictures"],
  //     "sentence": "I have issues with passing urine {value}"
  //   },
  //   
    // {
    //   "question": "Do you pass urine at night? (NOCTURIA)",
    //   "type": "radio",
    //   "options": ["I do not need to pass urine at night", "I wake up to pass urine at night (number of times)"],
    //   "sentence": "I pass urine at night {value}"
    // },
    // {
    //   "question": "Number of times you wake up to pass urine at night",
    //   "type": "radio",
    //   "options": ["0", "1", "2", "3", "4", "5+"],
    //   "sentence": "I wake up {value} times to pass urine at night",
    //   "dependsOn": {
    //     "question": "Do you pass urine at night? (NOCTURIA)",
    //     "answer": "I wake up to pass urine at night (number of times)"
    //   }
    // },
    // {
    //   "question": "URINARY FREQUENCY (check all that apply)",
    //   "type": "checkbox",
    //   "options": ["Going more frequent", "Feel like I do not Empty fully", "Needing to go back to wee", "Waking up more than usual to pass urine"],
    //   "sentence": "I have {value}",
    //   "dependsOn": {
    //     "question": "Do you pass urine at night? (NOCTURIA)",
    //     "answer": "I wake up to pass urine at night (number of times)"
    //   }
    // },
  //   {
  //     "question": "PROSTATE HISTORY (check all that apply)",
  //     "type": "checkbox",
  //     "options": ["History of Prostate problems", "Had surgery on my prostate", "Bone pains", "Family history of Prostate cancer"],
  //     "sentence": "I have {value}"
  //   },
  //   {
  //     "question": "For my prostate/ urinary issues I am currently taking",
  //     "type": "text",
  //     "sentence": "I am currently taking {value}"
  //   },
  //   {
  //     "question": "Previously tried",
  //     "type": "text",
  //     "sentence": "I have previously tried {value}"
  //   },
  //   {
  //     "question": "Immediate/First degree relatives were diagnosed with cancer",
  //     "type": "radio",
  //     "options": ["Under 55 years old", "55-65 years old", "Over 65 years old"],
  //     "sentence": "My immediate/first degree relatives were diagnosed with cancer {value}"
  //   },
  //   {
  //     "question": "Please add any other information not provided which you feel we need to Know",
  //     "type": "textarea",
  //     "sentence": "I would like to add {value}"
  //   },
  //   {
  //     "question": "Please indicate any of the following symptoms you have experienced related to haematuria/blood in urine (check all that apply):",
  //     "type": "checkbox",
  //     "options": ["Blood in urine", "Pink Urine", "Blood Clots", "Bleeding throughout urination", "Bleeding at the end of urination", "Bruising on Shins", "Diarrhoea", "Frothy Urine", "Urinating Air"],
  //     "sentence": "I have experienced {value}"
  //   },
  //   {
  //     "question": "Do you have painful urination? (check all symptoms that apply)",
  //     "type": "checkbox",
  //     "options": ["Burning", "Stinging", "Glass", "Dark", "Smelly", "Cloudy"],
  //     "sentence": "I have {value}"
  //   },
  //   {
  //     "question": "Urinary Risk Factors - I have had any of the following (check all that apply):",
  //     "type": "checkbox",
  //     "options": ["Temperatures", "Nausea", "Vomiting", "Constant Thirst", "Bone pains", "Known Kidney stones", "I have a history of ovarian cysts"],
  //     "sentence": "I have had {value}"
  //   },
  //   {
  //     "question": "Urinary Incontinence/ Urinary Leaking/ Inability to Control Urine",
  //     "type": "checkbox",
  //     "options": ["Incontinence when I cough/sneeze/exercise", "Incontinence as soon as I feel the urge to pass water", "Urinary accidents and get caught short or need to run to the toilet"],
  //     "sentence": "I have {value}"
  //   },
  //   {
  //     "question": "Abdominal Pain (Diagram) - Please indicate where you have pain",
  //     "type": "checkbox",
  //     "options": ["Right Upper Quadrant", "Right Lower Quadrant", "Left Upper Quadrant", "Left Lower Quadrant", "Epigastric", "Belly Button", "Loin Pain", "Low back Pain", "Suprapubic pain", "Loin to Groin"],
  //     "sentence": "I have pain in {value}"
  //   },
  //   {
  //     "question": "Abdominal Pain (Description) - Please indicate the type of pain you have",
  //     "type": "checkbox",
  //     "options": ["Crampy", "Spasms", "Constant", "Related to eating", "Comes and goes", "Heartburn/Indigestion", "Pulsatile", "Radiating into back"],
  //     "sentence": "I have {value}"
  //   },
  //   {
  //     "question": "Pain Description",
  //     "type": "checkbox",
  //     "options": ["Crampy", "Spasms", "Constant", "Sharp", "Electric Shock", "Burning", "Hot", "Tingling", "Numb", "Ache", "Glass", "Acidic"],
  //     "sentence": "I have {value}"
  //   },
  //   {
  //     "question": "Back Pain (Diagram) - Please indicate where you have pain",
  //     "type": "checkbox",
  //     "options": ["Left Shoulder Blade", "Right Shoulder Blade", "Inbetween Shoulder Blades", "Left between hips and ribs", "Right between hips and ribs", "Middle Spine", "Left Pelvic Bone", "Right Pelvic bone", "Spine meets pelvis", "Left Buttock", "Right Buttock"],
  //     "sentence": "I have pain in {value}"
  //   },
  //   {
  //     "question": "Back Pain (Description) - Please indicate the type of pain you have",
  //     "type": "checkbox",
  //     "options": ["Crampy", "Spasms", "Constant", "Sharp", "Electric Shock", "Burning", "Hot", "Tingling", "Numb", "Ache", "Glass", "Acidic"],
  //     "sentence": "I have {value}"
  //   },
  //   {
  //     "question": "Bloating Frequency (check all that apply)",
  //     "type": "radio",
  //     "options": ["I get bloated 1-5 times a month", "I get bloated 6-10 times a month", "I get bloated 11-15 times a month", "I get bloated more than half the days of the month"],
  //     "sentence": "I get bloated {value}"
  //   },
  //   {
  //     "question": "Additional Conditions (check all that apply)",
  //     "type": "checkbox",
  //     "options": ["Vaginal Prolapse", "History of Prostate problems", "Family history of Prostate Problems", "Constipation", "Weight Loss"],
  //     "sentence": "I have {value}"
  //   },
  //   {
  //     "question": "Please add any other information not provided which you feel we need to Know (e.g. previous investigations, treatments, etc.)",
  //     "type": "textarea",
  //     "sentence": "I would like to add {value}"
  //   }
  // ]