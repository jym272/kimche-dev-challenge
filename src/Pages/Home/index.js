import {Outlet} from "react-router-dom";
import Layout from "../../Layout";
import {gql, useQuery} from "@apollo/client";
import {useContext, useEffect} from "react";
import {Trie} from "../../Data-Structures";
import {LoadingIntro} from "../../components";
import {ServerError} from "../500";
import {CountryStore} from "../../Store";


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


export const Home = () => {
    const {loading, error, data} = useQuery(getContinents);
    const context = useContext(CountryStore);

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
                context.setContinents(
                    prevContinents => [...prevContinents, continentObject])

            });
            context.setTrie(trie_)
            context.setLanguages(languages_);
        }

    }, [data, context.setTrie, context.setLanguages, context.setContinents]) //don't add context: re-run every time

    if (loading) return <LoadingIntro/>
    if (error) return <ServerError/>

    // Outlet -> A component that renders the next match in a set of matches.
    return (
        <Layout>
            <Outlet/>
        </Layout>
    )
}