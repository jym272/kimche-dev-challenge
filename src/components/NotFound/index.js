import styled from "styled-components";

const NotFoundStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-color: #fafafa;
  color: #000;
  font-size: 1.5rem;
  font-weight: bold;
  font-family: 'Roboto', sans-serif;
  text-align: center;
    
  h1 {
    font-size: 3rem;
    font-weight: bold;
    font-family: 'Roboto', sans-serif;
    text-align: center;
    margin-bottom: 1rem;
  }
  p {
    font-size: 1.5rem;
    font-weight: bold;
    font-family: 'Roboto', sans-serif;
    text-align: center;
    margin-bottom: 1rem;
  }
  `;

export const NotFound =()=>{
    return(
        <NotFoundStyled>
            <h1>Not Found</h1>
            <p>Sorry, the page you are looking for does not exist.</p>
        </NotFoundStyled>
    )

}
