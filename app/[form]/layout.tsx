import { Suspense } from "react"
import Loading from "./loading"

export default function FormLayout({
  children, // will be a page or nested layout
  params, // will be the params for the page
}: {
  children: React.ReactNode
  params: {form: string}
}) {
  // convert uti-form to UTI Form
  const formName = params.form.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase());

  return (
    <section>
      {/* Include shared UI here e.g. a header or sidebar */}
      <div className="z-10 relative col-span-1 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md p-10 mx-5 flex flex-col max-w-screen-xl xl:mx-auto">
        <h1 
          className="text-2xl font-bold text-gray-900 mb-5"
        >{formName}</h1>
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
        <Suspense fallback={<Loading />}>
          {children}
        </Suspense>
      </div>
    </section>
  )
}