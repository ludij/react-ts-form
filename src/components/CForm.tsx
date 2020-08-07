import React from "react"
import styled from "@emotion/styled/macro"

const CLabel = styled.label(`
    display: block;
    margin-top: 5px;
    font-family: Arial;
    font-size: 10px;
`)

const CInputField = styled.input(`
    display: block;
    margin-top: 5px;
    padding: 15px;
    background-color: #f0f0f0;
    border: none;
    border-radius: 5px;
`)

const CErrorMessage = styled.p(`
    margin: 10px 5px;
    color: darkred;
    font-family: Arial;
`)

type CFormProps = {
  formFields: {
    type: string
    label: string
    name: string
    value: string
    options?: {
        label: string
        name: string
        value: string
    }[]
  }[]
}

const CForm = ({ formFields }: CFormProps) => {
  return (
    <React.Fragment>
      {formFields.map((formField) => {
        switch (formField.type) {
          case "text":
            return (
              <React.Fragment>
                <CLabel id={formField.name}>{formField.label}</CLabel>
                <CInputField
                  type={formField.type}
                  value={formField.value}
                  name={formField.name}
                />
                <CErrorMessage>Error</CErrorMessage>
              </React.Fragment>
            )
          case "radio":
            return (
              <React.Fragment>
                <div>RADIO</div>
              </React.Fragment>
            )
          default:
            return null
        }
      })}
    </React.Fragment>
  )
}

export default CForm
