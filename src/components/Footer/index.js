import styled from "styled-components";

const FooterStyled = styled.footer`
  background-color: rgba(198, 88, 52, 0.71);
  height: 3rem;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  user-select: none;
  color: white;
  white-space: nowrap; //TODO: fix for mobile site 
  overflow: hidden;


  span:first-of-type {
    padding-left: 3rem;
    padding-right: 0;
  }

  span:last-of-type {
    padding-right: 3rem;
  }

  span {
    margin: 0;
    padding: 0;
    font-weight: 300;

  }

  div {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;

    span:first-of-type {
      padding-left: 0;
      padding-right: 0.6rem;
    }

    .logo__svg {
      transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);

      &:hover {
        cursor: pointer;
        transform: scale(1.2);
      }
    }

    svg + svg {
      margin-left: 1rem;
    }

    span:last-of-type {
      padding-left: 0.6rem;
    }
  }

  .email {
    padding-left: 5px;
    user-select: text;
  }

`;








export const Footer = ()=>{

    return <FooterStyled>
        <span>kimchedevchallenge.com - 2022</span>
        <div>
            <span>design by: Jorge Clavijo </span>
            <svg
                className={"logo__svg"}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                onClick={() => window.open(
                    "https://www.linkedin.com/in/jym272/", "_blank")}
            >
                <path
                    fill="currentColor"
                    d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                />
            </svg>
            <svg
                className={"logo__svg"}
                height="24"
                viewBox="0 0 16 16"
                version="1.1" width="24" data-view-component="true"
                onClick={() => window.open(
                    "https://github.com/jym272", "_blank")}
            >
                <path fill="currentColor"
                      d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
            </svg>


            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
            >
                <path
                    fill="currentColor"
                    d="M12 12.713l-11.985-9.713h23.971l-11.986 9.713zm0 2.574l-12-9.725v15.438h24v-15.438l-12 9.725z"
                />
            </svg>
            <span className={"email"}>jym272@gmail.com</span>
        </div>

    </FooterStyled>

}