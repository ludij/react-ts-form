import React from "react"
import CForm from "./components/CForm"

const formFields = [
  {
    type: "text",
    label: "First Name",
    name: "first-name",
    value: "",
  },
  {
    type: "text",
    label: "Last Name",
    name: "last-name",
    value: "",
  },
  {
    type: "radio",
    label: "Income",
    name: "income",
    options: [
      {
        label: "Option 1",
        value: "option-1",
        checked: false,
      },
      {
        label: "Option 2",
        value: "option-2",
        checked: false,
      },
      {
        label: "Option 3",
        value: "option-3",
        checked: true,
      },
    ],
  },
]

function App() {
  return (
    <div>
      <CForm formFields={formFields} />
    </div>
  )
}

export default App
