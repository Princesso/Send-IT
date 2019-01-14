import React from 'react'
import styled from 'styled-components'

const StyledFooter = styled.div`
  height: 20%;
  background: red;
`

const Footer = () => {
  return(
    <StyledFooter>
      <h1>Footer</h1>
    </StyledFooter>
  )
}

export default Footer