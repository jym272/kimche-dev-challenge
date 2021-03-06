import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";
import TYPE_DEFS from "./schema.graphql";
import {StoreProvider} from "./Store";
import {HelmetProvider} from "react-helmet-async";


const client = new ApolloClient(
    {
        connectToDevTools: true,
        uri: "https://countries.trevorblades.com/",
        cache: new InMemoryCache(),
        typeDefs: TYPE_DEFS

    });


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <HelmetProvider>
        <ApolloProvider client={client}>
            <StoreProvider>
                <React.StrictMode>
                    <App/>
                </React.StrictMode>
            </StoreProvider>
        </ApolloProvider>
    </HelmetProvider>
);

