import {ListOfCountries} from "../Countries";
import styled from "styled-components";


const GridStyled = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  grid-gap: 2rem;
  grid-auto-rows: minmax(300px,auto );
  grid-auto-flow: dense;
  justify-items: center;
  align-items: center;
  margin: 0 auto;
  width: 100%;
  max-width: 1200px;
  padding: 20px;
  height: 100%;
  //min-height: 50vh;
  overflow: hidden;
  //position: sticky;
  //z-index: 1;
  //@media (max-width: 768px) {
  //  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  //}

  .grid-item {
    position: relative;
    color: #ffffeb;
    width: 100%;
    height: 100%;
    background-color: #303340;
    //overflow: hidden;

    h1 {
      font-size: 2rem;
      align-self: center;
      margin: 0 auto;
      padding: 20px 20px;
    }

    &:hover {
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    }


  }
`;


export const GridOfCountries = ({array}) => {
    // console.log(array);

    const grid = array.map(
        (item, index) => {
            return (
                <div key={index} className="grid-item">
                    <h1>{item.name}</h1>
                    <ListOfCountries map={item.countries}/>
                </div>
            );
        }
    );


    return <GridStyled>
        {grid}
    </GridStyled>

}