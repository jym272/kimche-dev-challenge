import {createContext, useState} from "react";

const defaultValue = {
    continents: [],
    isHomePage: false,
    setHomePage: (option) => {},
    continentsCountriesIncludes: (inputCountryName) => {},
    languagesCountriesIncludes: (inputCountryName) => {},
    autoComplete: (inputCountryName) => {},
    setTrie: (previousValue) => {},
    setContinents: (previousValue) => {},
    setLanguages: (previousValue) => {},

};

export const CountryStore = createContext(defaultValue);


export const StoreProvider = ({children}) => {
    const [isHomePage, setIsHomePage] = useState(true);
    const [trie, setTrie] = useState(null);
    const [continents, setContinents] = useState([]);
    const [languages, setLanguages] = useState(new Map());


    const orderByName = (languages_) => {
        const languages_array = Array.from(languages_.values());
        languages_array.sort((a, b) => {
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
            return 0;
        })
        return languages_array;
    }


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


    const languagesCountriesIncludes = (inputCountryName) => {
        const languages_ = [];
        const input = inputCountryName.toLowerCase();
        for (const [code, value] of languages) {
            const languageObject = {
                name: value.name,
                countries: new Map()
            }
            value.countries.forEach(country => {
                if (country.name.toLowerCase().includes(input)) {
                    languageObject.countries.set(country.code, country)
                }
            })
            languages_.push(languageObject)
        }
        return orderByName(languages_);
    }

    const autoComplete = (inputCountryName) => {
        return trie.autoComplete(inputCountryName.toLowerCase());
    }
    const setHomePage = (option) => {
        setIsHomePage(option)
    }
    return (
        <CountryStore.Provider value={{
            continents,
            continentsCountriesIncludes,
            languagesCountriesIncludes,
            isHomePage,
            setHomePage,
            autoComplete,
            setTrie,
            setContinents,
            setLanguages

        }}>
            {children}
        </CountryStore.Provider>
    );

};
