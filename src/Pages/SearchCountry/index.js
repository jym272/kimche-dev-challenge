import {useLocation, useNavigate, useParams} from "react-router-dom";
import React, {useCallback, useContext, useEffect, useState} from "react";
import {CountriesBy} from "../../components";
import {CountryStore} from "../../Store";
import {NotFound} from "../404";
import {Helmet} from "react-helmet-async";
import useEventListener from "@use-it/event-listener";


export const SearchCountryComponent_ = () => {

    const context = useContext(CountryStore)
    const params = useParams();
    const {country_name} = params;
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const option = queryParams.get('option');
    const [countriesArray, setCountriesArray] = useState([]);
    const [incorrectOption, setIncorrectOption] = useState(false);
    const navigate = useNavigate();

    const keyHandler = useCallback(({key}) => {
        if (['27', 'Escape'].includes(String(key))) {
            navigate('/');
        }
    }, [navigate]);

    useEventListener('keydown', keyHandler);

    useEffect(() => {
        context.setHomePage(false)

        let country = country_name
        if (country_name.length < 2) {
            country = "YolandaLoyola" //continents is empty now
        }

        switch (option) {
            case 'continent':
                setCountriesArray(context.continentsCountriesIncludes(country))
                break;
            case 'language':
                setCountriesArray(context.languagesCountriesIncludes(country))
                break;
            default:
                setIncorrectOption(true)
        }
    }, [context, country_name, option]) //first update store provider, then

    return <>
        {incorrectOption ? <NotFound/> :
         <>
             <Helmet>
                 <meta charSet="utf-8"/>
                 <title>{`Countries by ${option}`}</title>
             </Helmet>
             <CountriesBy
                 option={option}
                 array={countriesArray}
                 country_name={country_name}
             />
         </>
        }
    </>

}

export const SearchCountryComponent = React.memo(SearchCountryComponent_);