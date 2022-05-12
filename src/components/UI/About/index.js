import styled from "styled-components";

export const AboutFooterStyled = styled.div`
  position: absolute;
  bottom: 0;
  padding: 26px 23px;
  border-radius: 50%;
  border: 1px solid #bbb;

  &:hover{
    border: 1px solid ${({theme}) => theme.colors.orange_bar};
    cursor: pointer;

  }
  &:hover span{
    background-color: ${({theme}) => theme.colors.orange_bar};

  }
  
  span +span{
    margin-left: 3px;
  }
  span{
    height: 6px;
    width: 6px;
    background-color: #bbb;
    border-radius: 50%;
    display: inline-block;
  }
    
  `;
