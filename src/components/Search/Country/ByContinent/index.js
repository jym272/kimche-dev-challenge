import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import styled from 'styled-components'
import {SearchCountry} from "../../../UI";
import {GridOfCountries} from "../../../Grid";

const CountriesByContinentsStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  //height: 100%;
  //padding: 0 200px;
  //margin : 0 30px;

  .input {
    display: flex;
    width: 100%;
    max-width: 1200px;
    margin-bottom: 30px;
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




`;


export const CountriesByContinents = ({continents, country_name}) => {

    const [country_name_filter, setCountryNameFilter] = useState(country_name);
    const navigate = useNavigate();

    useEffect(() => {
        let timer;
        if (country_name_filter === "") {
            timer = setTimeout(() => {
                navigate(`/search/${country_name_filter}?option=continent`);
            }, 2000);
        }else{
            navigate(`/search/${country_name_filter}?option=continent`);

        }
        return () => clearTimeout(timer);

    }, [country_name_filter, navigate]);

    return <CountriesByContinentsStyled searching={!!country_name_filter}>
        <SearchCountry
            className={"input"}
            valueInput={country_name_filter}
            onChangeInput={(e) => setCountryNameFilter(e.target.value)}/>
        <GridOfCountries array={continents}/>

    </CountriesByContinentsStyled>
}