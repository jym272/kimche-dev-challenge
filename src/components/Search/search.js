import styled from 'styled-components'
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {SearchCountry} from "../UI";

const SearchStyled = styled.section`
  display: flex;
  user-select: none;
  position: relative;
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
      height: 50px;

      align-self: center;
    }
  }
  .invalid__input{
    position: absolute;
    transform: translateY(110px);
    color: green;
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
    const [invalidInput, setInvalidInput] = useState("");

    let navigate = useNavigate();

    const languageOptionHandler = () => {
        setLanguageOption(true);
        setOptionAnimationStyle("select__line");
    }

    useEffect(() => {
        setInvalidInput("");
    }, [input]);

    const findCountryHandler = (e) => {
        e.preventDefault()
        // only alphabetic characters are allowed, at least 3 characters and
        // special characters: like "[" and "." are allowed
        const regex = /^[a-zA-Z\[\]\.]{2,}?$/;

        if (!regex.test(input.trim())) {
            setInvalidInput("at least 2" +
                            " alphabetic characters and special characters" +
                            " like \"[\" \"]\" and \".\" are allowed");
            return
        }

        navigate(`/search/${input}?option=${!languageOption ?"continent":"language"}`);
    }

    return <SearchStyled searching={!!input}>
        <LogoStyled>
            <span>country</span>
            <span>SEARCH</span>
        </LogoStyled>


        <SearchCountry
            Handler={findCountryHandler}
            valueInput={input}
            onChangeInput={(e) => setInput(e.target.value)}
            className={"input"} />
        {!!invalidInput && <span className={"invalid__input"}>{invalidInput}</span>}


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