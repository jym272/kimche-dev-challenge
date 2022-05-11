import {createContext, useEffect, useState} from "react";
import {gql, useQuery} from "@apollo/client";

const defaultValue = {
    continents: [],
    continentsCountriesIncludes:(inputCountryName)=>{}
};

export const CountryStore = createContext(defaultValue);


const getContinents = gql`
    query getContinents {
        continents {
            name
            countries {
                name
                code
                emoji
                emojiU
            }
        }
    }
`;


export const StoreProvider = ({children}) => {
    const [continents, setContinents] = useState([]);
    const {loading, error, data} = useQuery(getContinents);


    useEffect(() => {
        if (data) {
            data.continents.forEach(continent => {
                const continentObject = {
                    name: continent.name,
                    countries: new Map()
                }
                continent.countries.forEach(country => {
                    continentObject.countries.set(country.code, country.name)
                })
                setContinents(
                    prevContinents => [...prevContinents, continentObject])

            });
        }

    }, [data]);


    const continentsCountriesIncludes = (inputCountryName) => {
        const continents_ = [];
        const input = inputCountryName.toLowerCase();
        continents.forEach(continent => {
            const continentObject = {
                name: continent.name,
                countries: new Map()
            }
            for (const [code, countryName] of continent.countries) {
                if (countryName.toLowerCase().includes(input)) {
                    continentObject.countries.set(code, countryName)
                }
            }
            continents_.push(continentObject)
        })
        return continents_
    }


    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    return (
        <CountryStore.Provider value={{
            continents,
            continentsCountriesIncludes
        }}>
            {children}
        </CountryStore.Provider>
    );

};
