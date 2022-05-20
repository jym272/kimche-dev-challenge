import {ThemeProvider} from 'styled-components'
import {DarkTheme, GlobalStyle, LightTheme} from "./themes";
import {useState} from "react";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {About, Country, Home, NotFound, Search, SearchCountryComponent, ServerError} from "./Pages";

function App() {
    const themes = [DarkTheme, LightTheme];
    const darkMode = localStorage.getItem("darkMode");
    let index = 0;
    if (darkMode) {
        const item = JSON.parse(darkMode);
        index = !!item.darkMode ? 0 : 1;
    }
    const [actualTheme, setTheme] = useState(themes[index]);
    const invertTheme = () => {
        setTheme((prevTheme) => {
            const option = !!themes.indexOf(prevTheme);
            const item = {
                darkMode: option,
            }
            localStorage.setItem('darkMode', JSON.stringify(item));
            return themes[(themes.indexOf(prevTheme) + 1) % themes.length]
        });
    };

    return <ThemeProvider theme={{
        colors: actualTheme.colors,
        invertTheme: invertTheme,
        body: actualTheme.body,
        UI: actualTheme.UI,
    }}>
        <GlobalStyle/>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}>
                    <Route path="/" element={<Navigate to="/search"/>}/>
                    <Route path="search" element={<Search/>}/>
                    <Route path="about" element={<About/>}/>
                    <Route path="search/:country_name"
                           element={<SearchCountryComponent/>}>
                    </Route>
                    <Route path="country/:country_id" element={<Country/>}/>
                </Route>
                <Route //client side, status code 404 is not added.
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
