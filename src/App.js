import {gql, useQuery} from "@apollo/client";

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

  const {loading, error, data} = useQuery(getCountries);


    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    console.log(data)

    // const dataRows = data.rates.map(({currency, rate}) => {
    //     return <div key={currency}>
    //         <p>
    //             {currency}: {rate}
    //         </p>
    //     </div>
    // });


    // const dataRows = data.rates.map({currency, rate}) => {
    //   return <tr>
    //     <td>{currency}</td>
    //     <td>{rate}</td>
    //   </tr>
    // }


    return <>
        Hiola mundfo
        {/*{dataRows && dataRows}*/}
    </>
}

export default App;
