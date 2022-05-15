import styled from 'styled-components';


const ContainerStyled = styled.div`
  position:absolute;
  top:45%;
  left:0;
  width:100%;
  font-size: 80px;
`;
const LoadingSpinnerStyled = styled.div`
  display: block;
  text-align: center;
  perspective: 2em;
  //transform: scale(5.5);

  i {
    display: inline-block;
    width: 1em;
    height: 1em;
    animation: windows 1.5s infinite;
    outline: 1px solid transparent;
    position: relative;
    transform-style: preserve-3d;
  }

  i:before,
  i:after {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background:${({theme}) => theme.colors.orange_bar};
    backface-visibility: hidden;
  }

  i:after {
    background: #FFAA00;
    transform: rotateY(180deg)
  }

  @keyframes windows {
    0% {
      transform: rotateY(0deg) rotateX(0deg);
    }
    50% {
      transform: rotateY(180deg) rotateX(0deg);
    }
    100% {
      transform: rotateY(180deg) rotateX(180deg);
    }
  }

`;


export const LoadingCountry = () => {
    return <ContainerStyled>
        <LoadingSpinnerStyled>
            <i>{}</i>
        </LoadingSpinnerStyled>
    </ContainerStyled>
}