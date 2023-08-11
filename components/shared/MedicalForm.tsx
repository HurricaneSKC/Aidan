"use client"
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import generateDiagnosis from '@/app/api/generate-diagnosis';

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

interface HTMLComponentProps {
  htmlString: string;
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
  
  const { handleSubmit, control, setValue, watch, register } = useForm<FormValues>({
    defaultValues: initialValues
  });
  const [patientSummary, setPatientSummary] = useState('');
  const [doctorSummary, setDoctorSummary] = useState('');
  const [apiResponse, setApiResponse] = useState('');

  const watchAllFields = watch();

  // Function to check if a question should be visible
  const isQuestionVisible = (field: FormField) => {
    // If the question does not depend on another question, it's always visible
    if (!field.dependsOn) return true;

    // Check if the answer to the dependent question matches the required answer
    const dependsOnAnswer = watchAllFields[field.dependsOn.question];
    return dependsOnAnswer === field.dependsOn.answer;
  };

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
      <form onSubmit={handleSubmit((values) => {
        // Handle form submission
        const patientSummary = generatePatientSummary(values);
        const doctorSummary = generateFormSummary(values, formData);
        setPatientSummary(patientSummary);
        setDoctorSummary(doctorSummary);
        console.log(values);
        
      })}>
        {formData.map((field, index) => {
          // Check if the question should be visible
          if (!isQuestionVisible(field)) return null;

          switch (field.type) {
            case 'text':
            case 'textarea':
              return (
                <div key={index}>
                  <label className="block font-bold text-gray-700 mb-2">{field.question}</label>
                  <Controller
                    name={field.question}
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <input
                        {...field}
                        type={field.type === 'textarea' ? 'textarea' : 'text'}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    )}
                  />
                </div>
              );
            case 'radio':
              return (
                <div key={index}>
                  <label className="block font-bold text-gray-700 mb-2">{field.question}</label>
                  {field.options?.map((option, i) => (
                    <label key={i} className="mb-2 ml-2">
                      <input
                        type="radio"
                        value={option}
                        className="mr-1 mb-1"
                        {...register(field.question)}
                      />
                      {option}
                    </label>
                  ))}
                </div>
              );
            case 'checkbox':
              return (
                <div key={index} className="mb-4">
                  <label className="block font-bold text-gray-700 mb-2">{field.question}</label>
                  {field.options?.map((option, i) => (
                    <label key={i} className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        value={option}
                        className="mr-2"
                        {...register(field.question)}
                      />
                      {option}
                    </label>
                  ))}
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
      </form>
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
