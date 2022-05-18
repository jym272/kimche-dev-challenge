import styled from "styled-components";

export const LogoStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px 20px 60px 20px;
  background: #303340;
  margin-bottom: 40px;
  border-radius: 50%;
  color: #fff;
  font-family: 'Ubuntu', sans-serif;
  span:first-of-type {
    font-size: 3em;
    font-weight: 500;
    color: ${({theme}) => theme.colors.orange_bar};
  }

  span:last-of-type {
    font-size: 2.5em;
    font-weight: 500;

  }

`;
