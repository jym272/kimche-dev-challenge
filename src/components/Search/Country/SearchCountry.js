import {Outlet, useLocation, useNavigate, useParams} from "react-router-dom";
import React, {useContext, useEffect, useState} from "react";
import {CountryStore} from "../../Store";
import {NotFound} from "../../NotFound";
import {CountriesBy} from "./By";


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


    document.onkeydown = (e) => {
        e = e || window.event;
        if (e.key === "Escape") {
            navigate('/');
        }
    }


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
         <CountriesBy
             option={option}
             array={countriesArray}
             country_name={country_name}
         />
        }
        <Outlet/>
    </>

}

export const SearchCountryComponent = React.memo(SearchCountryComponent_);