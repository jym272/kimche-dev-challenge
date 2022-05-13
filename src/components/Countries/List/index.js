import {useNavigate} from "react-router-dom";
import {useCallback, useEffect, useState} from "react";
import {ListStyled} from "../../UI";

//gonna go crazy
export const ListOfCountries = ({map}) => {
    const [list, setList] = useState([]);

    const navigate = useNavigate();
    const countryHandler = useCallback((key) => {
        navigate(`/country/${key}`)
    }, [navigate])

    useEffect(() => {
        setList([])
        const createItemList = (key, value) => {
            return (
                <li key={key} onClick={countryHandler.bind(this, key)}>
                    <div>
                        <span>{value.emoji}</span>
                        <span>{value.name}</span>
                    </div>
                </li>
            )

        };

        map.forEach((value, key) => {
            const itemList = createItemList(key, value)
            setList(prev => [...prev, itemList])
        })
    }, [map, countryHandler])

    return (
        <ListStyled>
            {list.length ? list :
             <img src={"/empty_folder.png"} alt="emptyFolder"/>}
        </ListStyled>
    )
}
