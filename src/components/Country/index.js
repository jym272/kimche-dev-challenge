import {CountryStore} from "../Store";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useContext, useEffect} from "react";

export const Country =()=>{



    const context = useContext(CountryStore)
    const params = useParams();
    const {country_id} = params;
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const option = queryParams.get('option');
    const navigate= useNavigate();

    //
    // document.onkeydown = (e) => {
    //     e = e || window.event;
    //     if (e.key === "Escape") {
    //         navigate('/');
    //     }
    // }


    useEffect(() => {
        context.setHomePage(false)
        console.log(country_id)


    }, [context]) //first update s

    return(
        <div>
            <h1>Country</h1>
            {country_id}
        </div>
    )
}