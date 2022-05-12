import MainNavigation from "./MainNavigation";
import styled from "styled-components";

const FooterStyled = styled.footer`
  background-color: #fafafa;
  position: relative;
  //bottom: 0;
  padding: 20px;
  
  margin-top: 1rem;
  text-align: center;
  font-size: 0.8rem;
  color: #666;
`;

const MainStyled = styled.main`
  //margin-top: 1rem;
  //padding: 20px;
  min-height: calc(100vh - 3.5rem);
  //background-color: #fff;
  //box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
`;


const Layout = props => {
    return <>
        <MainNavigation/>
        <MainStyled>
            {props.children}
        </MainStyled>
        {/*<FooterStyled/>*/}
    </>
}
export default Layout;