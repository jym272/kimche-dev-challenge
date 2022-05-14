import {CountryStore} from "../Store";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useCallback, useContext, useEffect, useState} from "react";
import styled from "styled-components";
import {gql, useQuery} from "@apollo/client";
import {BackButton} from "../UI";


const CountryGridStyled = styled.section`


  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  margin: 0 auto;
  padding: 0;
  width: 100%;
  height: 100%;
  min-height: 76vh;
  position: relative;


  img {
    max-height: 40vh;
    object-fit: cover;
    transition: box-shadow 0.1s, transform 0.1s;

    &:hover {
      box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.6);
      //opacity: 0.5;
      //object-fit: contain;
    }
  }

  > * {
    flex-grow: 1;
    margin: 0.5rem;
  }
`;


const queryCountry = gql`
    query Country($id: ID!) {
        country(code: $id) {
            name
            capital
            states {
                name
            }
        }
    }
`;

const getAttrId = (string) => {
    const regex = /(https:\/\/maps\.google\.com\/maps\/contrib\/)([0-9]+)/g;
    const match = regex.exec(string)
    return match[2]
}


export const Country = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const option = queryParams.get('option');
    const lookup = queryParams.get('lookup');
    const {loading, error, data} = useQuery(queryCountry, {
        variables: {
            id: useParams().country_id
        }
    });

    const [photosArray, setPhotosArray] = useState([]);
    const [gridItems, setGridItems] = useState([]);

    const context = useContext(CountryStore)
    const navigate = useNavigate();


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
            console.log(data)
            const query = `${data.country.capital}, ${data.country.name}`;

            getPlaceID(query).then(place_id => {
                getPhotos(place_id).then(photos => {
                    const photos_ = []
                    const max = photos.length > 6 ? 6 : photos.length;
                    for (let i = 0; i < max; i++) {
                        const url_attr = photos[i].html_attributions
                        const photoObject = {
                            photo: photos[i].getUrl(
                                {maxWidth: 800, maxHeight: 600}),
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
    }, [context])


    const constructGrid = useCallback((photosArray) => {
        const grid = []
        const map = <div>MAPA</div>
        grid.push(map)
        photosArray.forEach((value, index) => {
            grid.push(<img key={index} src={value.photo} alt=""/>)
        })
        return grid

    }, [])


    useEffect(() => {
        if (photosArray.length > 0) {
            const grid = constructGrid(photosArray);
            setGridItems(grid)
        }
    }, [photosArray, constructGrid])

    if (loading || photosArray.length === 0) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;


    return (<>
            <BackButton onClick={() => {
                navigate(`/search/${lookup}?option=${option}`)
            }}/>
            <CountryGridStyled>
                {gridItems}
                {/*{AllPictures}*/}
                {/*{photosArray.length>0 &&  <a target="_blank" rel="noopener noreferrer" href={`https://maps.google.com/maps/contrib/${photosArray[0].attr}`} >Jimmy Lin</a>}*/}

            </CountryGridStyled>
        </>
    )
}

