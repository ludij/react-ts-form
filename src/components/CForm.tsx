import React, { useState } from "react"
import CInputTextAndEmail from "./CInputTextAndEmail"
import CInputRadioGroup from "./CInputRadioGroup"
import CErrorMessage from "./CErrorMessage"

interface CFormFieldOptions {
  value: string
  label: string
}
interface CFormField {
  // type: "text" | "radioGroup" /// doesn't work?
  type: string
  name: string
  required?: boolean
  options?: CFormFieldOptions[]
  label?: string
}

interface CFormSection {
  title: string
  fields: CFormField[]
}

type FormValues = string[][]

interface CFormState {
  value: string
  errorMessage?: string
}

interface CFormProps {
  formSections: CFormSection[]
  formState: CFormState[][]
  sectionToShow: number
}

interface extendedFormState extends CFormState {
  isPristine: boolean
  isUntouched: boolean
}

const extendFormState = (formState: CFormState[][]): extendedFormState[][] => {
  return formState.map((formSection) =>
    formSection.map((formField) => {
      const extendedFormField = {
        ...formField,
        isPristine: true,
        isUntouched: true,
      }
      return extendedFormField
    })
  )
}

const CForm = (props: CFormProps) => {
  const [sectionToShow, setSectionToShow] = useState(props.sectionToShow || 0)
  const [formState, setFormState] = useState(extendFormState(props.formState))

  const updateFormState = (event: any, sectionIndex: number): void => {
    event.persist()
    const fieldIndex = event.target.getAttribute("data-field-index")
    const value = event.target.value
    const validity = event.target.validity

    let newValue = value
    if (event.type === 'change') {
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
    }

    let newErrorMessage = ""
    if (!validity.valid) {
      newErrorMessage = "This field is not valid yet"
      if (validity.valueMissing) {
        newErrorMessage = "This field is required"
      }
    }

    const updatedFormState = [...formState]
    const fieldToUpdate = updatedFormState[sectionIndex][fieldIndex]

    if (event.type === 'blur' && fieldToUpdate.isUntouched) {
      fieldToUpdate.isUntouched = false
    }
    if (newValue !== fieldToUpdate.value) {
        fieldToUpdate.value = newValue
      }
    if (newErrorMessage !== fieldToUpdate.errorMessage) {
      fieldToUpdate.errorMessage = newErrorMessage
    }
    if (fieldToUpdate.isPristine) {
      fieldToUpdate.isPristine = false
    }
    setFormState(updatedFormState)
    console.log("valid?", validity)
    console.log("updatedFormState", updatedFormState)
    return
  }

  if (sectionToShow === props.formSections.length) {
    // non-editable confirmation part
    return (
      <div>
        {formState.map((section, index) => {
          return (
            <React.Fragment key={index}>
              <p>{props.formSections[index].title}:</p>
              <p>{section.map((field) => field.value).join(" ")}</p>
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
              onChange={(event) => updateFormState(event, sectionIndex)}
              onBlur={(event) => updateFormState(event, sectionIndex)}
            >
              {section.title && <h2>{section.title}</h2>}
              {section.fields.map((formField, index) => {
                if (formField.type === "text" || formField.type === "email") {
                  return (
                    <React.Fragment key={"c-form-field-" + index}>
                      <CInputTextAndEmail
                        type={formField.type}
                        label={formField.label || ""}
                        name={formField.name}
                        value={formState[sectionIndex][index].value}
                        required={formField.required}
                        fieldIndex={index}
                      />
                      <CErrorMessage>
                        {!formState[sectionIndex][index].isUntouched &&
                          formState[sectionIndex][index].errorMessage}
                      </CErrorMessage>
                    </React.Fragment>
                  )
                }
                return (
                  <React.Fragment key={"c-form-field-" + index}>
                    <CInputRadioGroup
                      name={formField.name}
                      value={formState[sectionIndex][index].value}
                      required={formField.required}
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
