import styled from "@emotion/styled/macro"

const CInputRadioWrapper = styled.div(`
    display: flex;

    & + & {
      margin-top: 10px;
    }
`)

export default CInputRadioWrapper
