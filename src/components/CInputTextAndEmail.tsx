import React, { useState } from "react"
import CLabel from "./CLabel"
import CInputField from "./CInputField"

interface CInputProps {
  type: string
  label: string
  name: string
  value?: string
  fieldIndex: number
}

const CInputTextAndEmail = (props : CInputProps) => {
    const [fieldValue, setFieldValue] = useState(props.value || "")

    return (
      <React.Fragment>
        <CLabel id={props.name}>{props.label}</CLabel>
        <CInputField
          type={props.type}
          value={fieldValue}
          name={props.name}
          data-field-index={props.fieldIndex}
          onChange={event => setFieldValue(event.target.value)}
        />
      </React.Fragment>
    )
}

export default CInputTextAndEmail
