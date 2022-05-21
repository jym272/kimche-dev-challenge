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
      z-index: 3;
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
        animation-delay: 2.0s;
        animation-duration: 1.5s;
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
        opacity: 0;
        animation: fadeIn 1.0s cubic-bezier(0.25, 0.7, 0.15, 1) forwards 1.3s;
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

      .add__hover,
      .image__container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        position: relative;
        overflow: hidden;
        transition: all 1.8s cubic-bezier(0.25, 0.7, 0.15, 1);

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
          animation: enteringImage 1.3s cubic-bezier(0.25, 0.7, 0.15, 1) forwards;
        }


        @keyframes enteringImage {
          0% {
            transform: translateY(100%);
            opacity: 0;

          }
          100% {
            transform: translateY(0%);
            opacity: 1;
          }
        }
      }

      .add__hover {
        &:hover {
            box-shadow: ${({theme}) => theme.about.boxShadow};
        }
      }

      .legend {
        display: flex;
        margin-top: 0.5rem;
        flex-direction: row;
        position: relative;
        align-self: flex-end;
        transform: scale(0.0);
        animation: popUp 1.3s ease-in forwards 2800ms;

        a {
          text-decoration: none;
          color: ${({theme}) => theme.colors.orange_bar};

          &:hover {
            text-shadow: 0 0 10px ${({theme}) => theme.colors.orange_bar};

          }
        }
      }

      @keyframes popUp {
        0% {
          transform: scale(0.5);
          opacity: 0.0;
        }
        80% {
          transform: scale(1.05);
        }
        100% {
          opacity: 1.0;
          transform: scale(1.0);
        }
      }

    }


  }

`;

export const About = () => {

    const context = useContext(CountryStore);
    const {invertTheme, colors} = React.useContext(ThemeContext)
    const isBlackThemeActive = colors.primary === 'black'
    const [hoverStyle, setHoverStyle] = React.useState("")

    useEffect(() => {
        context.setHomePage(false)
    }, [context])


    useEffect(() => {
        /* Store the element in el */
        let el = document.getElementById('image')

        /* Get the height and width of the element */
        const height = el.clientHeight
        const width = el.clientWidth

        const multiplier = 18
        const perspective = 5000

        /*
          * Add a listener for mousemove event
          * Which will trigger function 'handleMove'
          * On mousemove
          */

        /* Define function a */
        function handleMove(e) {
            /*
              * Get position of mouse cursor
              * With respect to the element
              * On mouseover
              */
            /* Store the x position */
            const xVal = e.layerX
            /* Store the y position */
            const yVal = e.layerY

            /*
              * Calculate rotation valuee along the Y-axis
              * Here the multiplier 20 is to
              * Control the rotation
              * You can change the value and see the results
              */

            const yRotation = multiplier * ((xVal - width / 2) / width)

            /* Calculate the rotation along the X-axis */
            const xRotation = -multiplier * ((yVal - height / 2) / height)

            /* Generate string for CSS transform property */
            const string = `perspective(${perspective}px) scale(1.05) rotateX(` + xRotation +
                           'deg) rotateY(' +
                           yRotation + 'deg)'

            /* Apply the calculated transformation */
            el.style.transform = string
        }

        const listenerOut = () => {
            el.style.transform = `perspective(${perspective}px) scale(1) rotateX(0) rotateY(0)`
        }
        const listenerDown = () => {
            el.style.transform = `perspective(${perspective}px) scale(0.95) rotateX(0) rotateY(0)`

        }
        const listenerUp = () => {
            el.style.transform = `perspective(${perspective}px) scale(1.05) rotateX(0) rotateY(0)`

        }
        let timer = null
        timer = setTimeout(() => {
            el.addEventListener('mousemove', handleMove)
            /* Add listener for mouseout event, remove the rotation */
            el.addEventListener('mouseout', listenerOut)

            /* Add listener for mousedown event, to simulate click */
            el.addEventListener('mousedown', listenerDown)

            /* Add listener for mouseup, simulate release of mouse click */
            el.addEventListener('mouseup', listenerUp)
            setHoverStyle("add__hover")

        }, 2800)


        return () => {
            el.removeEventListener('mousemove', handleMove)
            el.removeEventListener('mouseout', listenerOut)
            el.removeEventListener('mousedown', listenerDown)
            el.removeEventListener('mouseup', listenerUp)
            clearTimeout(timer)
        }
    }, [])

    return (<AboutStyled className="about">
        <Helmet>
            <meta charSet="utf-8"/>
            <title>About</title>
        </Helmet>
        <div className={"attr"}>
            <div className={"about"}>
                <h1>Written and Designed by Jorge Clavijo</h1>
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
                <div id={"image"} className={`image__container ${hoverStyle}`}>
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