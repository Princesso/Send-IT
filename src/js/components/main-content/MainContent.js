import React from 'react'
import styled from 'styled-components'

const StyledMainContent = styled.div`
  height: 20%;
  background: red;
`

const MainContent = () => {
  return(
    <StyledMainContent>
      <h1>MainContent</h1>
    </StyledMainContent>
  )
}

export default MainContent