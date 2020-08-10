import React from "react"
import CForm from "./components/CForm"

const formSections = [
  {
    title: 'name',
    fields: [
      {
        type: "text",
        name: "first-name",
        label: "First Name",
      },
      {
        type: "text",
        name: "last-name",
        label: "Last Name",
      },
    ]
  },
  {
    title: 'Income',
    fields: [
      {
        type: "radioGroup",
        name: "income",
        options: [
          {
            value: "option-1",
            label: "Option 1",
          },
          {
            value: "option-2",
            label: "Option 2",
          },
          {
            value: "option-3",
            label: "Option 3",
          },
        ]
      },
    ],
  },
]

const formValues = [
    ['hi', 'no'],
    ['Option 1']
]

function App() {
  return (
    <React.Fragment>
      <CForm formSections={formSections} formValues={formValues} sectionToShow={0} />
    </React.Fragment>
  )
}

export default App
