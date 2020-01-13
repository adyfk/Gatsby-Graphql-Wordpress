import React from "react"
import MainMenu from "./MainMenu"
import styled, { createGlobalStyle } from 'styled-components'

const GlobalStyled = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Lato|Montserrat|Open+Sans|Oswald|Raleway|Roboto&display=swap');
  
  body, html{
    margin:0 !important;
    padding:0 !important;
    font-family:'Open-Sans',sans-serif;
  }
`
const LayoutWrapper = styled.div`
  max-width:960px;
  margin:0 auto;
`
const Layout = ({ children }) => {
  return (
    <>
      <GlobalStyled />
      <MainMenu />
      <LayoutWrapper>
        {children}
      </LayoutWrapper>
    </>
  )
}

export default Layout
