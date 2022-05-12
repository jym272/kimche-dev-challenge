import {AboutFooterStyled} from "../../UI";
import {useNavigate} from "react-router-dom";

export const AboutFooter = () => {
    let navigate = useNavigate();

    const aboutHandler = () => {
        // console.log('about');
        // navigate('/about');
    };

    return <AboutFooterStyled onClick={aboutHandler}>
            <span>
                {}
            </span>
        <span>
                {}
            </span>
        <span>
                {}
            </span>
    </AboutFooterStyled>
}