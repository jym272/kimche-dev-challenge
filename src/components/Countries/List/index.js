import {Link} from "react-router-dom";
import styled from "styled-components";

const ListStyled = styled.ul`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  list-style: none;
  padding: 0 20px;
  margin: 0;
  a{
    text-decoration: none;
    color: azure;
  }
`;


export const ListOfCountries = ({map}) => {
    const countryArray = []
    for (const [key, value] of map) {
        countryArray.push({key, value})
    }

    const list = countryArray.map(({key, value}) => {
        return (
            <li key={key}>
                <Link to={`/countries/${key}`}>
                    {value}
                </Link>
            </li>
        )

    }
    );
    return (
        <ListStyled>
            {list}
        </ListStyled>
    )
}
