"use client";
import React from 'react';
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

  const generateFormSummary = (values: FormValues) => {
    return formOrder
      .map(question => formatFormValue(question, values[question]))
      .join('\n');
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, actions) => {
        console.log({ values, actions });
        const summary = generateFormSummary(values);
        console.log(summary);
        alert((summary));
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
                              className="mb-2"
                      >
                        <Field
                          type="radio"
                          name={field.question}
                          value={option}
                          className="mr-1 ml-4 mb-1"
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
  );
};

export default MedicalForm;
