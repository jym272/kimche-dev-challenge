import {ListOfCountries} from "../Countries";
import styled from "styled-components";
import {useEffect, useState} from "react";
import {ListStyled} from "../UI";
import React from "react";


const NotFoundStyled = styled.section`
  display: block;
  justify-content: center;
  align-items: center;
  height: 100%;
  min-height: 70vh;
  transform: scale(0.7);
`;

const GridStyled = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  grid-gap: 2rem;
  grid-auto-flow: dense;
  justify-items: center;
  align-items: center;
  margin: 0 auto;
  padding: 40px 0 40px 0;
  width: 100%;
  height: 100%;
  min-height: 76vh;
  overflow: hidden;
  position: relative;
  //@media (max-width: 768px) {
  //  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  //}

  .grid-item {
    position: relative;
    color: #ffffeb;
    width: 98%;
    height: 100%;
    background-color: #303340;
    border-radius: 15px;
    border: 1px solid #303340;
    overflow: hidden;

    &::before,
    &::after {
      content: '';
      box-sizing: border-box;
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      transform-origin: center;

    }

    &::before {
      border-top: 0.1em solid #ffffeb;
      border-bottom: 0.1em solid #ffffeb;
      transform: scale3d(0, 1, 1);

    }

    &::after {
      border-left: 0.1em solid #ffffeb;
      border-right: 0.1em solid #ffffeb;
      transform: scale3d(1, 0, 1);
    }

    &:hover::before,
    &:hover::after {
      transform: scale3d(1, 1, 1);
      transition: transform 900ms;
      animation: border-radius-a 900ms forwards;
    }

    @keyframes border-radius-a {
      0% {
        border-radius: 0;
      }
      70% {
        border-radius: 0;
      }
      100% {
        border-radius: 15px;
      }
    }

    h1 {
      font-size: 1.7rem;
      align-self: center;
      margin: 0 auto;
      padding: 20px 20px;
    }
  }
`;


export const GridOfCountries_ = ({array, option}) => {
    const [grid, setGrid] = useState([]);

    useEffect(() => {
        const grid__ = []
        array.forEach(
            (item, index) => {
                if (!(item.countries.size === 0 && option === "language")) {
                    grid__.push(
                        <div key={index} className="grid-item">
                            <h1>{item.name}</h1>
                            <ListOfCountries map={item.countries}/>
                        </div>
                    );
                }
            }
        );
        setGrid(grid__);
    }, [array, option]);

    return <>
        {option === "language" && grid.length === 0 ?
         <NotFoundStyled>
             <ListStyled>
                 {<img src={"/empty_folder.png"} alt="emptyFolder"/>}
             </ListStyled>
         </NotFoundStyled> : <GridStyled>{grid}</GridStyled>}
    </>
}

export const GridOfCountries = React.memo(GridOfCountries_);