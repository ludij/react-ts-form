import React from "react"
import CTitle from './components/CTitle'
import CForm from "./components/CForm"
import "./styles/styles.css"

const formSections = [
  {
    title: "What is your name?",
    fields: [
      {
        type: "text",
        name: "first-name",
        label: "First Name",
        required: true,
      },
      {
        type: "text",
        name: "last-name",
        label: "Last Name",
        required: true,
      },
    ],
  },
  {
    title: "How can we reach you?",
    fields: [
      {
        type: "email",
        name: "email",
        label: "Email address",
        required: true,
      },
      {
        type: "text",
        name: "phopne",
        label: "Phone number",
        pattern: "[0-9]{0,14}$",
      },
    ],
  },
  {
    title: "What is the range of your income?",
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
        ],
      },
    ],
  },
]

const formState = [
  [{ value: "" }, { value: "" }],
  [
    {
      value: "",
      defaultInvalidMessage:
        "This field is not valid yet.<br />Please enter an address in the format 'email@address.com'.",
    },
    {
      value: "",
      defaultInvalidMessage:
        "This field is not valid yet.<br />Please enter a number in the format '004912345678'.",
    },
  ],
  [{ value: "No answer provided." }],
]

function App() {
  return (
    <React.Fragment>
      <CTitle>React TS Form</CTitle>
      <CForm
        formSections={formSections}
        formState={formState}
        sectionToShow={0}
      />
    </React.Fragment>
  )
}

export default App
