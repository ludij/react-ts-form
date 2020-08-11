import React, { useState } from "react"
import CLabel from "./CLabel"
import CInputRadioWrapper from "./CInputRadioWrapper"
import CInputField from "./CInputField"

interface CFormFieldOptions {
  label: string
  value: string
}

interface CInputRadioGroupProps {
  value: string
  name: string
  options: CFormFieldOptions[]
  required?: boolean
  fieldIndex: number
}

const CInputRadioGroup = (props: CInputRadioGroupProps) => {
  const [value, setValue] = useState(props.value)

  return (
    <React.Fragment>
      {props.options.map((option, index) => {
        return (
          <CInputRadioWrapper key={index}>
            <CInputField
              type="radio"
              value={option.value}
              name={props.name}
              checked={option.label === value}
              required={props.required}
              data-field-index={props.fieldIndex}
              onChange={(event) => event.target.value && setValue(option.label)}
            />
            <CLabel id={props.name}>{option.label}</CLabel>
          </CInputRadioWrapper>
        )
      })}
    </React.Fragment>
  )
}

export default CInputRadioGroup
