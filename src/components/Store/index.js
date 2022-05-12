import {createContext, useEffect, useState} from "react";
import {gql, useQuery} from "@apollo/client";

const defaultValue = {
    continents: [],
    isHomePage: false,
    setHomePage:(option)=>{},
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
    const [isHomePage, setIsHomePage] = useState(false);
    const {loading, error, data} = useQuery(getContinents);


    useEffect(() => {
        if (data) {
            data.continents.forEach(continent => {
                const continentObject = {
                    name: continent.name,
                    countries: new Map()
                }
                continent.countries.forEach(country => {
                    const countryObject ={
                        name: country.name,
                        // code: country.code,
                        emoji: country.emoji,
                        emojiU: country.emojiU
                    }
                    continentObject.countries.set(country.code, countryObject)
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
            for (const [code, country] of continent.countries) {
                if (country.name.toLowerCase().includes(input)) {
                    continentObject.countries.set(code, country)
                }
            }
            continents_.push(continentObject)
        })
        return continents_
    }

    const setHomePage=(option)=>{
        setIsHomePage(option)
    }


    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    return (
        <CountryStore.Provider value={{
            continents,
            continentsCountriesIncludes,
            isHomePage,
            setHomePage,
        }}>
            {children}
        </CountryStore.Provider>
    );

};
