import {CountryStore} from "../Store";
import {useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import styled from "styled-components";
import {gql, useQuery} from "@apollo/client";


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


const queryCountry = gql`
    query Country($id: ID!) {
        country(code: $id) {
            name
            capital
        }
    }
`;

const getAttrId = (string) =>{
    const regex = /(https:\/\/maps\.google\.com\/maps\/contrib\/)([0-9]+)/g;
    const match = regex.exec(string)
    return match[2]
}



export const Country = () => {

    const {loading, error, data} = useQuery(queryCountry, {
        variables: {
            id: useParams().country_id
        }
    });

    const [photosArray, setPhotosArray] = useState([]);
    const context = useContext(CountryStore)
    // const navigate = useNavigate();


    useEffect(() => {


        const google = window.google;
        const getPlaceID = (query) => {
            const request = {
                query: query,
                fields: ['place_id'],
            };
            return new Promise((resolve, reject) => {
                const service = new google.maps.places.PlacesService(
                    document.createElement('div'));
                service.findPlaceFromQuery(request, (results, status) => {
                    if (status === google.maps.places.PlacesServiceStatus.OK) {
                        resolve(results[0].place_id);
                    } else {
                        reject(status);
                    }
                });
            });
        };


        const getCoordsOfCountry = (query) => {
            const geocoder = new google.maps.Geocoder();
            return new Promise((resolve, reject) => {
                geocoder.geocode({address: query}, (results, status) => {
                    if (status === google.maps.GeocoderStatus.OK) {
                        resolve(results[0].geometry.location);
                    } else {
                        reject(status);
                    }
                });
            });
        };

        const getPhotos = (place_id) => {
            const service = new google.maps.places.PlacesService(
                document.createElement('div'));
            return new Promise((resolve, reject) => {
                service.getDetails({placeId: place_id}, (results, status) => {
                    if (status === google.maps.places.PlacesServiceStatus.OK) {
                        resolve(results.photos);
                    } else {
                        reject(status);
                    }
                });
            });
        };



        if (google && data) {
            const query = `${data.country.capital}, ${data.country.name}`;

            getPlaceID(query).then(place_id => {
                getPhotos(place_id).then(photos => {
                    // setPhotosArray([])
                    const photos_ = []
                    console.log(photos.length)
                    for (let i = 0; i < 5; i++) {
                        const url_attr =photos[i].html_attributions
                        const photoObject = {
                            photo: photos[i].getUrl({maxWidth: 600, maxHeight: 600}),
                            attr: getAttrId(url_attr[0])
                        }
                        photos_.push(photoObject)
                    }
                    setPhotosArray(photos_)
                });

            });

            // getCoordsOfCountry(query).then((coords)=>{
            //     console.log(coords);
            //     //coords to string
            //     const coordsString = coords.toString();
            //     //remove brackets
            //     const coordsStringWithoutBrackets =
            // coordsString.replace(/[\(\)]/g, ''); //split by comma const
            // coordsArray = coordsStringWithoutBrackets.split(','); //get lat
            // and lng const lat = coordsArray[0]; const lng = coordsArray[1];
            // //set lat and lng to store console.log(lat, lng); //
            // getPhotosOfCountry(coords).then((results)=>{ //
            // console.log(results); // });  });


        }


    }, [data]);

    useEffect(() => {
        context.setHomePage(false)

    }, [context, data])


    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    return (
        <CountryStyled>
            <h1>Country</h1>
            {photosArray.length>0 &&  <img src={photosArray[0].photo} alt="emptyFolder"/>}
            {photosArray.length>0 &&  <img src={photosArray[1].photo} alt="emptyFolder"/>}
            {photosArray.length>0 &&  <img src={photosArray[2].photo} alt="emptyFolder"/>}
            {photosArray.length>0 &&  <img src={photosArray[3].photo} alt="emptyFolder"/>}

            {photosArray.length>0 &&  <a target="_blank" rel="noopener noreferrer" href={`https://maps.google.com/maps/contrib/${photosArray[0].attr}`} >Jimmy Lin</a>}

        </CountryStyled>
    )
}