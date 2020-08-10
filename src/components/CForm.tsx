import React, { useState } from "react"
import CInputTextAndEmail from "./CInputTextAndEmail"
import CInputRadioGroup from "./CInputRadioGroup"
import CErrorMessage from "./CErrorMessage"

interface CFormFieldOptions {
  label: string
  value: string
}

interface CFormField {
  // type: "text" | "radioGroup" /// doesn't work?
  type: string
  label?: string
  name: string
  options?: CFormFieldOptions[]
}

interface CFormSection {
  title: string
  fields: CFormField[]
}

interface CFormProps {
  formSections: CFormSection[]
  formValues: string[][]
  sectionToShow: number
}

const CForm = (props: CFormProps) => {
  const [sectionToShow, setSectionToShow] = useState(props.sectionToShow || 0)
  const [formValues, setFormValues] = useState(props.formValues)

  const updateFormValues = (event: any, sectionIndex: number): void => {
    const fieldIndex = event.target.getAttribute("data-field-index")
    const value = event.target.value
    let newValue = value
    if (event.target.type === "radio") {
      const radioOptions =
        props.formSections[sectionIndex].fields[fieldIndex].options
      const option =
        radioOptions &&
        radioOptions.find(
          (option) => option.value === event.target.value && option.label
        )
      newValue = option && option.label
    }
    const updatedFormValues = [...formValues]
    updatedFormValues[sectionIndex][fieldIndex] = newValue
    console.log("updateFormValues", updatedFormValues)
    return setFormValues(updatedFormValues)
  }

  if (sectionToShow === props.formSections.length) {
    // non-editable confirmation part
    return (
      <div>
        {formValues.map((section, index) => {
          return (
            <React.Fragment key={index}>
              <p>{props.formSections[index].title}:</p>
              <p>{section.join(" ")}</p>
            </React.Fragment>
          )
        })}
        <p>submit</p>
      </div>
    )
  }

  // editable sections
  return (
    <React.Fragment>
      {props.formSections.map((section, sectionIndex) => {
        if (sectionToShow === sectionIndex) {
          return (
            <div
              key={sectionIndex}
              onChange={(event) => updateFormValues(event, sectionIndex)}
            >
              {section.title ? <h2>{section.title}</h2> : null}
              {section.fields.map((formField, index) => {
                if (formField.type === "text" || formField.type === "email") {
                  return (
                    <React.Fragment key={"c-form-field-" + index}>
                      <CInputTextAndEmail
                        type={formField.type}
                        label={formField.label || ""}
                        name={formField.name}
                        value={formValues[sectionIndex][index]}
                        fieldIndex={index}
                      />
                      <CErrorMessage>Error</CErrorMessage>
                    </React.Fragment>
                  )
                }
                return (
                  <React.Fragment key={"c-form-field-" + index}>
                    <CInputRadioGroup
                      name={formField.name}
                      value={formValues[sectionIndex][index]}
                      options={formField.options || []}
                      fieldIndex={index}
                    />
                  </React.Fragment>
                )
              })}
            </div>
          )
        }
        return null
      })}

      <button type="button" onClick={() => setSectionToShow(sectionToShow + 1)}>
        next
      </button>
    </React.Fragment>
  )
}

export default CForm
