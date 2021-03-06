import React, {useCallback, useEffect, useMemo, useState} from "react";
import {useNavigate} from "react-router-dom";
import styled from 'styled-components'
import {SearchCountry} from "../../../../UI";
import {GridOfCountries} from "../../../Grid";

const CountriesByStyled = styled.section`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;

  .input {
    display: flex;
    width: 100%;
    max-width: 1200px;
    margin: 8px auto 0px auto;

    .search__button_svg {
      border-radius: 0 5px 5px 0;
      background: ${props => props.searching ? '#E97C57' : 'white'};
      cursor: default;
      pointer-events: none;
      color: #e4e0e0;
      padding: 0 0 0 5px;
      border: 1px solid white;
      margin: 0;
      height: 50px;
      align-self: center;
    }

  }


  .info__message {
    padding: 0 0 0 20px;
    color: ${({theme}) => theme.colors.orange_bar};
    position: absolute;
    transform: translateY(69px);
    top: 0;
    z-index: 3;
  }

  //.selector__options {
  //  font-size: 0.9rem;
  //  user-select: none;
  //  position: absolute;
  //  transform: translateY(69px);
  //  top: 0;
  //  right: 0;
  //  z-index: 3;
  //
  //}
`;

export const CountriesBy_ = ({array, country_name, option: option_}) => {

    const ReturningHomeArray = useMemo( ()=>["Returning Home...", "Returning" +
                                                              " Home..",
        "Returning Home.", "Returning Home"], [])
    const [country_name_filter, setCountryNameFilter] = useState(country_name);
    const [infoMessage, setInfoMessage] = useState('');
    const [returningHome, setReturningHome] = useState(ReturningHomeArray[0]);
    const navigate = useNavigate();

    useEffect(() => {
        setInfoMessage('');
        let timer;
        const interval_ms=500;
        setReturningHome(ReturningHomeArray[0]);
        switch (country_name_filter.trim().length) {
            case 0:
                timer = setTimeout(() => {
                    setReturningHome(ReturningHomeArray[1]);
                    timer = setTimeout(() => {
                        setReturningHome(ReturningHomeArray[2]);
                        timer = setTimeout(() => {
                            setReturningHome(ReturningHomeArray[3]);
                            timer = setTimeout(() => {
                                navigate(`/search/`);
                            }, interval_ms);
                        }, interval_ms);
                    }, interval_ms);
                }, interval_ms);
                break;
            case 1:
                timer = setTimeout(() => {
                    setInfoMessage('please type at least 2 letters');
                }, 600);
                break;
            default:
                navigate(`/search/${country_name_filter}?option=${option_}`);
                break;
        }
        return () => clearTimeout(timer);
    }, [country_name_filter, navigate,option_, ReturningHomeArray]);


    const submitHandler = (e) => {
        e.preventDefault();
    };


    const array_ = useMemo(() => array, [array]);

    return <CountriesByStyled searching={!!country_name_filter}>
        <SearchCountry
            Handler={submitHandler}
            placeholder={returningHome}
            className={"input"}
            valueInput={country_name_filter}
            onChangeInput={(e) => setCountryNameFilter(e.target.value)}/>
        {!!infoMessage && <div className={"info__message"}>{infoMessage}</div>}
        {/*<div className={"selector__options"}>*/}
        {/*    <span>Group by:</span>*/}
        {/*    <span onClick={() => {*/}
        {/*        navigate(`/search/${country_name_filter}?option=continent`);*/}
        {/*    }}>continent</span>*/}
        {/*    <span onClick={() => {*/}
        {/*        navigate(`/search/${country_name_filter}?option=language`);*/}
        {/*    }}>language</span>*/}

        {/*</div>*/}
        <GridOfCountries array={array_} option={option_}
                         country_name={country_name_filter}/>

    </CountriesByStyled>
}

export const CountriesBy = React.memo(CountriesBy_);