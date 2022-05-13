import MainNavigation from "./MainNavigation";
import styled from "styled-components";
import {CountryStore} from "../Store";
import {useContext} from "react";

const FooterStyled = styled.footer`
  background-color: ${props => props.theme.colors.orange_bar};
  position: relative;
  height: 3rem;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  user-select: none;
  color: #ffffff;
  white-space: nowrap; //TODO: fix for mobile site 
  
  span:first-of-type{
    padding-left: 3rem;
  }
  span:last-of-type{
    padding-right: 3rem;
  }

  span {
    font-weight: 300;

  }
  div{
    display: flex;
    justify-content: center;
    align-items: center;
    
    span:first-of-type{
      padding-right: 0.6rem;
    }
    svg:first-of-type {
      transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
      &:hover{
        cursor: pointer;
        transform: scale(1.2);
      }
    }
    
    svg +svg{
      margin-left: 1rem;
    }
    span:last-of-type{
      padding-left: 0.6rem;
    }
  }
  .email{
    padding-left: 5px;
    user-select: text;
  }

`;

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
        {!isFrontPage && <FooterStyled>
            <span>kimchedevchallenge.com - 2022 </span>
            <div>
                <span>design by: Jorge Clavijo </span>
                <svg
                    className={"linkedin__logo__svg"}
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    onClick = {() => window.open("https://www.linkedin.com/in/jym272/", "_blank")}
                >
                    <path
                        fill="currentColor"
                        d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                    />
                </svg>
                <svg
                    className={"email__logo__svg"}
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                >
                    <path
                        fill="currentColor"
                        d="M12 12.713l-11.985-9.713h23.971l-11.986 9.713zm0 2.574l-12-9.725v15.438h24v-15.438l-12 9.725z"
                    />
                </svg>
                <span className={"email"}>jym272@gmail.com</span>
            </div>

        </FooterStyled>}
    </>
}
export default Layout;