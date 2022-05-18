import styled from 'styled-components';
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

const AutoCompleteStyled = styled.div`
  display: ${props => props.devToolsOpen ? 'none' : 'inline-block'};
  position: relative;
  width: 60%;
  max-width: 800px;
  background: rgba(0, 255, 255, 0.2);

  section {
    position: absolute;
    border: none;
    z-index: 99;
    /*position the autocomplete items to be the same width as the container:*/
    top: 100%;
    left: 0;
    right: 0;

    .container__item__with__hover,
    .container__item {
      display: flex;
      align-items: center;
      padding: 5px;
      background: rgb(255, 255, 255);
      border-bottom: 1px solid #eee;

      //&:hover {
      //  background: #e4e3e3;
      //}
    }

    .container__item__with__hover {
      &:hover {
        background: #e4e3e3;
      }
    }

    .item {
      padding: 8px;
      color: #333;
      font-size: 1.1rem;
      font-weight: 500;
    }

    .autocomplete-active {
      background-color: #e4e3e3;
      border-bottom: 1px solid #d4d4d4;
    }

    .yt__icon {
      display: inline-block;
      padding-left: 4px;
      width: 15px;
      height: 15px;
      pointer-events: none;
      transform: scale(1.5);
    }
  }

`;

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function capitalizeFirstLetterInAllWords(string) {
    return string.split(' ').map(word => capitalizeFirstLetter(word)).join(' ');
}

export const AutoCompleteTexBox = ({autoComplete}) => {
    const [focus, setFocus] = useState(undefined);
    const [items, setItems] = useState([]);
    const [devToolsOpen, setDevToolsOpen] = useState(false);
    const [mouseIsActive, setMouseIsActive] = useState(true);
    const [indexWithKeys, setIndexWithKeys] = useState(0);

    const navigate = useNavigate();

    const goToCountryHandler = (code) => {
        navigate(`/country/${code}`);
    }


    const Handler = (index) => {
        if (items.length > 0) {
            items[index].classList.add("container__item__with__hover");
            setMouseIsActive(true);
            setFocus(index);
        }
    }


    const box = autoComplete.map((item, index) => {
        return (
            <div key={index} id={index}
                 onMouseEnter={Handler.bind(this, index)}
                 onClick={goToCountryHandler.bind(this, item.code)}
                 className={"container__item"}>
                <svg className={"yt__icon"} viewBox="0 0 24 24"
                     preserveAspectRatio="xMidYMid meet"
                     focusable="false"
                >
                    <g>
                        <path
                            d="M20.87,20.17l-5.59-5.59C16.35,13.35,17,11.75,17,10c0-3.87-3.13-7-7-7s-7,3.13-7,7s3.13,7,7,7c1.75,0,3.35-0.65,4.58-1.71 l5.59,5.59L20.87,20.17z M10,16c-3.31,0-6-2.69-6-6s2.69-6,6-6s6,2.69,6,6S13.31,16,10,16z"
                            className="style-scope yt-icon">{}</path>
                    </g>
                </svg>
                <div id={item.code}
                     className={"item"}>{capitalizeFirstLetterInAllWords(
                    item.word)}</div>
            </div>
        )
    })


    useEffect(() => {
        const items = document.querySelectorAll('.container__item');
        setItems(items);
        window.addEventListener('devtoolschange', event => {
            if (event.detail.isOpen)
                setDevToolsOpen(true);
            else
                setDevToolsOpen(false);
        });
    }, [])

    useEffect(() => {
        let currentFocus = 0;
        let direction;
        if (focus !== undefined) {
            currentFocus = focus;
            direction = "up"
            // const items = document.querySelectorAll('.container__item');
            for (let i = 0; i < items.length; i++) {
                items[i].classList.remove("autocomplete-active");
                // items[i].classList.remove("container__item__with__hover");

            }
        }
        const input = document.getElementById('search');
        const listener = (e) => {
            if (e.keyCode === 40) {
                e.preventDefault()
                // down arrow
                // const items = document.querySelectorAll('.container__item');
                if (currentFocus >= items.length) currentFocus = 0;
                for (let i = 0; i < items.length; i++) {
                    items[i].classList.remove("autocomplete-active");
                    items[i].classList.remove("container__item__with__hover");
                }
                if (direction === 'up') {
                    currentFocus++;
                    if (currentFocus >= items.length) currentFocus = 0;
                }
                items[currentFocus].classList.add("autocomplete-active");
                setIndexWithKeys(currentFocus); //new
                currentFocus++;
                direction = 'down';
                setMouseIsActive(false);


            }
            if (e.keyCode === 38) {
                e.preventDefault()

                // up arrow
                // const items = document.querySelectorAll('.container__item');
                if (currentFocus === 0) currentFocus = items.length;
                for (let i = 0; i < items.length; i++) {
                    items[i].classList.remove("autocomplete-active");
                    items[i].classList.remove("container__item__with__hover");
                }
                if (direction === 'down') {
                    currentFocus--;
                    if (currentFocus < 0) currentFocus = items.length - 1;
                }
                currentFocus--;
                if (currentFocus < 0) currentFocus = items.length - 1;
                items[currentFocus].classList.add("autocomplete-active");
                direction = 'up';
                setMouseIsActive(false);
                setIndexWithKeys(currentFocus); //new
            }
        }
        input.addEventListener("keydown", listener);
        return () => {
            input.removeEventListener("keydown", listener);
        }
    }, [navigate, focus, items])


    useEffect(() => {
        document.onkeydown = (e) => {
            e = e || window.event;
            if (e.key === "Enter" && !mouseIsActive) {
                items[indexWithKeys].click();

            }
        }
        return () => {
            document.onkeydown = null;
        }

    }, [indexWithKeys, mouseIsActive, items])


    return <AutoCompleteStyled devToolsOpen={devToolsOpen}>
        <section>
            {box}
        </section>

    </AutoCompleteStyled>

}
