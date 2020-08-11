import React, { useState } from "react"
import CFormSection from "./CFormSection"
import CInputTextAndEmail from "./CInputTextAndEmail"
import CInputRadioGroup from "./CInputRadioGroup"
import CErrorMessage from "./CErrorMessage"
import CFooter from "./CFooter"
import CFormProgress from "./CFormProgress"
import CButton from "./CButton"

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
    return
  }

  const isPreviousButtonDisabled = (): boolean => {
    return sectionToShow < 1
  }

  const isNextButtonDisabled = (): boolean => {
    if (sectionToShow >= props.formSections.length) {
      return true
    }
    const someMissing = formState[sectionToShow].some(
      (formField) =>
        (formField.isPristine || !formField.value.length) &&
        formField.isRequired
    )
    if (someMissing) {
      return someMissing
    }
    const someErrorMessageLength = formState[sectionToShow].some(
      (formField) => formField.errorMessage.length
    )
    return someErrorMessageLength
  }

  const [sectionToShow, setSectionToShow] = useState(props.sectionToShow || 0)
  const [formState, setFormState] = useState(extendFormState(props.formState))

  const footer = (
    <CFooter>
      <CFormProgress
        value={sectionToShow + 1}
        max={props.formSections.length + 1}
      />
      <CButton
        disabled={isPreviousButtonDisabled()}
        type="button"
        onClick={() => setSectionToShow(sectionToShow - 1)}
      >
        ⭠
      </CButton>
      <p>
        {sectionToShow + 1} of {props.formSections.length + 1}
      </p>
      <CButton
        disabled={isNextButtonDisabled()}
        type="button"
        onClick={() => setSectionToShow(sectionToShow + 1)}
      >
        ⭢
      </CButton>
    </CFooter>
  )

  const formSummary = (
    <React.Fragment>
      {formState.map((section, index) => (
        <React.Fragment key={index}>
          <p>
            {props.formSections[index].title} <br />
            {section.map((field, fieldIndex) => (
                <React.Fragment key={"field" + fieldIndex}>
                  {field.value}
                  {fieldIndex < section.length && field.value.length ? <br /> : null}
                </React.Fragment>
              )
            )}
          </p>
        </React.Fragment>
      ))}
      <p>submit</p>
      {footer}
    </React.Fragment>
  )

  const formSection = (
    <React.Fragment>
      {props.formSections.map((section, sectionIndex) => {
        if (sectionToShow === sectionIndex) {
          return (
            <CFormSection
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
            </CFormSection>
          )
        }
        return null
      })}
      {footer}
    </React.Fragment>
  )

  return sectionToShow === props.formSections.length ? formSummary : formSection
}

export default CForm
