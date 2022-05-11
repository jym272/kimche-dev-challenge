import styled from 'styled-components'
import {useState} from "react";

const SearchStyled = styled.section`
  display: flex;
  user-select: none;

  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 90vh;
  width: 100%;
  background-color: ${({theme}) => theme.colors.background};
  color: ${({theme}) => theme.colors.text};
  padding: 0;
  margin: 0;

  .input {
    display: flex;
    width: 70%;

    .search__button_svg {
      border-radius: 0 5px 5px 0;
      background: ${props => props.searching ? '#E97C57' : 'white'};
      cursor: ${props => props.searching ? 'pointer' : 'default'};
      pointer-events: ${props => props.searching ? 'auto' : 'none'};
      color: #e4e0e0;
      padding: 0 0 0 5px;
      border: 1px solid white;
      margin: 0;
      height: 48px;

      align-self: center;
    }
  }

  .select__line__init,
  .select__line__language,
  .select__line {
    width: 140px;
    padding: 2px;
    margin: 0;
    background: ${({theme}) => theme.colors.orange_bar};
    animation: translate-in- 0.8s ease-in-out forwards;

    @keyframes translate-in- {
      0% {
        transform: translateX(263px);
      }
      100% {
        transform: translateX(-12px);
      }
    }

  }

  .select__line__language {
    animation: translate-in-reverse 0.8s ease-in-out forwards;
  }

  @keyframes translate-in-reverse {
    0% {
      transform: translateX(-12px);
    }
    100% {
      transform: translateX(263px);
    }
  }

  .select__line__init {
    animation: none;
    transform: translateX(-12px);
  }


`;
const SearchInput = styled.input.attrs(
    {
        type: 'text',
        name: 'search',
        id: 'search',
        placeholder: 'Search...',
        autoComplete: 'off',
        required: true,
        autoFocus: true,
        spellCheck: false,
        autoCorrect: "off",
        autoCapitalize: 'none',
        maxLength: '30',
        minLength: '3',
    })`
  display: inline-block;
  width: 100%;
  height: 50px;
  border: none;
  font-size: 2em;
  border-radius: 5px 0 0 5px;
  padding: 0 20px;
  font-family: 'Titillium Web', sans-serif;

  &:focus {
    outline: none;
  }

`;
const OptionsSearch = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 50px;
  //min-width: 70%;
  //width: 50%;
  width: 650px;
  font-family: 'Titillium Web', sans-serif;

  div {
    cursor: pointer;
    font-size: 2.0em;
  }

  .blur {
    opacity: 0.5;
  }


`;

const LogoStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px 20px 60px 20px;
  background: #303340;
  margin-bottom: 40px;
  border-radius: 50%;
  //width: 100%;
  //height: 100px;
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


export const Search = () => {
    const [languageOption, setLanguageOption] = useState(false);
    const [optionAnimationStyle, setOptionAnimationStyle] = useState(
        "select__line__init");
    const [input, setInput] = useState("");


    const languageOptionHandler = () => {
        setLanguageOption(true);
        setOptionAnimationStyle("select__line");
    }


    const findCountryHandler = () => {
        console.log("buscando");
    }

    return <SearchStyled searching={!!input}>
        <LogoStyled>
            <span>country</span>
            <span>SEARCH</span>
        </LogoStyled>

        <div className={"input"}>
            <SearchInput
                value={input}
                onChange={(e) => setInput(e.target.value)}
            >
            </SearchInput>
            <div className={"search__button_svg"} onClick={findCountryHandler}>
                <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44"
                     viewBox="0 0 24 24">
                    <path fill="currentColor"
                          d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                    <path d="M0 0h24v24H0z" fill="none"/>
                </svg>
            </div>
        </div>


        <OptionsSearch>
            <h2>Group by : </h2>
            <div onClick={() => {setLanguageOption(false)}}
                 className={languageOption ? "blur" : ""}>Continent
            </div>
            <div onClick={languageOptionHandler}
                 className={!languageOption ? "blur" : ""}>Language
            </div>
        </OptionsSearch>
        <div className={languageOption ? "select__line__language" :
                        optionAnimationStyle}>
            {}
        </div>
    </SearchStyled>
}