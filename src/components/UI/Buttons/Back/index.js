import styled from "styled-components";

const BackButtonStyled = styled.div`
  position: absolute;
  top: 1.1vh;
  left: 1.2vw;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 20%;
  padding: 1px;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${({theme}) => theme.UI.navigation__button.hover};
    border-radius: 50%;
  }

  svg {
    width: 35px;
    height: 35px;
  }
`;

export const BackButton =({onClick})=>{
    return <BackButtonStyled>
        <svg
            className={"back__away__button"}
            onClick={onClick}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
        >
            <path
                fill="currentColor"
                d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"
            />
        </svg>
    </BackButtonStyled>

}