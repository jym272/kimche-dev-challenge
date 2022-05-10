import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";
import TYPE_DEFS from "./schema.graphql";

const client = new ApolloClient(
    {
        connectToDevTools: true,
        uri: "https://countries.trevorblades.com/",
        cache: new InMemoryCache(),
        typeDefs: TYPE_DEFS

    });

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ApolloProvider client={client}>
        <React.StrictMode>
            <App/>
        </React.StrictMode>
    </ApolloProvider>
);

