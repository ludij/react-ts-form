import styled from "@emotion/styled/macro"

const CInputField = styled.input(`
    display: block;
    margin-top: 5px;
    padding: 15px;
    background: rgb(240, 240, 240);
    background: linear-gradient(
        230deg,
        rgba(240, 240, 240, 1) 0%,
        rgba(245, 245, 245, 1) 70%,
        rgba(242, 242, 242, 1) 100%
    );
    border: none;
    border-radius: 5px;
`)

export default CInputField
