import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import styled from 'styled-components'
import {SearchCountry} from "../../../UI";
import {GridOfCountries} from "../../../Grid";

const CountriesByStyled = styled.section`
  display: flex;
  //align-self: center;
  flex-direction: column;
  position: relative;
  //align-items: center;
  //justify-content: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  //height: 100%;
  //padding: 0 200px;
  //margin : 0 30px;

  .input {
    display: flex;
    //align-self: center;
    width: 100%;
    max-width: 1200px;
    margin: 8px auto 0px auto;
    //min-width: 500px;

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


  .info__message {
    padding: 0 0 0 20px;
    color: ${({theme}) => theme.colors.orange_bar};
    position: absolute;
    transform: translateY(70px);
    top: 0;
    z-index: 3;
  }
`;


export const CountriesBy = ({array, country_name, option}) => {

    const [country_name_filter, setCountryNameFilter] = useState(country_name);
    const [infoMessage, setInfoMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        setInfoMessage('');
        let timer;
        switch (country_name_filter.trim().length) {
            case 0:
                timer = setTimeout(() => {
                    navigate(`/search/`);
                }, 1500);
                break;
            case 1:
                timer = setTimeout(() => {
                    setInfoMessage('please type at least 2 letters');
                }, 600);
                break;
            default:
                navigate(`/search/${country_name_filter}?option=${option}`);
                break;
        }
        return () => clearTimeout(timer);
    }, [country_name_filter, navigate]);


    const submitHandler = (e) => {
        e.preventDefault();
    };

    return <CountriesByStyled searching={!!country_name_filter}>
        <SearchCountry
            Handler={submitHandler}
            placeholder={"Returning home..."}
            className={"input"}
            valueInput={country_name_filter}
            onChangeInput={(e) => setCountryNameFilter(e.target.value)}/>
        {!!infoMessage && <div className={"info__message"}>{infoMessage}</div>}
        <GridOfCountries array={array} option={option}/>

    </CountriesByStyled>
}