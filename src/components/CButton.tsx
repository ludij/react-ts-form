import styled from "@emotion/styled/macro"

const CButton = styled.button(`
    display: block;
    margin: 5px 0 0;
    padding: 0 5px;
    font-family: Arial;
    font-size: 25px;
    border: none;
    background: white;
    cursor: pointer;

    &[disabled] {
        cursor: not-allowed;
    }
`)

export default CButton
