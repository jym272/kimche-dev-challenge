import {gql, useQuery} from "@apollo/client";

const EXCHANGE_RATES = gql`
    query GetExchangeRates {
        rates(currency: "USD") {
            currency
            rate
        }
    }
`;

function App() {

    const {loading, error, data} = useQuery(EXCHANGE_RATES);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;


    const dataRows = data.rates.map(({currency, rate}) => {
        return <div key={currency}>
            <p>
                {currency}: {rate}
            </p>
        </div>
    });


    // const dataRows = data.rates.map({currency, rate}) => {
    //   return <tr>
    //     <td>{currency}</td>
    //     <td>{rate}</td>
    //   </tr>
    // }


    return <>
        Hiola mundfo
        {dataRows}
    </>
}

export default App;
