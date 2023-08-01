"use client"
import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import generateDiagnosis from '@/app/api/generate-diagnosis';

interface FormField {
  question: string;
  type: string;
  options?: string[];
  sentence: string;
  dependsOn?: string;
}

interface MedicalFormProps {
  formData: FormField[];
}

// Create a dynamic type for the form values
type FormValues = {
  [K in FormField['question']]?: string | string[];
};

const MedicalForm: React.FC<MedicalFormProps> = ({formData}) => {
  const [hiddenQuestions, setHiddenQuestions] = useState<string[]>([]);

  const isQuestionHidden = (question: string) => {
    return hiddenQuestions.includes(question);
  };

  console.log("formData", formData);
  // Initial values of the form fields
  const initialValues: FormValues = formData.reduce((acc, curr) => {
    acc[curr.question] = curr.type === 'checkbox' ? [] : '';
    return acc;
  }, {} as FormValues);
  console.log("initialValues", initialValues);

  const formOrder = formData.map(field => field.question);

  const formatFormValue = (question: keyof FormValues, value: FormValues[keyof FormValues]) => {
    if (Array.isArray(value)) {
      const options = value.join(', ');
      return `${question}: ${options}`;
    }
    return `${question}: ${value}`;
  };

  const generatePatientSummary = (values: FormValues) => {
    const summaryItems: string[] = [];
  
    formOrder.forEach((question) => {
      const value = values[question];
      if (value && (typeof value === 'string' || value.length > 0)) {
        const formattedValue = formatFormValue(question, value);
        summaryItems.push(`<li>${formattedValue}</li>`);
      }
    });
  
    if (summaryItems.length === 0) {
      return "";
    }
  
    return `<ol>${summaryItems.join("")}</ol>`;
  };

  const generateFormSummary = (values: FormValues, formData: FormField[]) => {
    const summarySentences: string[] = [];
  
    formData.forEach((field) => {
      const { question, sentence, type } = field;
      const value = values[question];
  
      if (value && sentence) {
        if (
          (type === 'radio' && value !== undefined && value !== null && value !== '') ||
          (type === 'checkbox' && Array.isArray(value) && value.length > 0) ||
          (type === 'text' || type === 'textarea') // Handle text and textarea types directly
        ) {
          let formattedSentence = sentence.replace('{value}', String(value));
  
          if (formattedSentence.includes('{Duration Unit}')) {
            const durationUnit = values['Duration Unit'];
            formattedSentence = formattedSentence.replace('{Duration Unit}', durationUnit?.toString() ?? '');
          }
  
          summarySentences.push(formattedSentence);
        }
      }
    });
  
    return summarySentences.join('. ');
  };


  const [patientSummary, setPatientSummary] = useState('');
  const [doctorSummary, setDoctorSummary] = useState('');
  const [apiResponse, setApiResponse] = useState('');

  const handleApiCall = () => {
    generateDiagnosis(doctorSummary)
      .then((response) => {
        response = HTMLComponent({ htmlString: response });
        setApiResponse(response);
      })
      .catch((error) => {
        console.log(error);
      }
    );
  };
  interface HTMLComponentProps {
    htmlString: string;
  }
  
  const HTMLComponent: React.FC<HTMLComponentProps> = ({ htmlString }) => {
    return <div dangerouslySetInnerHTML={{ __html: htmlString }} />;
  };

  const handlePrint = () => {
    // Trigger print dialog
    const printContent = `${patientSummary}\n${doctorSummary}`;
    const printWindow = window.open("", "Print Window");
    printWindow?.document.write(`<pre>${printContent}</pre>`);
    printWindow?.document.close();
    printWindow?.print();
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          console.log({ values });
          const patientSummary = generatePatientSummary(values);
          const doctorSummary = generateFormSummary(values, formData);
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
          <div dangerouslySetInnerHTML={{ __html: patientSummary }} />
        </div>
      )}
      {doctorSummary && (
        <div className="mt-6">
          <h2 className="text-xl font-bold">Doctor Summary</h2>
          <p>{doctorSummary}</p>
          <button 
            onClick={handleApiCall}
            className="px-4 py-2 mt-4 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
              Get Diagnosis & Treatment Plan
          </button>
          <button className="bg-green-500 text-white px-4 py-2 rounded ml-3" onClick={handlePrint}>
            Print
          </button>
          {apiResponse && (
            <div className="mt-6">
              <h3 className="text-xl font-bold">Diagnosis & Treatment Plan</h3>
              <div>{apiResponse}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MedicalForm;
