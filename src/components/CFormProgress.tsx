import React from "react"
import styled from "@emotion/styled/macro"

interface CFormProgressProps {
  max: number
  value: number
}

const CFormProgressBar = styled.div(`
  height: 10px;
  flex: 1 1 100%;
  display: flex;
`)

const CProgressPart = styled.div(`
  background: rgb(200, 200, 200);
  height: 10px;
  flex: 1 1 auto;
  border-radius: 3px;

  & + & {
    margin-left: 5px;
  }
`)

const CFormProgress = (props : CFormProgressProps) => {
  return (
    <CFormProgressBar>
      {[...Array(props.max)].map((n, index) => {
        return (
          <CProgressPart
            key={'progress' + index}
            style={{background: props.value <= index ? "linear-gradient(230deg, rgba(240, 240, 240, 1) 0%, rgba(245, 245, 245, 1) 70%, rgba(242, 242, 242, 1) 100%)" : undefined}}
          />
        )
      })}
    </CFormProgressBar>
  )
}

export default CFormProgress