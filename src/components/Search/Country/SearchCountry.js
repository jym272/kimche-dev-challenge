import {Outlet, useLocation, useParams} from "react-router-dom";
import {useContext, useEffect} from "react";
import {CountryStore} from "../../Store";
import {NotFound} from "../../NotFound";
import {CountriesByContinents} from "./ByContinent";


export const SearchCountryComponent = () => {

    const context = useContext(CountryStore)
    const params = useParams();
    const {country_name} = params;
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const option = queryParams.get('option');


    useEffect(()=>{
        context.setHomePage(false)
    },[context]) //first update store provider, then render this component




    // console.log(country_name, option)

    let country = country_name
    if (country_name.length < 2) {
        country = "YolandaLoyola" //continents is empty now
    }

    switch (option) {
        case "continent":
            return <CountriesByContinents
                continents={context.continentsCountriesIncludes(country)}
                country_name={country_name}
            />
        case "country":
            break;
        default:
            return <NotFound/>
    }

    return <>
        SearchCountry
        <Outlet/>
    </>

}