import React, {useContext, useEffect} from "react";
import {CountryStore} from "../../Store";

import styled, {ThemeContext} from "styled-components";
import {Helmet} from "react-helmet-async";

const AboutStyled = styled.section`
  user-select: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
  background-color: ${({theme}) => theme.body.background};
  font-size: 1.5rem;
  font-family: 'Titillium Web', sans-serif;
  text-align: center;

  .attr {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    margin-top: 2rem;
    font-size: 0.9rem;
    position: relative;


    .about {
      padding: 0;
      margin: 0;
      position: absolute;
      z-index: 99;
      color: white;
      font-weight: 600;
      text-shadow: 0 3px 10px black;
      overflow: hidden;

      .repo {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        opacity: 0;
        animation-delay: 0.8s;
        animation-duration: 1s;
        animation-fill-mode: forwards;
        animation-timing-function: cubic-bezier(0.25, 0.7, 0.15, 1);
        animation-iteration-count: 1;
        animation-direction: normal;
        animation-play-state: running;
        animation-name: fadeIn;

        svg {
          padding-left: 0.5rem;
          transition: all 1.8s cubic-bezier(0.25, 0.7, 0.15, 1);

          &:hover {
            cursor: pointer;
            transform: scale(1.1);

            path {
              fill: ${({theme}) => theme.body.background};
            }
          }
        }
      }

      h1 {
        font-size: 1.6rem;
        animation: fadeIn 1.0s cubic-bezier(0.25, 0.7, 0.15, 1) forwards;
      }

      @keyframes fadeIn {
        0% {
          transform: translateX(-100%);
          opacity: 0;
        }
        70% {
          opacity: 0.6;
        }
        100% {
          transform: translateX(0%);

          opacity: 1;
        }
      }

      h2 {
        font-size: 1.3rem;
      }
    }


    .container {
      //margin-bottom: 1rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      //padding: 0.5rem;
      width: 60%;
      height: 100%;

      .image__container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        position: relative;
        z-index: 12;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          position: absolute;
          top: 0;
          left: 0;
          filter: contrast(68%) brightness(90%);
          opacity: 1.0;

          //transition: all 0.3s ease-in-out;
          box-shadow: 0px 0px 20px 5px rgba(167, 134, 197, 0.3);
        }
      }

      .legend {
        display: flex;
        flex-direction: row;
        position: relative;
        align-self: flex-end;

        a {
          text-decoration: none;
          color: ${({theme}) => theme.colors.orange_bar};

          &:hover {
            text-shadow: 0 0 10px ${({theme}) => theme.colors.orange_bar};

          }
        }
      }

    }


  }

`;

export const About = () => {

    const context = useContext(CountryStore);
    const {invertTheme, colors} = React.useContext(ThemeContext)
    const isBlackThemeActive = colors.primary === 'black'

    useEffect(() => {
        context.setHomePage(false)
    }, [context])

    return (<AboutStyled className="about">
        <Helmet>
            <meta charSet="utf-8" />
            <title>About</title>
        </Helmet>
        <div className={"attr"}>
            <div className={"about"}>
                <h1>Written and Design by Jorge Clavijo</h1>
                <div className={"repo"}>
                    <h2>Repository: </h2>
                    <svg
                        className={"logo__svg"}
                        height="35"
                        viewBox="0 0 16 16"
                        version="1.1" width="35" data-view-component="true"
                        onClick={() => window.open(
                            "https://github.com/jym272/kimche-dev-challenge",
                            "_blank")}
                    >
                        <path fill="currentColor"
                              d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
                    </svg>
                </div>
            </div>
            <div className={"container"}>
                <div className={"image__container"}>
                    {isBlackThemeActive ?
                     <img src="/rogerDean.jpeg" alt="rogerDean"/> :
                     <img src="/rogerDeanLight.jpg" alt="rogerDean"/>
                    }

                </div>
                <div className={"legend"}>
                    <span>{"poster by:"}</span>
                    <a href="https://www.rogerdean.com/" target="_blank"
                       rel="noopener noreferrer">
                        &nbsp;Roger Dean
                    </a>
                </div>
            </div>
        </div>
    </AboutStyled>)

}