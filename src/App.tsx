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
        label: "Email Address",
        required: true,
      },
      {
        type: "text",
        name: "phopne",
        label: "Phone Number",
        pattern: "[0-9]{0,14}$",
      },
    ],
  },
  {
    title: "What is your monthly income?",
    fields: [
      {
        type: "radioGroup",
        name: "income",
        options: [
          {
            value: "0-1000",
            label: "0 - 1.000 Euro",
          },
          {
            value: "2000-3000",
            label: "1.000 - 2.000 Euro",
          },
          {
            value: "3000-4000",
            label: "2.000 - 3.000 Euro",
          },
          {
            value: "3000-4000",
            label: "3.000 - 4.000 Euro",
          },
          {
            value: "4000+",
            label: "More than 4.000 Euro",
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
  [{ value: "No answer given" }],
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
