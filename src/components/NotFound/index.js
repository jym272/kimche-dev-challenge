import styled from "styled-components";
import {createRef} from "react";

const NotFoundStyled = styled.div`
  user-select: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 70vh;
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
    font-size: 0.9rem;
    position: relative;
    h1 {
      font-size: 1.5rem;
      font-weight: 300;
      text-align: center;
      padding: 0;
      margin: 0;
    }

    div:first-of-type {
      //margin-bottom: 1rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      //padding: 0.5rem;
      width: 60%;
      height: 80%;
      .image__cotainer{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        position: relative;
        img {
          border-radius:3%;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          position: absolute;
          top: 0;
          left: 0;
          transition: all 0.3s ease-in-out;
          &:hover {
            opacity: 0.9;
            animation: increase-borders 5.0s ease-in-out forwards;
            cursor: pointer;
          }
          @keyframes increase-borders {
            0% {
              border-radius: 3%;
            }
            100% {
              border-radius: 10%;
            }
          }
        }
      }
      .legend {
        display: flex;
        flex-direction: row;
        position: relative;
        align-self: flex-end;
        a{
          text-decoration: none;
          color:  ${({theme}) => theme.colors.orange_bar};
          &:hover {
            text-shadow: 0 0 10px ${({theme}) => theme.colors.orange_bar};
            
          }
        }
      }

    }


  }

`;

export const NotFound = () => {
    const refImage = createRef();

    const rickRolledHandler = () => {
        window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
    }
    const returnToHomeHandler = () => {
        window.location.href = "/";
    }

    const addStyleToImgElementHandler = () => {
        refImage.current.style.opacity = 0.9;
        refImage.current.style.animation = "increase-borders 5.0s ease-in-out forwards";
    }

    return (
        <NotFoundStyled>
            <div className={"attr"}>
                <h1 onClick={rickRolledHandler}>not Found, but is ok..</h1>
                <div>
                    <div className={"image__cotainer"}>
                        <img ref={refImage} onMouseEnter={addStyleToImgElementHandler} onClick={returnToHomeHandler} src="/notFound.jpg" alt="404"/>
                    </div>
                    <div className={"legend"}>
                        <span>{"design by:"}</span>
                        <a href="https://odama.io/" target="_blank"
                           rel="noopener noreferrer">
                            &nbsp;Odama Team
                        </a>
                    </div>
                </div>
            </div>
        </NotFoundStyled>
    )

}
