import styled from "styled-components";

export const ListStyled = styled.ul`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  list-style: none;
  padding: 0 20px 20px 20px;
  margin: 0;
  
  
  img{
    user-select: none;
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 50%;
    max-width: 100%;
    height: 100%;
    opacity: 0.5;
    z-index: 21;
    transition: transform 0.25s ease-in-out;
    &:hover{
      transform: rotate3d(1,1,1,-10deg) scale(1.1);
    }
    
  }

 
  li {
    background-color: rgba(0, 0, 0, 0.17);
    cursor: pointer;
    border-radius: 15px;
    padding: 4px;
    margin-bottom: 0.5rem;
    font-size: 1.1rem;
    font-family: 'Titillium Web', sans-serif;
    border: 1px solid rgba(0, 0, 0, 0.17);
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    z-index: 21;



    &:hover {
      border: 1px solid ${({theme}) => theme.colors.orange_bar};
      animation: change-background-color 1.7s cubic-bezier(0.25, 0.8, 0.25, 1) forwards;
    }
    div{
      padding-left: 3px;
      span:first-of-type{
        padding-right: 3px;
      }
    }
    
    @keyframes change-background-color {
      0% {
        background-color: rgba(0, 0, 0, 0.17);
      }
      30% {
        background-color: rgba(0, 0, 0, 0.17);
      }
      100% {
        background-color: ${({theme}) => theme.colors.orange_bar};
      }
    }

  }
`;
