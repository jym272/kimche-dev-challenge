import {ListOfCountries} from "../Countries";

export const GridOfCountries = ({array}) => {
    console.log(array);

    const grid = array.map(
        (item, index) => {
            return (
                <div key={index} className="grid-item">
                    <h1>{item.name}</h1>
                    <ListOfCountries iterator={item.countries.entries()} />
                </div>
            );
        }
    );


    return <p>
        asd
    </p>

}