import React, { useState } from "react"
import CLabel from "./CLabel"
import CInputField from "./CInputField"

interface CFormFieldOptions {
  label: string
  value: string
}

interface CInputRadioGroupProps {
  name: string
  value: string
  options: CFormFieldOptions[]
  fieldIndex: number
}

const CInputRadioGroup = (props: CInputRadioGroupProps) => {
  const [value, setValue] = useState(props.value)

  return (
    <React.Fragment>
      {props.options.map((option, index) => {
        return (
          <React.Fragment key={index}>
            <CInputField
              type="radio"
              value={option.value}
              name={props.name}
              checked={option.label === value}
              data-field-index={props.fieldIndex}
              onChange={(event) =>
                event.target.value ? setValue(option.label) : null
              }
            />
            <CLabel id={props.name}>{option.label}</CLabel>
          </React.Fragment>
        )
      })}
    </React.Fragment>
  )
}

export default CInputRadioGroup
