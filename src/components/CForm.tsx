import React, { useState } from "react"
import CInputText from "./CInputText"
import CInputRadioGroup from "./CInputRadioGroup"
import CErrorMessage from "./CErrorMessage"

interface CFormFieldOptions {
  label: string
  value: string
}

interface CFormField {
  type: string
  label?: string
  name: string
  value: string
  options?: CFormFieldOptions[]
}

interface CFormProps {
  formSections: {
    title?: string
    fields: CFormField[]
  }[]
  sectionToShow: number
}

const CForm = (props: CFormProps) => {
  const [sectionToShow, setSectionToShow] = useState(props.sectionToShow || 0)

  return (
    <React.Fragment>
      {props.formSections.map((section, sectionIndex) => {
        if (sectionToShow === sectionIndex) {
          return (
            <div key={sectionIndex}>
              {section.title ? <h2>{section.title}</h2> : null}
              {section.fields.map((formField, index) => {
                switch (formField.type) {
                  case "text":
                    return (
                      <React.Fragment key={"c-form-field-" + index}>
                        <CInputText
                          type={formField.type}
                          label={formField.label || ""}
                          name={formField.name}
                          value={formField.value}
                        />
                        <CErrorMessage>Error</CErrorMessage>
                      </React.Fragment>
                    )
                  case "radioGroup":
                    return (
                      <React.Fragment key={"c-form-field-" + index}>
                        <CInputRadioGroup
                          name={formField.name}
                          value={formField.value}
                          options={formField.options || []}
                        />
                      </React.Fragment>
                    )
                  default:
                    return null
                }
              })}
            </div>
          )
        }
        return null
      })}

      {sectionToShow === props.formSections.length ? (
        <p>submit</p>
      ) : (
        <button
          type="button"
          onClick={() => setSectionToShow(sectionToShow + 1)}
        >
          next
        </button>
      )}
    </React.Fragment>
  )
}

export default CForm
