import React from 'react'
import styled from 'styled-components'

const StyledHeader = styled.div`
  height: 20%;
  background: red;
`

const Header = () => {
  return(
    <StyledHeader>
      <h1>Header</h1>
    </StyledHeader>
  )
}

export default Header