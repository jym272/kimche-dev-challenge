import {useNavigate} from "react-router-dom";
import styled, {ThemeContext} from "styled-components";
import React, {useContext} from "react";
import {CountryStore} from "../../Store";

const OrangeBar = styled.div`
  background-color: ${({theme}) => theme.colors.orange_bar};
  padding: 0;
  margin: 0;
  height: 0.2rem; //0.2 rem +
  width: 100%;
`;


const NavigationStyled = styled.nav`
  margin: 0;
  padding: 0;

  .toggle__theme {
    display: flex;
    align-items: center;
    padding: 0.4rem; //hover effect
    transition: all 0.2s ease-in-out;
    transform: translateX(-14px); //center

    &:hover {
      cursor: pointer;
      background-color: ${props => props.active ? "rgba(234, 234, 234, 0.3)" :
                                   "rgba(234, 234, 234, 0.9)"};
      border-radius: 50%;
    }

  }

  nav ul {
    background: ${({theme}) => theme.body.background};
    //background: white;
    height: 3rem; // + 3rem +
    margin: 0 auto;
    padding-top: 0.3rem; //0.3rem -> total height of header = 3.5rem
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: center;

    li + li {
      margin-left: 5.5rem;
    }

    li {
      list-style: none;

      a {
        user-select: none;
        text-decoration: none;
      }
    }
  }
`;


// <li>
//     <NavLink style={({isActive}) =>
//         (isActive ? {color: 'red'} : {color: 'blue'})}
//              to="/search">Search</NavLink>
// </li>

const MainNavigation = props => {
    const {invertTheme, colors} = React.useContext(ThemeContext)
    const isBlackThemeActive = colors.primary === 'black'
    const navigate = useNavigate()
    const context = useContext(CountryStore)
    const isFrontPage = context.isHomePage;


    return <NavigationStyled active={isBlackThemeActive}>
        <header>
            <OrangeBar/>
            <nav>
                <ul>

                    {!isFrontPage &&
                     <li>
                         <div className={"toggle__theme"}>
                             <svg onClick={() => {navigate("search/")}}
                                  viewBox="0 0 576 512" width="30">
                                 <path
                                     fill="currentColor"
                                     d="M280.37 148.26L96 300.11V464a16 16 0 0 0 16 16l112.06-.29a16 16 0 0 0 15.92-16V368a16 16 0 0 1 16-16h64a16 16 0 0 1 16 16v95.64a16 16 0 0 0 16 16.05L464 480a16 16 0 0 0 16-16V300L295.67 148.26a12.19 12.19 0 0 0-15.3 0zM571.6 251.47L488 182.56V44.05a12 12 0 0 0-12-12h-56a12 12 0 0 0-12 12v72.61L318.47 43a48 48 0 0 0-61 0L4.34 251.47a12 12 0 0 0-1.6 16.9l25.5 31A12 12 0 0 0 45.15 301l235.22-193.74a12.19 12.19 0 0 1 15.3 0L530.9 301a12 12 0 0 0 16.9-1.6l25.5-31a12 12 0 0 0-1.7-16.93z"/>
                             </svg>
                         </div>
                     </li>


                    }

                    <li>
                        <div className={"toggle__theme"}>
                            {isBlackThemeActive ?

                             <svg onClick={() => {invertTheme()}}
                                  viewBox="0 0 24 24" width="30">
                                 <path fill="currentColor"
                                       d="M9.37,5.51C9.19,6.15,9.1,6.82,9.1,7.5c0,4.08,3.32,7.4,7.4,7.4c0.68,0,1.35-0.09,1.99-0.27C17.45,17.19,14.93,19,12,19 c-3.86,0-7-3.14-7-7C5,9.07,6.81,6.55,9.37,5.51z M12,3c-4.97,0-9,4.03-9,9s4.03,9,9,9s9-4.03,9-9c0-0.46-0.04-0.92-0.1-1.36 c-0.98,1.37-2.58,2.26-4.4,2.26c-2.98,0-5.4-2.42-5.4-5.4c0-1.81,0.89-3.42,2.26-4.4C12.92,3.04,12.46,3,12,3L12,3z"/>
                             </svg> :

                             <svg onClick={() => {invertTheme()}}
                                  viewBox="0 0 24 24" width="24" height="24">
                                 <path fill="currentColor"
                                       d="M12,9c1.65,0,3,1.35,3,3s-1.35,3-3,3s-3-1.35-3-3S10.35,9,12,9 M12,7c-2.76,0-5,2.24-5,5s2.24,5,5,5s5-2.24,5-5 S14.76,7,12,7L12,7z M2,13l2,0c0.55,0,1-0.45,1-1s-0.45-1-1-1l-2,0c-0.55,0-1,0.45-1,1S1.45,13,2,13z M20,13l2,0c0.55,0,1-0.45,1-1 s-0.45-1-1-1l-2,0c-0.55,0-1,0.45-1,1S19.45,13,20,13z M11,2v2c0,0.55,0.45,1,1,1s1-0.45,1-1V2c0-0.55-0.45-1-1-1S11,1.45,11,2z M11,20v2c0,0.55,0.45,1,1,1s1-0.45,1-1v-2c0-0.55-0.45-1-1-1C11.45,19,11,19.45,11,20z M5.99,4.58c-0.39-0.39-1.03-0.39-1.41,0 c-0.39,0.39-0.39,1.03,0,1.41l1.06,1.06c0.39,0.39,1.03,0.39,1.41,0s0.39-1.03,0-1.41L5.99,4.58z M18.36,16.95 c-0.39-0.39-1.03-0.39-1.41,0c-0.39,0.39-0.39,1.03,0,1.41l1.06,1.06c0.39,0.39,1.03,0.39,1.41,0c0.39-0.39,0.39-1.03,0-1.41 L18.36,16.95z M19.42,5.99c0.39-0.39,0.39-1.03,0-1.41c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06c-0.39,0.39-0.39,1.03,0,1.41 s1.03,0.39,1.41,0L19.42,5.99z M7.05,18.36c0.39-0.39,0.39-1.03,0-1.41c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06 c-0.39,0.39-0.39,1.03,0,1.41s1.03,0.39,1.41,0L7.05,18.36z"/>
                             </svg>}
                        </div>
                    </li>
                </ul>
            </nav>
        </header>
    </NavigationStyled>
}
export default MainNavigation;