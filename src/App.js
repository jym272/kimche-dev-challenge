import {gql, useQuery} from "@apollo/client";
import styled, {createGlobalStyle, css, ThemeProvider} from 'styled-components'
import {DarkTheme, GlobalStyle, LightTheme} from "./themes";
import {useState} from "react";
import {BrowserRouter, Link, Navigate, Route, Routes} from "react-router-dom";
import {About, Home, NotFound, Search} from "./components";


const getCountries = gql`
    query getCountries {
        countries {
            name
            code
            capital
        }
    }
`;


function App() {
    // const {loading, error, data} = useQuery(getCountries);
    const themes = [LightTheme, DarkTheme];
    const darkMode = localStorage.getItem("darkMode");
    let index=0;
    if (darkMode) {
        const item = JSON.parse(darkMode);
        index = !!item.darkMode ? 0 : 1;
    }
    const [actualTheme, setTheme] = useState(themes[index]);
    const invertTheme = () => {
        setTheme((prevTheme) =>{
            console.log(themes.indexOf(prevTheme))
            const option = !!themes.indexOf(prevTheme);
            const item = {
                darkMode: option,
            }
            localStorage.setItem('darkMode', JSON.stringify(item));
            return themes[(themes.indexOf(prevTheme) + 1) % themes.length]});
    };
    // if (loading) return <p>Loading...</p>;
    // if (error) return <p>Error :(</p>;

    // console.log(data)

    return <ThemeProvider theme={{
        colors: actualTheme.colors,
        invertTheme: invertTheme,
        body: actualTheme.body,
        navigation: actualTheme.navigation,
    }}>
        <GlobalStyle/>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}>
                    <Route path="/" element={<Navigate to="/search"/>}/>
                    <Route path="search" element={<Search/>}/>
                    <Route path="about" element={<About/>}/>
                    {/*<Route path="quotes/:quoteId" element={<QuoteDetails/>}>*/}
                    {/*    <Route*/}
                    {/*        index*/}
                    {/*        element={*/}
                    {/*            <div style={*/}
                    {/*                {*/}
                    {/*                    padding: "1rem",*/}
                    {/*                    marginRight: "1rem",*/}
                    {/*                    textAlign: "right"*/}
                    {/*                }}>*/}
                    {/*                <Link className='btn' to="comments">Comments</Link>*/}
                    {/*            </div>*/}
                    {/*        }*/}
                    {/*    />*/}

                    {/*    <Route path="comments" element={<Comments/>}/>*/}
                    {/*</Route>*/}

                    {/*<Route path="new-quote" element={<NewQuote/>}/>*/}
                </Route>
                <Route
                    path="*"
                    element={
                            <NotFound/>
                    }
                />
            </Routes>
        </BrowserRouter>
    </ThemeProvider>
}

export default App;
