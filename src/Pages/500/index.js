import styled from "styled-components";
import {createRef} from "react";

const NotFoundStyled = styled.div`
  position: absolute;
  user-select: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  background-color: white;
  color: #151515;
  font-size: 1.5rem;
  font-family: 'Titillium Web', sans-serif;
  text-align: center;

  .attr {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 90%;
    margin-top: 2rem;
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
      height: 100%;

      .image__container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        position: relative;

        img {
          border-radius: 3%;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          position: absolute;
          top: 0;
          left: 0;
          transition: all 0.3s ease-in-out;
          &:hover {
            cursor: pointer;
          }

        }
      }

      .legend {
        display: flex;
        flex-direction: row;
        position: relative;
        align-self: flex-end;

        a {
          text-decoration: none;
          color: #E97C57;

          &:hover {
            text-shadow: 0 0 10px #E97C57;

          }
        }
      }

    }


  }

`;

export const ServerError = () => {
    const refImage = createRef();
    const returnToHomeHandler = () => {
        window.location.href = "/";
    }

    return (
        <NotFoundStyled>
            <div className={"attr"}>
                <h1 >not ok, try again later..</h1>
                <div>
                    <div className={"image__container"}>
                        <img ref={refImage}  onClick={returnToHomeHandler} src="/serverError.jpg" alt="404"/>
                    </div>
                    <div className={"legend"}>
                        <span>{"poster by:"}</span>
                        <a href="https://dribbble.com/SepidehMirtaleby" target="_blank"
                           rel="noopener noreferrer">
                            &nbsp;Sepideh Mirtalebi
                        </a>
                    </div>
                </div>
            </div>
        </NotFoundStyled>
    )

}
