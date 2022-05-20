import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useCallback, useContext, useEffect, useMemo, useState} from "react";
import styled from "styled-components";
import {gql, useQuery} from "@apollo/client";
import {BackButton} from "../../UI";
import {LoadingCountry} from "../../components";
import {CountryStore} from "../../Store";
import {ServerError} from "../500";
import {Helmet} from "react-helmet-async";
import useEventListener from "@use-it/event-listener";


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
  justify-content: space-around;
  --stager-delay: 0.35s;

  @keyframes cardEntrance {
    from {
      opacity: 0;
      transform: scale(0.9);
      filter: blur(3px);
    }
    to {
      opacity: 1;
      transform: scale(1);
      filter: blur(0);
    }
  }


  .photos__ {
    max-height: 40vh;
    object-fit: cover;
    transition: box-shadow 0.1s, transform 0.1s;
    box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.6);
    animation: cardEntrance 0.7s ease-out;
    animation-fill-mode: backwards;
  }

  .photos__:nth-child(2) {
    animation-delay: calc(var(--stager-delay) * 1.8);
  }

  .photos__:nth-child(3) {
    animation-delay: calc(var(--stager-delay) * 2.5);

  }

  .photos__:nth-child(4) {
    animation-delay: calc(var(--stager-delay) * 3);
  }

  .photos__:nth-child(5) {
    animation-delay: calc(var(--stager-delay) * 3.5);

  }

  .photos__:nth-child(6) {
    animation-delay: calc(var(--stager-delay) * 4);
  }

  .photos__:nth-child(7) {
    animation-delay: calc(var(--stager-delay) * 5);
  }

  > * {
    //flex-grow: 1;
    margin: 0.7rem;
  }


  .google__map {
    max-width: 800px;
    min-width: 350px;
    width: 450px;
    max-height: 40vh;
    height: 40vh;
    animation-delay: var(--stager-delay);
    animation: cardEntrance 0.7s ease-out calc(var(--stager-delay) * 1);
    animation-fill-mode: backwards;
  }

  .label__ {
    font-size: 1.0rem;
    font-family: 'Titillium Web', sans-serif;
    color: #333;

    div:first-of-type {
      font-weight: bold;
      font-size: 1.1rem;

    }
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
    const [gridItems, setGridItems] = useState([]);
    const context = useContext(CountryStore)
    const navigate = useNavigate();
    const google = useMemo(() => window.google, [])
    const [place, setPlace] = useState(null);
    const [fetchingDataError, setFetchingDataError] = useState(false);

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
            if (!data.country) {
                setFetchingDataError(true);
            } else {
                const query = `${data.country.capital ? data.country.capital :
                                 ""}, ${data.country.name}`;
                getPlaceID(query).then(place => {
                    getPhotos(place.place_id).then(photos => {
                        //Photos Array
                        const photos_ = []
                        const max = photos.length > 6 ? 6 : photos.length;
                        for (let i = 0; i < max; i++) {
                            const url_attr = photos[i].html_attributions
                            const photoObject = {
                                photo: photos[i].getUrl(
                                    {maxWidth: 800, maxHeight: 600}),
                                attr: url_attr[0] || `${data.country.name}` //getAttrId(url_attr[0])
                            }
                            photos_.push(photoObject)
                        }
                        const grid = []
                        //Map Item
                        const map = <div key={20} id="map" className={"google__map"}>{}</div>
                        grid.push(map)
                        photos_.forEach((value, index) => {
                            grid.push(<img className={"photos__"} key={index}
                                           src={value.photo}
                                           alt={value.attr}/>)
                        })
                        //Grid Items
                        setGridItems(grid)

                    }).catch(err => {
                        console.log(err)
                        setFetchingDataError(true);
                    })

                });
            }


        }
    }, [data, google, getPhotos, getPlaceID]);

    useEffect(() => {
        context.setHomePage(false)
    }, [context])


    useEffect(() => {

        const mapElement = document.getElementById('map');

        if (mapElement && google && gridItems.length > 0) {
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


    const keyHandler = useCallback(({key}) => {
        if (['27', 'Escape', '37', 'ArrowLeft'].includes(String(key))) {
            if (lookup && option) {
                navigate(`/search/${lookup}?option=${option}`)
            } else {
                navigate(`/`)
            }
        }
    }, [navigate, lookup, option])

    useEventListener('keydown', keyHandler);

    if (error || fetchingDataError) return <ServerError/>;
    if (loading || gridItems.length === 0) return <LoadingCountry/>;

    return (<>
            <Helmet>
                <meta charSet="utf-8"/>
                <title>{data.country.name ?
                        `${data.country.name}${data.country.capital ? "-" + data.country.capital : ""}` :
                        "Country"}</title>
            </Helmet>
            {lookup && option && <BackButton onClick={() => {
                navigate(`/search/${lookup}?option=${option}`)
            }}/>}
            <CountryGridStyled>
                {gridItems}
            </CountryGridStyled>
        </>
    )
}

