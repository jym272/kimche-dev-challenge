import {Outlet, useParams, useLocation} from "react-router-dom";
import {gql} from "@apollo/client";

// const getCountries = gql`
//     query getCountries {
//         countries {
//             name
//             code
//             capital
//         }
//     }
// `;


export const SearchCountry =()=>{

    // const {loading, error, data} = useQuery(getCountries);

    // if (loading) return <p>Loading...</p>;
    // if (error) return <p>Error :(</p>;

    // console.log(data)
    const params = useParams();
    const {country_name} = params;
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const option = queryParams.get('option');
    console.log(country_name, option)
    return <>
        asdasd
        <Outlet/>
    </>

}