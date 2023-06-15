"use client";
import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';

interface FormField {
  question: string;
  type: string;
  options?: string[];
}

interface MedicalFormProps {
  formData: FormField[];
}

// Create a dynamic type for the form values
type FormValues = {
  [K in FormField['question']]?: string | string[];
};

const MedicalForm: React.FC<MedicalFormProps> = ({formData}) => {
  // Initial values of the form fields
  const initialValues: FormValues = formData.reduce((acc, curr) => {
    acc[curr.question] = curr.type === 'checkbox' ? [] : '';
    return acc;
  }, {} as FormValues);

  const formOrder = formData.map(field => field.question);

  const formatFormValue = (question: keyof FormValues, value: FormValues[keyof FormValues]) => {
    if (Array.isArray(value)) {
      const options = value.join(', ');
      return `${question}: ${options}`;
    }
    return `${question}: ${value}`;
  };

  const generatePatientSummary = (values: FormValues) => {
    return formOrder
      .map(question => {
        const value = values[question];
        if (value && (typeof value === 'string' || value.length > 0)) {
          return formatFormValue(question, value);
        }
        return null;
      })
      .filter(value => value !== null)
      .join('\n');
  };

  const generateFormSummary = (values: FormValues) => {
    const summarySentences: string[] = [];
  
    if (values["What Condition do you think you have?"]) {
      summarySentences.push(`You think you have ${values["What Condition do you think you have?"]}`);
    }
  
    if (values["Please list your main symptom"]) {
      summarySentences.push(`Your main symptom is ${values["Please list your main symptom"]}`);
    }
  
    if (values["INCONTINENCE DURATION - When did the condition start?"]) {
      const duration = values["INCONTINENCE DURATION - When did the condition start?"];
      const durationUnit = values["Duration Unit"];
      summarySentences.push(`The condition started ${duration} ${durationUnit} ago`);
    }
  
    if (values["How would you describe the change in your incontinence symptoms over time?"]) {
      const change = values["How would you describe the change in your incontinence symptoms over time?"];
      summarySentences.push(`The change in your incontinence symptoms is ${change}`);
    }
  
    if (values["When did it start getting worse?"]) {
      summarySentences.push(`It started getting worse ${values["When did it start getting worse?"]}`);
    }
  
    if (values["Do you have issues with passing urine? (STARTING, STOPPING, DRIBBLING, STREAM)"]) {
      const issues = values["Do you have issues with passing urine? (STARTING, STOPPING, DRIBBLING, STREAM)"];
      if (Array.isArray(issues) && issues.length > 0) {
        summarySentences.push(`You have issues with passing urine: ${issues.join(", ")}`);
      }
    }
  
    if (values["Do you pass urine at night? (NOCTURIA)"]) {
      const nocturia = values["Do you pass urine at night? (NOCTURIA)"];
      if (nocturia === "I wake up to pass urine at night (number of times)") {
        const numTimes = values["Number of times you wake up to pass urine at night"];
        if (numTimes) {
          summarySentences.push(`You wake up ${numTimes} time(s) to pass urine at night`);
        }
      } else {
        summarySentences.push("You do not need to pass urine at night");
      }
    }
  
    if (values["URINARY FREQUENCY (check all that apply)"]) {
      const urinaryFrequency = values["URINARY FREQUENCY (check all that apply)"];
      if (Array.isArray(urinaryFrequency) && urinaryFrequency.length > 0) {
        summarySentences.push(`You have urinary frequency: ${urinaryFrequency.join(", ")}`);
      }
    }
  
    if (values["PROSTATE HISTORY (check all that apply)"]) {
      const prostateHistory = values["PROSTATE HISTORY (check all that apply)"];
      if (Array.isArray(prostateHistory) && prostateHistory.length > 0) {
        summarySentences.push(`You have a history of prostate problems: ${prostateHistory.join(", ")}`);
      }
    }
    
    if (values["For my prostate/ urinary issues I am currently taking"]) {
      const currentMedication = values["For my prostate/ urinary issues I am currently taking"];
      if (currentMedication) {
        summarySentences.push(`You are currently taking ${currentMedication}`);
      }
    }
    
    if (values["Previously tried"]) {
      const previousTreatments = values["Previously tried"];
      if (previousTreatments) {
        summarySentences.push(`You have previously tried ${previousTreatments}`);
      }
    }
    
    if (values["Immediate/First degree relatives were diagnosed with cancer"]) {
      const relativesCancer = values["Immediate/First degree relatives were diagnosed with cancer"];
      if (relativesCancer) {
        summarySentences.push(`Immediate/First degree relatives were diagnosed with cancer: ${relativesCancer}`);
      }
    }
    
    if (values["Please add any other information not provided which you feel we need to Know"]) {
      const additionalInfo = values["Please add any other information not provided which you feel we need to Know"];
      if (additionalInfo) {
        summarySentences.push(`Additional information: ${additionalInfo}`);
      }
    }
    
    if (values["Please indicate any of the following symptoms you have experienced related to haematuria/blood in urine (check all that apply):"]) {
      const haematuriaSymptoms = values["Please indicate any of the following symptoms you have experienced related to haematuria/blood in urine (check all that apply):"];
      if (Array.isArray(haematuriaSymptoms) && haematuriaSymptoms.length > 0) {
        summarySentences.push(`You have experienced the following symptoms related to haematuria/blood in urine: ${haematuriaSymptoms.join(", ")}`);
      }
    }
    
    if (values["Do you have painful urination? (check all symptoms that apply)"]) {
      const painfulUrinationSymptoms = values["Do you have painful urination? (check all symptoms that apply)"];
      if (Array.isArray(painfulUrinationSymptoms) && painfulUrinationSymptoms.length > 0) {
        summarySentences.push(`You have the following symptoms of painful urination: ${painfulUrinationSymptoms.join(", ")}`);
      }
    }
    
    if (values["Urinary Risk Factors - I have had any of the following (check all that apply):"]) {
      const urinaryRiskFactors = values["Urinary Risk Factors - I have had any of the following (check all that apply):"];
      if (Array.isArray(urinaryRiskFactors) && urinaryRiskFactors.length > 0) {
        summarySentences.push(`You have the following urinary risk factors: ${urinaryRiskFactors.join(", ")}`);
      }
    }
    
    if (values["Urinary Incontinence/ Urinary Leaking/ Inability to Control Urine"]) {
      const urinaryIncontinence = values["Urinary Incontinence/ Urinary Leaking/ Inability to Control Urine"];
      if (Array.isArray(urinaryIncontinence) && urinaryIncontinence.length > 0) {
        summarySentences.push(`You have urinary incontinence and experience: ${urinaryIncontinence.join(", ")}`);
      }
    }
    
    if (values["Abdominal Pain (Diagram) - Please indicate where you have pain"]) {
      const abdominalPainLocation = values["Abdominal Pain (Diagram) - Please indicate where you have pain"];
      if (Array.isArray(abdominalPainLocation) && abdominalPainLocation.length > 0) {
        summarySentences.push(`You have abdominal pain in the following location(s): ${abdominalPainLocation.join(", ")}`);
      }
    }
    
    if (values["Abdominal Pain (Description) - Please indicate the type of pain you have"]) {
      const abdominalPainDescription = values["Abdominal Pain (Description) - Please indicate the type of pain you have"];
      if (Array.isArray(abdominalPainDescription) && abdominalPainDescription.length > 0) {
        summarySentences.push(`You have the following type of abdominal pain: ${abdominalPainDescription.join(", ")}`);
      }
    }
    
    if (values["Pain Description"]) {
      const painDescription = values["Pain Description"];
      if (Array.isArray(painDescription) && painDescription.length > 0) {
        summarySentences.push(`You experience the following pain description: ${painDescription.join(", ")}`);
      }
    }
    
    if (values["Back Pain (Diagram) - Please indicate where you have pain"]) {
      const backPainLocation = values["Back Pain (Diagram) - Please indicate where you have pain"];
      if (Array.isArray(backPainLocation) && backPainLocation.length > 0) {
        summarySentences.push(`You have back pain in the following location(s): ${backPainLocation.join(", ")}`);
      }
    }
    
    if (values["Back Pain (Description) - Please indicate the type of pain you have"]) {
      const backPainDescription = values["Back Pain (Description) - Please indicate the type of pain you have"];
      if (Array.isArray(backPainDescription) && backPainDescription.length > 0) {
        summarySentences.push(`You have the following type of back pain: ${backPainDescription.join(", ")}`);
      }
    }
    
    if (values["Bloating Frequency (check all that apply)"]) {
      const bloatingFrequency = values["Bloating Frequency (check all that apply)"];
      if (Array.isArray(bloatingFrequency) && bloatingFrequency.length > 0) {
        summarySentences.push(`You experience bloating with the following frequency: ${bloatingFrequency.join(", ")}`);
      }
    }
    
    if (values["Additional Conditions (check all that apply)"]) {
      const additionalConditions = values["Additional Conditions (check all that apply)"];
      if (Array.isArray(additionalConditions) && additionalConditions.length > 0) {
        summarySentences.push(`You have the following additional conditions: ${additionalConditions.join(", ")}`);
      }
    }
    
    return summarySentences.join(". ");
  };
  

  const [patientSummary, setPatientSummary] = useState('');
  const [doctorSummary, setDoctorSummary] = useState('');
  

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          console.log({ values });
          const patientSummary = generatePatientSummary(values);
          const doctorSummary = generateFormSummary(values);
          setPatientSummary(patientSummary);
          setDoctorSummary(doctorSummary);
          actions.setSubmitting(false);
        }}
      >
        {() => (
          <Form className="space-y-6">
            {formData.map((field, index) => {
              switch(field.type) {
                case 'text':
                case 'textarea':
                  return (
                    <div key={index}>
                      <label className="block font-bold text-gray-700 mb-2">{field.question}</label>
                      <Field
                        name={field.question}
                        type='text'
                        as={field.type === 'textarea' ? 'textarea' : undefined}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                      <ErrorMessage className="text-red-500" name={field.question} component="div" />
                    </div>
                  );
                case 'radio':
                  return (
                    <div key={index}>
                      <label className="block font-bold text-gray-700 mb-2">{field.question}</label>
                      {field.options?.map((option, i) => (
                        <label  key={i}
                                className="mb-2 ml-2"
                        >
                          <Field
                            type="radio"
                            name={field.question}
                            value={option}
                            className="mr-1 mb-1"
                          />
                          {option}
                        </label>
                      ))}
                      <ErrorMessage className="text-red-500" name={field.question} component="div" />
                    </div>
                  );
                case 'checkbox':
                  return (
                    <div key={index} className="mb-4">
                      <label className="block font-bold text-gray-700 mb-2">{field.question}</label>
                      <div className="flex flex-col flex-wrap">
                        {field.options?.map((option, i) => (
                          <label  key={i}
                                  className="flex items-center mb-2"
                          >
                            <Field
                              type="checkbox"
                              name={field.question}
                              value={option}
                              className="mr-2"
                            />
                            {option}
                          </label>
                        ))}
                      </div>
                      <ErrorMessage className="text-red-500" name={field.question} component="div" />
                    </div>
                  );
                default:
                  return null;
              }
            })}
            <button 
              type="submit"
              className="px-4 py-2 mt-4 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"  
              >
              Submit
            </button>
          </Form>
        )}
      </Formik>
      {patientSummary && (
        <div className="mt-6">
          <h2 className="text-xl font-bold">Patient Summary</h2>
          <p>{patientSummary}</p>
        </div>
      )}
      {doctorSummary && (
        <div className="mt-6">
          <h2 className="text-xl font-bold">Doctor Summary</h2>
          <p>{doctorSummary}</p>
        </div>
      )}
    </div>
  );
};

export default MedicalForm;
