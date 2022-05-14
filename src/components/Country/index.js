import {CountryStore} from "../Store";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useCallback, useContext, useEffect, useMemo, useState} from "react";
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


  .photos__ {
    max-height: 40vh;
    object-fit: cover;
    transition: box-shadow 0.1s, transform 0.1s;
    box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.6);

    &:hover {
      //opacity: 0.5;
      //object-fit: contain;
    }
  }

  > * {
    flex-grow: 1;
    margin: 0.5rem;
  }


  .google__map {
    max-width: 800px;
    min-width: 350px;
    width: 450px;
    max-height: 40vh;
    height: 40vh;
  }

  .label__ {
    font-size: 1.1rem;
    font-family: 'Titillium Web', sans-serif;
    color: #000;
  }

`;


const queryCountry = gql`
    query Country($id: ID!) {
        country(code: $id) {
            name
            capital
        }
    }
`;

// const getAttrId = (string) => {
//     const regex = /(https:\/\/maps\.google\.com\/maps\/contrib\/)([0-9]+)/g;
//     const match = regex.exec(string)
//     return match[2]
// }


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
    const google = useMemo(() => window.google, [])
    const [place, setPlace] = useState(null);

    const getPlaceID = useCallback((query) => {
        const request = {
            query: query,
            fields: ['place_id', "geometry"]
        };
        return new Promise((resolve, reject) => {
            const service = new google.maps.places.PlacesService(
                document.createElement('div'));
            service.findPlaceFromQuery(request, (results, status) => {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    const place_ = {
                        location: results[0].geometry.location,
                        place_id: results[0].place_id,
                    }
                    setPlace(place_)
                    resolve(place_);
                } else {
                    reject(status);
                }
            });
        });
    }, [google]);

    const getCoordsOfCountry = useCallback((query) => {
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
    }, [google]);


    const getPhotos = useCallback((place_id) => {
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
    }, [google]);

    useEffect(() => {
        if (google && data) {
            const query = `${data.country.capital ? data.country.capital :
                             ""}, ${data.country.name}`;
            getPlaceID(query).then(place => {
                getPhotos(place.place_id).then(photos => {
                    const photos_ = []
                    const max = photos.length > 6 ? 6 : photos.length;
                    for (let i = 0; i < max; i++) {
                        // const url_attr = photos[i].html_attributions
                        const photoObject = {
                            photo: photos[i].getUrl(
                                {maxWidth: 800, maxHeight: 600}),
                            // attr: getAttrId(url_attr[0])
                        }
                        photos_.push(photoObject)
                    }
                    setPhotosArray(photos_)
                });

            });
        }
    }, [data, google, getPhotos, getPlaceID]);

    useEffect(() => {
        context.setHomePage(false)
    }, [context])

    const constructGrid = useCallback((photosArray) => {
        const grid = []
        const map = <div key={20} id="map" className={"google__map"}>{}</div>
        grid.push(map)
        photosArray.forEach((value, index) => {
            grid.push(<img className={"photos__"} key={index}
                           src={value.photo}
                           alt=""/>)
        })
        return grid

    }, [])


    useEffect(() => {
        if (photosArray.length > 0) {
            const grid = constructGrid(photosArray);
            setGridItems(grid)
        }
    }, [photosArray, constructGrid])

    useEffect(() => {

        const mapElement = document.getElementById('map');

        if (mapElement && google && gridItems.length >0) {
            let map;
            let infowindow;

            function initMap() {
                const sydney = new google.maps.LatLng(-33.867, 151.195);
                infowindow = new google.maps.InfoWindow();
                map = new google.maps.Map(mapElement, {
                    center: sydney,
                    zoom: 13,
                });
                map.setCenter(place.location);

                const contentString = '<div id="content" class="label__">' +
                                      `<div id="siteNotice">${data.country.name}</div>` +
                                      `<div id="siteNotice">${data.country.capital ?
                                                              data.country.capital :
                                                              ""}</div>` +
                                      "</div>"

                infowindow = new google.maps.InfoWindow(
                    {
                        content: contentString,
                        maxWidth: 400,
                    });
                createMarkerPlace();

            }


            function createMarkerPlace() {
                const marker = new google.maps.Marker(
                    {
                        animation: google.maps.Animation.DROP,
                        map,
                        place: {
                            placeId: place.place_id,
                            location: place.location
                        },
                    });

                marker.addListener("click", () => {
                    infowindow.open({
                                        anchor: marker,
                                        map,
                                        shouldFocus: false,

                                    });
                });
            }

            initMap();
        }
    }, [gridItems, google, place, data]) //gridItems must be full to run initMap


    if (loading || gridItems.length === 0) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;


    return (<>
            {lookup && option && <BackButton onClick={() => {
                navigate(`/search/${lookup}?option=${option}`)
            }}/>}
            <CountryGridStyled>
                {gridItems}
            </CountryGridStyled>
        </>
    )
}

