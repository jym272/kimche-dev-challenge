import styled from "styled-components";
import {Helmet} from "react-helmet-async";
import React from "react";

const NotFoundStyled = styled.div`
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

    h1 {
      font-size: 1.5rem;
      font-weight: 300;
      text-align: center;
      padding: 0;
      margin: 0px 0px 30px 0;
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
        overflow: hidden;


        img {
          border-radius: 5% 5% 0 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          position: absolute;
          top: 0;
          left: 0;
          transition: all 0.8s ease-out;
        }

        .go__to__home__appear,
        .go__to__home {
          position: absolute;
          z-index: 2;
          bottom: 0;
          width: 99%;
          height: 20%;
          border-radius: 30% 30% 0 0;
          background: rgba(255, 255, 255, 0.09);
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
          backdrop-filter: blur(5px);
          -webkit-backdrop-filter: blur(5px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          transform: translateY(100%);
          transition: all 0.8s ease-out;
          svg{
            cursor: pointer;
            transition: all 0.3s ease-out;
            &:hover{
              transform: scale(1.2);
            }

          }
        }
        
        .go__to__home__appear{
          transform: translateY(0%);
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

export const NotFound = () => {
    const rickRolledHandler = () => {
        window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
    }

    const [goToHomeStyled, setGoToHomeStyled] = React.useState("go__to__home");


    return (
        <NotFoundStyled>
            <Helmet>
                <meta charSet="utf-8"/>
                <title>404</title>
            </Helmet>
            <div className={"attr"}>
                <h1 onClick={rickRolledHandler}>not Found, but is ok..</h1>
                <div>
                    <div  onMouseEnter={()=>{setGoToHomeStyled("go__to__home__appear")}} onMouseLeave={()=>{setGoToHomeStyled("go__to__home")}} className={"image__container"}>
                        <img  src="/notFound.jpg" alt="404"/>
                        <div className={goToHomeStyled}>
                            <svg
                                onClick={() => {window.location.href = "/"}}
                                viewBox="0 0 576 512" width="80">
                                <path
                                    fill="currentColor"
                                    d="M280.37 148.26L96 300.11V464a16 16 0 0 0 16 16l112.06-.29a16 16 0 0 0 15.92-16V368a16 16 0 0 1 16-16h64a16 16 0 0 1 16 16v95.64a16 16 0 0 0 16 16.05L464 480a16 16 0 0 0 16-16V300L295.67 148.26a12.19 12.19 0 0 0-15.3 0zM571.6 251.47L488 182.56V44.05a12 12 0 0 0-12-12h-56a12 12 0 0 0-12 12v72.61L318.47 43a48 48 0 0 0-61 0L4.34 251.47a12 12 0 0 0-1.6 16.9l25.5 31A12 12 0 0 0 45.15 301l235.22-193.74a12.19 12.19 0 0 1 15.3 0L530.9 301a12 12 0 0 0 16.9-1.6l25.5-31a12 12 0 0 0-1.7-16.93z"/>
                            </svg>
                        </div>
                    </div>
                    <div className={"legend"}>
                        <span>{"poster by:"}</span>
                        <a href="https://dribbble.com/shots/18107062-Search-Not-Found-Illustration"
                           target="_blank"
                           rel="noopener noreferrer">
                            &nbsp;Labib Ahmadin
                        </a>
                    </div>
                </div>
            </div>
        </NotFoundStyled>
    )

}
