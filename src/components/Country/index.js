import {CountryStore} from "../Store";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useContext, useEffect} from "react";
import styled from "styled-components";

const google = window.google;
const CountryStyled = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  //width: 100%;
  //height: 100%;
  height: 100vh;
  //z-index: -1;
  //margin: 0 auto;

  //background-color: #fafafa;
  //padding: 20px;
  //box-sizing: border-box;
`;

const lib = ["places"];
export const Country = () => {


    const context = useContext(CountryStore)
    const params = useParams();
    const {country_id} = params;
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const option = queryParams.get('option');
    const navigate = useNavigate();

    //
    // document.onkeydown = (e) => {
    //     e = e || window.event;
    //     if (e.key === "Escape") {
    //         navigate('/');
    //     }
    // }


    useEffect(() => {
        context.setHomePage(false)
        console.log(google)
    }, [context]) //first update s

    return (
        <CountryStyled>
            <h1>Country</h1>
            {country_id}
        </CountryStyled>
    )
}