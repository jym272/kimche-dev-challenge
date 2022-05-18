import styled from 'styled-components'
import React, {useCallback, useContext, useEffect, useState} from "react";
import {Outlet, useNavigate} from "react-router-dom";
import {LogoStyled, SearchCountry} from "../../UI";
import {CountryStore} from "../../Store";
import {AboutFooter, AutoCompleteTexBox} from "../../components";

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
    width: 60%;
    max-width: 800px;

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
      transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);

      &:hover {
        ${props => props.searching ? 'background: #C65834' : 'white'};
      }


    }
  }

  .invalid__input {
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


export const Search_ = () => {
    const [languageOption, setLanguageOption] = useState(false);
    const [optionAnimationStyle, setOptionAnimationStyle] = useState(
        "select__line__init");
    const [input, setInput] = useState("");
    const [invalidInput, setInvalidInput] = useState("");
    const [autoComplete, setAutoComplete] = useState([]);
    const context = useContext(CountryStore);

    useEffect(() => {
        context.setHomePage(true)
    }, [context]) //first update store provider, then render this component

    let navigate = useNavigate();

    const languageOptionHandler = useCallback(() => {
        setLanguageOption(true);
        setOptionAnimationStyle("select__line");
    }, [])

    useEffect(() => {
        setInvalidInput("");
        setAutoComplete([]);
        if (input.length > 1) {
            setAutoComplete(context.autoComplete(input.trim()));
        }
    }, [input, context]);

    const findCountryHandler = useCallback((e) => {
        e.preventDefault()
        // only alphabetic characters are allowed, at least 3 characters and
        // special characters: like "[" and "." are allowed
        const regex = /^[a-zA-Z\[\]\.]{2,}?$/;

        if (!regex.test(input.trim())) {
            setInvalidInput(
                "at least 2" + " alphabetic characters and special characters" +
                " like [ ] and '.' are allowed");
            return
        }

        navigate(`/search/${input}?option=${!languageOption ? "continent" :
                                            "language"}`);
    },[input, languageOption, navigate]);


    useEffect(() => {
        document.onkeydown = (e) => {
            e = e || window.event;
            if (e.key === "Tab") {
                e.preventDefault()
                if (languageOption) {
                    setLanguageOption(false);
                } else {
                    languageOptionHandler()

                }
            }
            if (e.key === "Escape") {
                e.preventDefault()
                setAutoComplete([]);
            }
        }
        return () => {
            document.onkeydown = null;
        }
    }, [languageOptionHandler, languageOption]);


    const clickSectionHandler =()=>{
        setAutoComplete([]);
    }


    return <SearchStyled searching={!!input} onClick={clickSectionHandler}>
        <LogoStyled>
            <span>country</span>
            <span>SEARCH</span>
        </LogoStyled>


        <SearchCountry
            placeholder={"Search for a country..."}
            Handler={findCountryHandler}
            valueInput={input}
            onChangeInput={(e) => setInput(e.target.value)}
            className={"input"}/>
        {!!invalidInput &&
         <span className={"invalid__input"}>{invalidInput}</span>}
        {autoComplete.length > 0 &&
         <AutoCompleteTexBox autoComplete={autoComplete}/>}


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
        <AboutFooter/>
        <Outlet/>
    </SearchStyled>

}
export const Search = React.memo(Search_);
