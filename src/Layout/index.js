import MainNavigation from "./MainNavigation";
import styled from "styled-components";
import {CountryStore} from "../Store";
import {useContext} from "react";
import {Footer} from "../components";



const MainStyled = styled.main`
  margin: 0 auto;
  padding: 0;
  min-height: calc(100vh - 3.5rem - ${props => props.footerHeight});
`;


const Layout = props => {
    const context = useContext(CountryStore)
    const isFrontPage = context.isHomePage;
    const footerHeight = isFrontPage ? "0" : "3rem";


    return <>
        <MainNavigation/>
        <MainStyled footerHeight={footerHeight}>
            {props.children}
        </MainStyled>
        {!isFrontPage && <Footer/>}
    </>
}
export default Layout;