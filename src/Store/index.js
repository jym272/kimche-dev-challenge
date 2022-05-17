import {createContext, useEffect, useState} from "react";
import {gql, useQuery} from "@apollo/client";
import {LoadingIntro} from "../components";
import {ServerError} from "../Pages";
import {Trie} from "../Data-Structures";

const defaultValue = {
    continents: [],
    isHomePage: false,
    setHomePage: (option) => {},
    continentsCountriesIncludes: (inputCountryName) => {},
    languagesCountriesIncludes: (inputCountryName) => {},
    autoComplete: (inputCountryName) => {}

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
                languages {
                    code
                    name
                }
            }
        }
    }
`;


export const StoreProvider = ({children}) => {
    const [continents, setContinents] = useState([]);
    const [languages, setLanguages] = useState(new Map());
    const [isHomePage, setIsHomePage] = useState(true);
    const {loading, error, data} = useQuery(getContinents);
    const [trie, setTrie] = useState(null);


    useEffect(() => {
        if (data) {
            let trie_ = new Trie();
            const languages_ = new Map();
            data.continents.forEach(continent => {
                const continentObject = {
                    name: continent.name,
                    countries: new Map()
                }
                continent.countries.forEach(country => {
                    const countryObject = {
                        name: country.name,
                        emoji: country.emoji,
                        code: country.code,
                    }

                    continentObject.countries.set(country.code, countryObject)

                    trie_.insert({
                                    word: country.name.toLowerCase(),
                                    code: country.code,
                                })
                    //languages setting
                    country.languages.forEach(language => {
                        if (!languages_.has(language.code)) {
                            const languageObject = {
                                name: language.name,
                                countries: new Set()
                            }
                            languageObject.countries.add(countryObject)
                            languages_.set(language.code, languageObject)
                        } else {
                            languages_.get(language.code).countries
                                      .add(countryObject)
                        }
                    })


                })
                setContinents(
                    prevContinents => [...prevContinents, continentObject])

            });
            setTrie(trie_)
            setLanguages(languages_);
        }

    }, [data]);

    const orderByName = (languages_) => {
        const languages_array = Array.from(languages_.values());
        languages_array.sort((a, b) => {
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
            return 0;
        })
        return languages_array;
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
    // const getCountryNameAndCapital =(code)=>{
    //     console.log(continents)
    //     const country = continents.find(continent =>
    // continent.countries.has(code)); return { name:
    // country.countries.get(code).name, capital:
    // country.countries.get(code).capital } }

    const autoComplete = (inputCountryName)=>{
        return trie.autoComplete(inputCountryName.toLowerCase());
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

    const setHomePage = (option) => {
        setIsHomePage(option)
    }
    if (loading) return <LoadingIntro/>
    if (error) return <ServerError/>
    return (
        <CountryStore.Provider value={{
            continents,
            continentsCountriesIncludes,
            languagesCountriesIncludes,
            isHomePage,
            setHomePage,
            autoComplete,
        }}>
            {children}
        </CountryStore.Provider>
    );

};
