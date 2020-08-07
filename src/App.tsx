import React from 'react';
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
    value: "",
    options: []
  },
]

function App() {
  return (
    <div>
      <CForm formFields={formFields} />
    </div>
  )
}

export default App;
