import styled from 'styled-components';

// Samsung TvLoader : https://codepen.io/woodwoerk/pen/YWjWzo
const LoadingIntroStyled = styled.main`
  background: hsla(229, 18%, 17%, 1);
  background: radial-gradient(circle at center, hsla(229, 18%, 20%, 1) 0, hsla(229, 18%, 18%, 1), hsla(229, 18%, 17%, 1)100%);
  font-size: 26px;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  .blob {
    width: 2rem;
    height: 2rem;
    background: rgba(230, 230, 230, 0.85);
    border-radius: 50%;
    position: absolute;
    left: calc(50% - 1rem);
    top: calc(50% - 1rem);
    box-shadow: 0 0 1rem rgba(255, 255, 255, 0.25);
  }

  .blob-2 {
    animation: animate-to-2 1.5s infinite;
  }

  .blob-3 {
    animation: animate-to-3 1.5s infinite;
  }

  .blob-1 {
    animation: animate-to-1 1.5s infinite;
  }

  .blob-4 {
    animation: animate-to-4 1.5s infinite;
  }

  .blob-0 {
    animation: animate-to-0 1.5s infinite;
  }

  .blob-5 {
    animation: animate-to-5 1.5s infinite;
  }

  @keyframes animate-to-2 {
    25%, 75% {
      transform: translateX(-1.5rem) scale(0.75);
    }
    95% {
      transform: translateX(0rem) scale(1);
    }
  }

  @keyframes animate-to-3 {
    25%, 75% {
      transform: translateX(1.5rem) scale(0.75);
    }
    95% {
      transform: translateX(0rem) scale(1);
    }
  }

  @keyframes animate-to-1 {
    25% {
      transform: translateX(-1.5rem) scale(0.75);
    }
    50%, 75% {
      transform: translateX(-4.5rem) scale(0.6);
    }
    95% {
      transform: translateX(0rem) scale(1);
    }
  }

  @keyframes animate-to-4 {
    25% {
      transform: translateX(1.5rem) scale(0.75);
    }
    50%, 75% {
      transform: translateX(4.5rem) scale(0.6);
    }
    95% {
      transform: translateX(0rem) scale(1);
    }
  }

  @keyframes animate-to-0 {
    25% {
      transform: translateX(-1.5rem) scale(0.75);
    }
    50% {
      transform: translateX(-4.5rem) scale(0.6);
    }
    75% {
      transform: translateX(-7.5rem) scale(0.5);
    }
    95% {
      transform: translateX(0rem) scale(1);
    }
  }

  @keyframes animate-to-5 {
    25% {
      transform: translateX(1.5rem) scale(0.75);
    }
    50% {
      transform: translateX(4.5rem) scale(0.6);
    }
    75% {
      transform: translateX(7.5rem) scale(0.5);
    }
    95% {
      transform: translateX(0rem) scale(1);
    }
  }


`;

export const LoadingIntro = () => {
    return <LoadingIntroStyled>
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
            <defs>
                <filter id="gooey">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="10"
                                    result="blur">{}</feGaussianBlur>
                    <feColorMatrix in="blur" mode="matrix"
                                   values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
                                   result="goo">{}</feColorMatrix>
                    <feBlend in="SourceGraphic" in2="goo">{}</feBlend>
                </filter>
            </defs>
        </svg>
        <div className="blob blob-0">{}</div>
        <div className="blob blob-1">{}</div>
        <div className="blob blob-2">{}</div>
        <div className="blob blob-3">{}</div>
        <div className="blob blob-4">{}</div>
        <div className="blob blob-5">{}</div>
    </LoadingIntroStyled>
}