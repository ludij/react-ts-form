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
  pattern?: string
  options?: CFormFieldOptions[]
  label?: string
}

interface CFormSection {
  title: string
  fields: CFormField[]
}

interface CFormState {
  value: string
  defaultInvalidMessage?: string
}

interface CFormProps {
  formSections: CFormSection[]
  formState: CFormState[][]
  sectionToShow: number
}

interface extendedFormState extends CFormState {
  errorMessage: string
  isPristine: boolean
  isUntouched: boolean
  isRequired: boolean
}

const CForm = (props: CFormProps) => {
  const extendFormState = (
    formState: CFormState[][]
  ): extendedFormState[][] => {
    return formState.map((formSection, sectionIndex) =>
      formSection.map((formField, fieldIndex) => {
        const extendedFormField = {
          ...formField,
          errorMessage: "",
          isPristine: true,
          isUntouched: true,
          isRequired:
            props.formSections[sectionIndex].fields[fieldIndex].required ||
            false,
        }
        return extendedFormField
      })
    )
  }

  const [sectionToShow, setSectionToShow] = useState(props.sectionToShow || 0)
  const [formState, setFormState] = useState(extendFormState(props.formState))

  const updateFormState = (event: any, sectionIndex: number): void => {
    event.persist()
    const fieldIndex = event.target.getAttribute("data-field-index")
    const value = event.target.value
    const validity = event.target.validity

    let newValue = value
    if (event.type === "change") {
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
      newErrorMessage =
        formState[sectionIndex][fieldIndex].defaultInvalidMessage ||
        "This field is not valid yet"
      if (validity.valueMissing) {
        newErrorMessage = "This field is required"
      }
    }

    const updatedFormState = [...formState]
    const fieldToUpdate = updatedFormState[sectionIndex][fieldIndex]

    if (event.type === "blur" && fieldToUpdate.isUntouched) {
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

  const isButtonDisabled = (): boolean => {
    const someMissing = formState[sectionToShow].some(
      (formField) =>
        (formField.isPristine || !formField.value.length) &&
        formField.isRequired
    )
    if (someMissing) {
      return someMissing
    }
    const someErrorMessageLenght = formState[sectionToShow].some(
      (formField) => formField.errorMessage.length
    )
    return someErrorMessageLenght
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
                        pattern={formField.pattern}
                        fieldIndex={index}
                      />
                      <CErrorMessage
                        dangerouslySetInnerHTML={{
                          __html:
                            (!formState[sectionIndex][index].isUntouched &&
                              formState[sectionIndex][index].errorMessage) ||
                            "",
                        }}
                      />
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
                    <CErrorMessage
                      dangerouslySetInnerHTML={{
                        __html:
                          (!formState[sectionIndex][index].isUntouched &&
                            formState[sectionIndex][index].errorMessage) ||
                          "",
                      }}
                    />
                  </React.Fragment>
                )
              })}
            </div>
          )
        }
        return null
      })}
      <button
        disabled={isButtonDisabled()}
        type="button"
        onClick={() => setSectionToShow(sectionToShow + 1)}
      >
        next
      </button>
    </React.Fragment>
  )
}

export default CForm
